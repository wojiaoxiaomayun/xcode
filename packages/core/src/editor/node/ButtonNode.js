import BaseNode from "./BaseNode";
import {ref,h,render as renderDom,defineComponent,nextTick} from '@vue/runtime-dom'
import Moveable from "moveable";
export default class ButtonNode extends BaseNode{
  name = '__x_button'
  text = ref('按钮')

  resizable = false
  
  render(editor){
    const Button = defineComponent(({},{attrs}) => {
      return () => h('div',{
        class:['w-auto','h-auto','of-hidden','pt-8px','pb-8px','pl-16px','pr-16px','bg-red','color-white','b-none',this.position]
      },attrs.text.value)
    })
    let vnode = h(Button,{
      text:this.text
    })
    renderDom(vnode,editor)
    return vnode.el
  }

  backup(){

  }

  restore(data){

  }
}

