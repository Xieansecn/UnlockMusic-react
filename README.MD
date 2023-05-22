# Unlock Music 音乐解锁 (React)

- 在浏览器中解锁加密的音乐文件。 Unlock encrypted music file in the browser.
- Unlock Music 项目是以学习和技术研究的初衷创建的，修改、再分发时请遵循[授权协议]。
- Unlock Music 的 CLI 版本可以在 [unlock-music/cli] 找到，大批量转换建议使用 CLI 版本。
- 我们新建了 Telegram 群组 [`@unlock_music_chat`] ，欢迎加入！
- ~~CI 自动构建已经部署，可以在 [UM-Packages] 下载~~ 目前还没有自动构建

[授权协议]: https://git.unlock-music.dev/um/um-react/src/branch/main/LICENSE
[unlock-music/cli]: https://git.unlock-music.dev/um/cli
[`@unlock_music_chat`]: https://t.me/unlock_music_chat
[UM-Packages]: https://git.unlock-music.dev/um/-/packages/generic/web-build/

## 支持的格式

- [x] QQ 音乐 QMCv1 (.qmc0/.qmc2/.qmc3/.qmcflac/.qmcogg/.tkm)
- [x] QQ 音乐 QMCv2 PC 端 (.mflac/.mgg/.mflac0/.mgg1/.mggl)
- [x] 网易云音乐 (.ncm)
- [x] 虾米音乐 (.xm)
- [x] 酷我音乐 (.kwm)
- [x] 酷狗音乐 (.kgm/.vpr)
- [x] 喜马拉雅 Android 端 (.x2m/.x3m)
- [ ] ~~咪咕音乐格式 (.mg3d)~~
- [ ] ~~<ruby>QQ 音乐海外版<rt>JOOX Music</rt></ruby> (.ofl_en)~~

不支持的格式？请提交样本（加密文件）与客户端信息（或一并上传其安装包）到[仓库的问题追踪区][project-issues]。如果文件太大，请上传到不需要登入下载的网盘，如 [mega.nz](https://mega.nz)、[OneDrive](https://www.onedrive.com/) 等。

如果遇到解密出错的情况，请一并携带错误信息并简单描述错误的重现过程。

[project-issues]: https://git.unlock-music.dev/um/um-react/issues/new

## 开发相关

### 安装依赖

- 安装 Node v16.17 或更高，推荐当前最新的 Node LTS 版本。
- 安装/激活 `pnpm`：`corepack prepare pnpm@latest --activate` [^1]
- 安装软件依赖：`pnpm i --frozen-lockfile`

[^1]: 参考 pnpm 说明 https://pnpm.io/zh/installation#使用-corepack-安装

### 本地运行

⚠️ 先完成安装依赖部分，然后继续。

```sh
pnpm start
```

然后根据提示打开[项目所在页面][vite-dev-url]即可。

[vite-dev-url]: http://localhost:5173/

### 构建生产版本

⚠️ 先完成安装依赖部分，然后继续。

```sh
pnpm build
```

如果需要预览构建版本，运行 `pnpm preview` 然后打开[项目所在页面][vite-preview-url]即可。

[vite-preview-url]: http://localhost:4173/

### 架构

- 浏览器主线程: 渲染界面，处理 UI 更新
- Web Worker: 负责计算方面的内容，如内容解密。

数据传输: 生成 blob url (`URL.createObjectURL`) 然后透过 `postMessage` 传递给线程，线程利用 `fetch` API 来获取文件信息。

## 基于 libparakeet SDK 开发

`libparakeet-js` 编译目前需要 Linux 环境，请参考[仓库说明][libparakeet-js-doc]。

该文档将假设这两个项目被放置在同级的目录下：

```text
~/Projects/um-projects
    /um-react
    /libparakeet-js
```

若为不同目录，你需要调整 `LIB_PARAKEET_JS_DIR` 环境变量到仓库目录，然后再启动 vite 项目。

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

## 贡献代码

欢迎贡献代码。请确保：

- 单元测试的覆盖率不低于主分支的覆盖率；
- 提交前请使用 Prettier 对代码进行格式化；
- 提交前请确保 ESLint 不会报告 warning / error；

满足上述条件后发起 Pull Request，仓库管理员审阅后将合并到主分支。

## TODO

- [x] #6 文件拖放 (利用 `react-dropzone`?)
- [ ] 各类算法 [追踪 `crypto` 标签](https://git.unlock-music.dev/um/um-react/issues?labels=67)
- [ ] #7 简易元数据编辑器
- [x] ~#8 添加单元测试~ 框架加上了，以后慢慢添加更多测试即可。
- [x] ~#2 解密内容探测 (解密过程)~
