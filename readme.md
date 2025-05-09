> [!TIP]
> 相关讨论见：
>
> https://github.com/vuejs/language-tools/issues/5324
>

插件依赖            | 版本    | 备注 |
---                 | ---    | --- |
vue                 | 3.4.21 | -   |
vue.volar语言插件    | 2.2.8  | -   |

开启 `vueCompilerOptions.plugins` 配置

---

> ❌❗✅

typescript 版本表现：

- ✅ `5.5.4` 正常 - 5.5 的最后一版
- ✅ `5.6.0-beta` 正常 - 5.6 的第一版
- ❌ `5.6.1-rc` 仅 wot 组件库生效 - 5.6.0 最后一版的第一版

❗ 所以经过上面的尝试之后，又尝试向前回退了一个小版本（`5.6.0-dev.20240819`），发现问题依旧，于是判断问题可能始于 `5.6.0-beta` ~ `5.6.1-rc` 之间的某一个版本。

---

ts 考察版本         | 表现 | 备注 |
---                 | --- | --- |
5.6.0-beta          |  ✅  |  -  |
5.6.0-dev.20240604  |  ❗  |  项目内全局组件有效  |
5.6.0-dev.20240605  |  ❗  |  项目内全局组件有效  |
5.6.0-dev.20240606  |  ❗  |  项目内全局组件有效  |
5.6.0-dev.20240607  |  ❗  |  项目内全局组件有效  |
5.6.0-dev.20240608  |  ❗  |  项目内全局组件有效  |
5.6.0-dev.20240609  |  ❗  |  项目内全局组件有效  |
5.6.0-dev.20240610  |  ❗  |  项目内全局组件有效  |
5.6.0-dev.20240611  |  ❗  |  项目内全局组件有效  |
5.6.0-dev.20240612  |  ❗  |  项目内全局组件有效  |
5.6.0-dev.20240613  |  ✅  |  -  |
5.6.0-dev.20240614  |  ✅  |  -  |
5.6.0-dev.20240615  |  ✅  |  -  |
5.6.0-dev.20240616  |  ✅  |  -  |
5.6.0-dev.20240617  |  ✅  |  -  |
5.6.0-dev.20240618  |  ✅  |  -  |
5.6.0-dev.20240619  |  ✅  |  -  |
5.6.0-dev.20240620  |  ✅  |  -  |
5.6.0-dev.20240621  |  ✅  |  -  |
5.6.0-dev.20240622  |  ✅  |  -  |
5.6.0-dev.20240623  |  ✅  |  -  |
5.6.0-dev.20240624  |  ✅  |  -  |
5.6.0-dev.20240625  |  ✅  |  -  |
5.6.0-dev.20240626  |  ✅  |  -  |
5.6.0-dev.20240627  |  ✅  |  -  |
5.6.0-dev.20240628  |  ✅  |  -  |
5.6.0-dev.20240629  |  ✅  |  -  |
5.6.0-dev.20240630  |  ✅  |  -  |
5.6.0-dev.20240701  |  ✅  |  -  |
5.6.0-dev.20240702  |  ✅  |  -  |
5.6.0-dev.20240703  |  ✅  |  -  |
5.6.0-dev.20240704  |  ✅  |  -  |
5.6.0-dev.20240705  |  ✅  |  -  |
5.6.0-dev.20240706  |  ✅  |  -  |
5.6.0-dev.20240707  |  ✅  |  -  |
5.6.0-dev.20240708  |  ✅  |  -  |
5.6.0-dev.20240709  |  ✅  |  -  |
5.6.0-dev.20240710  |  ✅  |  -  |
5.6.0-dev.20240711  |  ✅  |  -  |
5.6.0-dev.20240712  |  ✅  |  -  |
5.6.0-dev.20240713  |  ✅  |  -  |
5.6.0-dev.20240714  |  ✅  |  -  |
5.6.0-dev.20240715  |  ✅  |  -  |
5.6.0-dev.20240716  |  ✅  |  -  |
5.6.0-dev.20240717  |  ✅  |  -  |
5.6.0-dev.20240718  |  ✅  |  -  |
5.6.0-dev.20240719  |  ✅  |  -  |
5.6.0-dev.20240720  |  ✅  |  -  |
5.6.0-dev.20240721  |  ✅  |  -  |
5.6.0-dev.20240722  |  ✅  |  -  |
5.6.0-dev.20240723  |  ✅  |  -  |
5.6.0-dev.20240724  |  ✅  |  -  |
5.6.0-dev.20240725  |  ✅  |  -  |
5.6.0-dev.20240726  |  ✅  |  -  |
5.6.0-dev.20240727  |  ✅  |  -  |
5.6.0-dev.20240728  |  ✅  |  -  |
5.6.0-dev.20240729  |  ✅  |  -  |
5.6.0-dev.20240730  |  ✅  |  -  |
5.6.0-dev.20240731  |  ✅  |  -  |
5.6.0-dev.20240801  |  ❌  |  -  |
5.6.0-dev.20240802  |  ❌  |  -  |
5.6.0-dev.20240803  |  ❌  |  -  |
5.6.0-dev.20240804  |  ❌  |  -  |
5.6.0-dev.20240805  |  ❌  |  -  |
5.6.0-dev.20240806  |  ❌  |  -  |
5.6.0-dev.20240807  |  ❌  |  -  |
5.6.0-dev.20240808  |  ❌  |  -  |
5.6.0-dev.20240809  |  ❌  |  -  |
5.6.0-dev.20240810  |  ❌  |  -  |
5.6.0-dev.20240811  |  ❌  |  -  |
5.6.0-dev.20240812  |  ❌  |  -  |
5.6.0-dev.20240813  |  ❌  |  -  |
5.6.0-dev.20240814  |  ❌  |  -  |
5.6.0-dev.20240815  |  ❌  |  -  |
5.6.0-dev.20240816  |  ❌  |  -  |
5.6.0-dev.20240817  |  ❌  |  -  |
5.6.0-dev.20240818  |  ❌  |  -  |
5.6.0-dev.20240819  |  ❌  |  -  |
5.6.1-rc            |  ❌  |  -  |

> [!TIP]
> 以上的测试版本，wot的组件库的类型声明始终有效。
>
> 从测试结果来看，bug 始于 `5.6.0-dev.20240801`。
>
> 前面有一小段版本 `5.6.0-dev.20240604` ~ `5.6.0-dev.20240612`，uni-types 的全局组件声明不生效，但是项目内的全局组件声明生效了。
>

后续版本的粗略测试：5.6 版本（5.6.3）、5.7 版本（5.7.3）、5.8 版本（5.8.3）均保持一致的bug表现。

解决办法都是安装vue到3.5版本，即使是上面提到的出了问题的ts版本。
