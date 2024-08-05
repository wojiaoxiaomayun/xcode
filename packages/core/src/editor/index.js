
import {defineComponent,h} from '@vue/runtime-dom'
import Editor from './view/Editor'
import ToolsLayer from './view/ToolLayer'
export default defineComponent(() => {
  let editor = new Editor()
  let toolsLayer = new ToolsLayer()
  return () => h('div',{
    id:'xcode',
    class:['w-100%','h-100%','relative']
  },[
    h(editor.render()),
    h(toolsLayer.render())
  ])
  
})