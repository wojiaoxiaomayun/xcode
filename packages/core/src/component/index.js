
import {defineComponent,h} from '@vue/runtime-dom'
import Editor from './Editor'
export default defineComponent(() => {
  return () => h('div',{
    id:'xcode',
    class:['w-100%','h-100%','relative']
  },[
    h(Editor)
  ])
  
})