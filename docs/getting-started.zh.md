# 新手上路

该文档描述了如何本地运行或编译生产版本的「Unlock Music 音乐解锁」。

## 安装依赖

- 安装 Node v16.17 或更高，推荐当前最新的 Node LTS 版本。
- 安装/激活 `pnpm` [^1]：`corepack prepare pnpm@latest --activate`
- 安装软件依赖：`pnpm i --frozen-lockfile`

[^1]: 参考 pnpm 说明「[使用 Corepack 安装](https://pnpm.io/zh/installation#使用-corepack-安装)」。

## 本地运行

💡 你需要先完成「安装依赖」部分。

```sh
pnpm start
```

然后根据提示打开[项目运行页面][vite-dev-url]即可。

[vite-dev-url]: http://localhost:5173/

## 构建生产版本

💡 你需要先完成「安装依赖」部分。

```sh
pnpm build
```

如果需要预览构建版本，运行 `pnpm preview` 然后打开[项目预览页面][vite-preview-url]即可。

[vite-preview-url]: http://localhost:4173/

## 打包 `.zip`

建议在 Linux 环境下执行，可参考 `.drone.yml` CI 文件。

1. 确保上述的构建步骤已完成。
2. 确保 `python3` 已安装。
3. 执行下述代码
   ```sh
   python3 -m zipfile -c um-react.zip dist/.
   ```

## 打包 win64 单文件

利用 Windows 系统自带的 [Edge WebView2 组件](https://learn.microsoft.com/zh-cn/microsoft-edge/webview2/)
和 [wry](https://github.com/tauri-apps/wry) 进行一个单文件的打包。

大部分 Windows 10 或以上版本的操作系统已经集成了 WebView2 运行时。若无法正常启动，请[下载并安装 Edge WebView2 运行时](https://go.microsoft.com/fwlink/p/?LinkId=2124703)。

其它系统兼容性未知。

1. 确保你现在在 `linux-amd64` 环境下。
2. 确保上述的 `um-react.zip` 构建已完成。
3. 执行下述代码
   ```sh
   ./scripts/make-win64.sh
   ```
4. 等待提示 `[Build OK]` 即可。
