import { defineComponent,h,ref } from "@vue/runtime-dom";
export default class ToolsLayer{
  target = ref(null)
  render(){
    return defineComponent(() => {
      return () => h('div',{
        ref:this.target,
        class:['xcode-tools-layer','w-100%','h-100%','absolute','top-0','left-0','bg-transparent','z-9999','pointer-events-none','relative']
      })
    })
  }
}