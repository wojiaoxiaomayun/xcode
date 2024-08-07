
import {defineComponent,h,onMounted,onUnmounted,nextTick} from '@vue/runtime-dom'
import RenderLayer from './view/RenderLayer'
import ToolsLayer from './view/ToolLayer'
import {Editor_Mounted,Editor_UnMounted } from '../EventKey'
export default class Editor{
  xcode = null
  renderLayer = null
  toolsLayer = null

  constructor(xcode){
    this.xcode = xcode
    this.renderLayer = new RenderLayer();
    this.toolsLayer = new ToolsLayer()
  }

  render(){
    return defineComponent(() => {
      onMounted(() => {
        nextTick(() => {
          this.xcode.bus.emit(Editor_Mounted)
        })
      })
      onUnmounted(() => {
        this.xcode.bus.emit(Editor_UnMounted)
      })
      return () => h('div',{
        class:['xcode-editor-container','w-100%','h-100%','relative']
      },[
        h(this.renderLayer.render()),
        h(this.toolsLayer.render())
      ])
    })
  }
}
