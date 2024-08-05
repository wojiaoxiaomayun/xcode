import { defineComponent,h } from "@vue/runtime-dom";
export default class ToolsLayer{
  render(){
    return defineComponent(() => {
      return () => h('div',{
        id:'xcode-tools-layer',
        // class=""
        class:['w-100%','h-100%','absolute','top-0','left-0','bg-transparent','z-9999','pointer-events-none','relative']
      })
    })
  }
}