// vite.config.ts
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import { resolve } from 'path'
export default defineConfig({
  plugins: [
    UnoCSS()
  ],
  build: {
    target:'ES2015',
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'XCode',
      // the proper extensions will be added
      fileName: 'index',
    },
    assetsDir: "dist/static"
  }
})