// uno.config.ts
import { defineConfig,presetUno } from 'unocss'

export default defineConfig({
  // ...UnoCSS options
  presets:[presetUno()],
  theme:{
    colors:{
      primary:'var(--color-primary)'
    }
  },
  rules:[
    [/^xcode-tools-layer-child-pointer$/,() => {
      console.log('进来')
      return `.xcode-tools-layer-child-pointer *{pointer-events: all;}`
    }]
  ],
  content:{
    pipeline:{
      include:[/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,'src/**/*.js']
    }
  }
})