# 新手上路

该文档描述了如何本地运行或编译生产版本的「Unlock Music 音乐解锁」。

## 安装依赖

- 安装 Node v16.17 或更高，推荐当前最新的 Node LTS 版本。
- 安装/激活 `yarn` [^1]：`corepack enable && corepack prepare yarn@stable --activate`
- 安装软件依赖：`yarn install`

[^1]: 参考 yarn 的安装说明「[Installation | Yarn - Package Manager](https://yarnpkg.com/getting-started/install)」。

## 本地运行

💡 你需要先完成「安装依赖」部分。

```sh
yarn start
```

然后根据提示打开[项目运行页面][vite-dev-url]即可。

[vite-dev-url]: http://localhost:5173/

## 构建生产版本

💡 你需要先完成「安装依赖」部分。

```sh
yarn build
```

如果需要预览构建版本，运行 `yarn preview` 然后打开[项目预览页面][vite-preview-url]即可。

[vite-preview-url]: http://localhost:4173/
