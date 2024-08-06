import {defineComponent,h,onMounted, onUnmounted,ref} from '@vue/runtime-dom'
import ScrollTool from '../util/scroll'

import Conveyer from '@egjs/conveyer'
import ButtonNode from '../node/ButtonNode'
export default class RenderLayer{
  target = ref(null)
  //监听滚动条对标尺做出变更 
  #initScroll(){
    onMounted(() => {
      let scrollTool = new ScrollTool(document.getElementById('xcode-editor-container'))
      scrollTool.init((position,isBottom,type) => {
        if(type == 'horizontal'){
          this.hguides?.scroll(position - 20)
          this.vguides?.scrollGuides(position)
        }else{
          this.vguides?.scroll(position - 20)
          this.hguides?.scrollGuides(position)
        }
      })
      onUnmounted(() => {
        scrollTool.destroy()
      })
    })
  }
  //创建editor拖拽
  #initConveyer(){
    onMounted(() => {
      const hig = new Conveyer("#xcode-editor-container");
      const vig = new Conveyer("#xcode-editor-container",{horizontal:false});
      onUnmounted(() => {
        hig.destory()
        vig.destory()
      })
    })
  }

  render(){
    return defineComponent(() => {
      this.#initScroll()
      this.#initConveyer()
      onMounted(() => {
        // this.xcode.bus.emit(Editor_Mounted)
        console.log('renderLayer')
        let node = new ButtonNode();
        node.init(this.target.value)
        setTimeout(() => {
          console.log(this.target.value.querySeletor('div'))
          node.text.value = '中国共产党'
        },2000)
      })
      onUnmounted(() => {
      })
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