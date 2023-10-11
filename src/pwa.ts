import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('应用程序已更新，是否刷新？')) {
      updateSW();
    }
  },
  onOfflineReady() {},
});
