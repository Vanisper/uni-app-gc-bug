// src/main.ts (优化交互逻辑)
import { tsList } from './ts-list';
import { generateBisectQueue, loadTestState, saveTestState, switchVersion, TestState } from './utils';

type UserChoice = 'pass' | 'fail' | 'retry' | 'quit';

function promptUser(): UserChoice {
  const answer = prompt(`
测试结果选择：
(p) 当前版本通过测试（保留此版本）
(f) 当前版本未通过测试（继续测试）
(r) 重新测试当前版本
(q) 退出测试
请输入选择 [P/F/R/Q]: `)?.trim().toLowerCase();

  switch (answer) {
    case 'p': return 'pass';
    case 'f': return 'fail';
    case 'r': return 'retry';
    case 'q': return 'quit';
    default:
      console.log('无效输入，默认为失败');
      return 'fail';
  }
}

function displayProgress(state: TestState, total: number): void {
  const remaining = state.candidates.length;
  const testedCount = state.tested.size;
  
  console.log(`
=================================
已测试版本: ${testedCount}/${total}
剩余候选: ${remaining}
历史路径: ${state.history.join(' -> ')}
当前版本: ${state.current || '无'}
=================================`);
}

function main() {
  const versions = tsList;
  const state = loadTestState(versions);

  while (true) {
    displayProgress(state, versions.length);

    // 获取下一个候选版本
    if (!state.current && state.candidates.length > 0) {
      state.current = state.candidates.shift()!;
      saveTestState(state);
    }

    if (!state.current) {
      console.log(state.successVersion 
        ? `\n🎉 最终确认版本: ${state.successVersion}`
        : '\n⚠️ 所有候选版本已测试完毕');
      break;
    }

    // 执行版本切换
    console.log(`\n正在切换到版本: ${state.current}`);
    const success = switchVersion(state.current);
    if (!success) {
      state.tested.add(state.current);
      state.history.push(`${state.current}(安装失败)`);
      state.current = undefined;
      saveTestState(state);
      continue;
    }

    // 用户反馈
    const choice = promptUser();
    state.tested.add(state.current);
    state.history.push(state.current);

    switch (choice) {
      case 'pass':
        state.successVersion = state.current;
        state.candidates = []; // 清除剩余候选
        break;
        
      case 'fail':
        // 自动生成新的候选队列
        state.candidates = generateBisectQueue(
          versions, 
          state.tested
        ).filter(v => !state.tested.has(v));
        break;

      case 'retry':
        state.tested.delete(state.current);
        state.history.pop();
        state.candidates.unshift(state.current);
        break;

      case 'quit':
        console.log('测试已保存，下次可继续');
        return saveTestState(state);
    }

    state.current = undefined;
    saveTestState(state);
  }

  // 清理状态
  saveTestState({ 
    tested: new Set(),
    candidates: [],
    history: [],
  });
}

// 启动程序
try {
  main();
} catch (error) {
  console.error('运行时错误:', error);
  process.exit(1);
}