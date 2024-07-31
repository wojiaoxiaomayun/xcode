import { renderFlow } from "./flow";
import { createApp,h } from "@vue/runtime-dom";
import Index from './component/index.js'
import 'uno.css'
class XCode{
  lf = null;
  plugins = [];
  constructor(dom,options = {
    flowOptions:{}
  }){
    if(!dom){
      throw new Error('没有可渲染的DOM元素');
    }
    this.#initXCode(dom)
    // this.#initFlow(options?.flowOptions)
  }

  #initXCode(dom){
    console.log(Index)
    createApp(Index).mount(dom)
  }
  
  #initFlow(flowOptions = {}){
    flowOptions.container = flowOptions.container || document.querySelector('#xcode-flow')
    this.lf = renderFlow(flowOptions)
  }
}

export default XCode;