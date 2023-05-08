# Getting started

```sh
pnpm i
pnpm start
```

## 架构

- 浏览器主线程: 渲染界面，处理 UI 更新
- Web Worker: 负责计算方面的内容，如内容解密。

数据传输: 生成 blob url (`URL.createObjectURL`) 然后透过 `postMessage` 传递给线程，线程利用 `fetch` API 来获取文件信息。

## TODO

- [ ] #6 文件拖放 (利用 `react-dropzone`?)
- [ ] 各类算法 [追踪 `crypto` 标签](https://git.unlock-music.dev/um/um-react/issues?labels=67)
- [ ] #7 简易元数据编辑器
- [ ] #8 添加单元测试
