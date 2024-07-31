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
  content:{
    pipeline:{
      include:[/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,'src/component/*.js']
    }
  }
})