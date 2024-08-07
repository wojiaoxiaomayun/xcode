import { defineComponent,h,ref } from "@vue/runtime-dom";
export default class ToolsLayer{
  target = ref(null)
  getTarget(){
    return this.target.value;
  }
  render(){
    return defineComponent(() => {
      return () => h('div',{
        ref:this.target,
        class:['xcode-tools-layer','xcode-tools-layer-child-pointer','w-100%','h-100%','absolute','top-0','left-0','bg-transparent','z-9999','pointer-events-none','']
      })
    })
  }
}