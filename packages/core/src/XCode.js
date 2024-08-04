import { renderFlow } from "./flow";
import { createApp,h } from "@vue/runtime-dom";
import { createPinia } from 'pinia'
import Index from './editor/index.js'
import 'uno.css'
import { useEditorOptionStore } from "./config/options.js";
class XCode{
  lf = null;
  plugins = [];
  constructor(dom,options = {
    flow:{},
    editor:{}
  }){
    if(!dom){
      throw new Error('没有可渲染的DOM元素');
    }
    this.#initXCode(dom,options)
    // this.#initFlow(options?.flowOptions)
  }

  #initXCode(dom,options){
    createApp(Index).use(createPinia()).mount(dom)
    const {init} = useEditorOptionStore();
    init(options.editor)
  }
  
  #initFlow(flowOptions = {}){
    flowOptions.container = flowOptions.container || document.querySelector('#xcode-flow')
    this.lf = renderFlow(flowOptions)
  }
}

export default XCode;