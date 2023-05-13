# Getting started

前提: [安装 pnpm][install-pnpm]，推荐 `corepack` 方法。

```sh
pnpm i
pnpm start
```

[install-pnpm]: https://pnpm.io/zh/installation

## 架构

- 浏览器主线程: 渲染界面，处理 UI 更新
- Web Worker: 负责计算方面的内容，如内容解密。

数据传输: 生成 blob url (`URL.createObjectURL`) 然后透过 `postMessage` 传递给线程，线程利用 `fetch` API 来获取文件信息。

## 贡献代码

欢迎贡献代码。请确保：

- 单元测试的覆盖率不低于主分支的覆盖率；
- 提交前请使用 Prettier 对代码进行格式化；
- 提交前请确保 ESLint 不会报告 warning / error；

满足上述条件后发起 Pull Request，仓库管理员审阅后将合并到主分支。

## 基于 libparakeet SDK 开发

`libparakeet-js` 编译目前需要 Linux 环境，请参考[仓库说明][libparakeet-js-doc]。

该文档将假设这两个项目被放置在同级的目录下：

```text
~/Projects/um-projects
    /um-react
    /libparakeet-js
```

若为不同目录，你需要调整 `vite.config.ts` 的 `server.fs.allow` 区段并加入新的路径。

[libparakeet-js-doc]: https://github.com/parakeet-rs/libparakeet-js/blob/main/README.MD

### 初次构建

- 进入上层目录 `cd ..`
- 克隆 `libparakeet-js` 仓库 (目前需要 Linux 环境, Windows 下推荐使用 WSL2)
  - `git clone --recurse-submodules https://github.com/parakeet-rs/libparakeet-js.git`
- 进入目录 `cd libparakeet-js`
- 如果需要更新 `submodule`:
  - `git submodule update --init --recursive`
- 运行 `./build.sh -j 4` 进行编译
- 编译 `js-sdk`:
  - 进入 `npm` 目录: `cd npm`
  - 安装依赖: `pnpm i --frozen-lockfile`
  - 构建: `pnpm build`

### 做出更改

做出更改后，参考上面的内容进行重新编译

### 应用 SDK 更改

将构建好的 SDK 直接嵌入到当前前端项目：

```sh
pnpm link ../libparakeet-js/npm
```

※ 建立 PR 时，请先提交 SDK PR 并确保你的更改已合并。

## TODO

- [ ] #6 文件拖放 (利用 `react-dropzone`?)
- [ ] 各类算法 [追踪 `crypto` 标签](https://git.unlock-music.dev/um/um-react/issues?labels=67)
- [ ] #7 简易元数据编辑器
- [ ] #8 添加单元测试
- [ ] #2 解密内容探测 (解密过程)
