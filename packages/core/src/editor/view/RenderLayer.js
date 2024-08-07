import {defineComponent,h,onMounted, onUnmounted,ref} from '@vue/runtime-dom'
import ScrollTool from '../util/scroll'

import Conveyer from '@egjs/conveyer'
export default class RenderLayer{
  target = ref(null)
  //监听滚动条对标尺做出变更 

  getTarget(){
    return this.target.value;
  }
  
  //创建editor拖拽
  #initConveyer(){
    onMounted(() => {
      const hig = new Conveyer(this.target.value.parentElement);
      const vig = new Conveyer(this.target.value.parentElement,{horizontal:false});
      onUnmounted(() => {
        hig.destory()
        vig.destory()
      })
    })
  }

  render(){
    return defineComponent(() => {
      this.#initConveyer()
      return () => 
        h('div',{
          class:['xcode-editor-wrap','w-100%','h-100%','of-auto','bg-#1B1B1F']
        },[
          h('div',{
            ref:this.target,
            class:['xcode-editor-page','bg-white','m-50px','b-rd-md','shadow-xl','shadow-white','relative','w-1200px','h-1800px']
          })
        ])
    },{
      name:'Editor'
    })
  }
}