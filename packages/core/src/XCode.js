import { renderFlow } from "./flow";
import { createApp,h } from "@vue/runtime-dom";
import { createPinia } from 'pinia'
import Editor from './editor/index.js'
import 'uno.css'
import { useEditorOptionStore } from "./config/options.js";
import Bus from "./util/Bus.js";
class XCode{
  container = null
  lf = null;
  plugins = [];
  bus = new Bus()
  constructor(dom,options = {
    flow:{},
    editor:{},
    plugins:[]
  }){
    if(!dom){
      throw new Error('没有可渲染的DOM元素');
    }
    this.plugins = options.plugins
    this.#initXCode(dom,options)
    // this.#initFlow(options?.flowOptions)
  }

  #initPlugins(){
    this.plugins?.forEach(e => {
      e.install(this)
    })
  }

  #initXCode(dom,options){
    let editor = new Editor(this)
    let app = createApp(editor.render())
    app.use(createPinia()).mount(dom)
    this.container = app._container
    const {init} = useEditorOptionStore();
    init(options.editor)
  }
  
  #initFlow(flowOptions = {}){
    flowOptions.container = flowOptions.container || document.querySelector('#xcode-flow')
    this.lf = renderFlow(flowOptions)
  }
}

export default XCode;