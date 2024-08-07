import { renderFlow } from "./flow";
import { createApp,h,ref } from "@vue/runtime-dom";
import { createPinia } from 'pinia'
import Editor from './editor/index.js'
import 'uno.css'
import { useEditorOptionStore } from "./config/options.js";
import Bus from "./util/Bus.js";
import GuidesPlugin from './plugins/editor-guides-plugin.js'
class XCode{
  container = null
  lf = null;
  plugins = new Map();
  bus = new Bus()
  editor = null
  constructor(dom,options = {
    flow:{},
    editor:{},
    plugins:[]
  }){
    if(!dom){
      throw new Error('没有可渲染的DOM元素');
    }
    this.#initXCode(dom,options)
    // this.#initFlow(options?.flowOptions)
    this.use(GuidesPlugin)
  }
  use(plugin,options){
    this.plugins.set(plugin.name,plugin)
    plugin.install(this,options)
  }

  #initXCode(dom,options){
    this.editor = new Editor(this)
    let app = createApp(this.editor.render())
    app.use(createPinia()).mount(dom)
    this.container = app._container
  }
  
  #initFlow(flowOptions = {}){
    flowOptions.container = flowOptions.container || document.querySelector('#xcode-flow')
    this.lf = renderFlow(flowOptions)
  }
}

export default XCode;