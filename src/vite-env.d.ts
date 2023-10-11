/// <reference types="vite/client" />

module 'virtual:pwa-register' {
  /**
   * See: {@link https://vite-pwa-org.netlify.app/guide/prompt-for-update.html}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  declare function registerSW(opts: unknown): () => void;
}
