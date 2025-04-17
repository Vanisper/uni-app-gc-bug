// src/utils.ts (增强版)
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';

export interface TestState {
  tested: Set<string>;        // 已测试版本
  candidates: string[];       // 待测试队列（按二分顺序）
  current?: string;           // 当前测试版本
  history: string[];          // 完整测试路径
  successVersion?: string;    // 最终成功版本
}

const STATE_FILE = 'ts-test-state.json';

// 智能二分队列生成器
export function generateBisectQueue(versions: string[], tested: Set<string>): string[] {
  const queue: string[] = [];
  const stack: [number, number][] = [[0, versions.length - 1]];

  while (stack.length > 0) {
    const [low, high] = stack.pop()!;
    if (low > high) continue;

    const mid = Math.floor((low + high) / 2);
    const version = versions[mid];

    // 跳过已测试版本
    if (tested.has(version)) {
      stack.push([mid + 1, high]);
      stack.push([low, mid - 1]);
      continue;
    }

    queue.push(version);
    stack.push([mid + 1, high]);  // 右半区入栈（后进先出）
    stack.push([low, mid - 1]);    // 左半区入栈
  }

  return queue;
}

export function loadTestState(versions: string[]): TestState {
  try {
    if (existsSync(STATE_FILE)) {
      const saved = JSON.parse(readFileSync(STATE_FILE, 'utf-8'));
      const state: TestState = {
        tested: new Set(saved.tested),
        candidates: saved.candidates,
        current: saved.current,
        history: saved.history,
        successVersion: saved.successVersion
      };
      
      // 自动重新生成候选队列（应对版本列表变更）
      if (state.candidates.length === 0) {
        state.candidates = generateBisectQueue(versions, state.tested);
      }
      return state;
    }
  } catch (e) {
    console.warn('状态文件异常，已重置');
  }

  // 初始状态
  return {
    tested: new Set(),
    candidates: generateBisectQueue(versions, new Set()),
    history: []
  };
}

export function saveTestState(state: TestState): void {
  const serialized = {
    ...state,
    tested: Array.from(state.tested)
  };
  writeFileSync(STATE_FILE, JSON.stringify(serialized, null, 2));
}

// 版本切换（增强回滚能力）
export function switchVersion(version: string): boolean {
  try {
    execSync(`pnpm uninstall typescript -D`, { stdio: 'inherit' });
    execSync(`pnpm install typescript@${version} -D`, { stdio: 'inherit' });
    return true;
  } catch {
    console.error(`切换到 ${version} 失败，尝试回滚...`);
    execSync(`pnpm install typescript@${version} --force -D`, { stdio: 'inherit' });
    return false;
  }
}