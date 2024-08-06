import BaseNode from "./BaseNode";
import {ref,h,render as renderDom,defineComponent} from '@vue/runtime-dom'
export default class ButtonNode extends BaseNode{
  name = '__x_button'
  text = ref('按钮')

  resizable = false
  
  render(editor){
    console.log(editor)
    const Button = defineComponent(({}) => {
      return () => h('div',{
        class:['w-auto','h-auto','of-hidden','pt-8px','pb-8px','pl-16px','pr-16px','bg-red','color-white','b-none',this.position]
      },this.text.value)
    })
    let vnode = h(Button)
    renderDom(vnode,editor)
    return vnode.el
  }

  backup(){

  }

  restore(data){

  }
}

