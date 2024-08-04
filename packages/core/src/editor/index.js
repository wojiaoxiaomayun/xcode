
import {defineComponent,h} from '@vue/runtime-dom'
import Editor from './view/Editor'
export default defineComponent(() => {
  let editor = new Editor()
  return () => h('div',{
    id:'xcode',
    class:['w-100%','h-100%','relative']
  },[
    h(editor.render())
  ])
  
})