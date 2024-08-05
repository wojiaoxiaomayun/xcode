import {defineComponent,h,onMounted, onUnmounted} from '@vue/runtime-dom'
import ScrollTool from '../util/scroll'

import Conveyer from '@egjs/conveyer'
import ButtonNode from '../node/ButtonNode'
import Bus from '../../util/Bus'
import {Editor_Mounted,Editor_UnMounted} from '../../EventKey'
export default class Editor{
  hguides = null
  vguides = null
  

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
        Bus.emit(Editor_Mounted)
        let node = new ButtonNode();
        node.init(document.getElementById('xcode-editor'))
        setTimeout(() => {
          node.text.value = '中国共产党'
        },2000)
      })
      onUnmounted(() => {
        Bus.emit(Editor_UnMounted)
      })
      return () => h('div',{
        class:['w-100%','h-100%','relative']
      },[
        h('div',
          {
            id:'xcode-editor-horizontal-guide',
            class:['absolute','top-0','left-30px','right-0','h-30px','z-1']
        }),
        h('div',
          {
            id:'xcode-editor-vertical-guide',
            class:['absolute','top-30px','bottom-20px','left-0','w-30px','z-1']
        }),
        h('div',{
          id:'xcode-editor-container',
          class:['w-100%','h-100%','of-auto','bg-#1B1B1F']
        },[
          h('div',{
            id:'xcode-editor',
            class:['bg-white','m-50px','b-rd-md','shadow-xl','shadow-white','relative','w-1200px','h-1800px']
          })
        ])
      ]) 
    },{
      name:'Editor'
    })
  }
}