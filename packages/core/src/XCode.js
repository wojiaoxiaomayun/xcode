import { renderFlow } from "./flow";
import { createApp,h,ref } from "@vue/runtime-dom";
import { createPinia } from 'pinia'
import Editor from './editor/index.js'
import 'uno.css'
import { useEditorOptionStore } from "./config/options.js";
import Bus from "./util/Bus.js";
import GuidesPlugin from './plugins/editor-guides-plugin.js'
import { BaseNode } from "@logicflow/core";
class XCode{
  preview = false;
  container = null;
  lf = null;
  plugins = new Map();
  bus = new Bus();
  editor = null;
  /**
   * 注册的节点
   */
  rnodes = new Map();

  nodes = []

  constructor(dom,options = {
    preview:false,
    flow:{},
    editor:{},
    plugins:[GuidesPlugin]
  }){
    if(!dom){
      throw new Error('没有可渲染的DOM元素');
    }
    this.preview = options.preview
    if(!this.preview){
      this.#initXCode(dom,options)
      // this.#initFlow(options?.flowOptions)
      options.plugins?.forEach(plugin => {
        if(plugin.type != 'preview'){
          this.use(plugin)
        }
      })
    }else{
      options.plugins?.forEach(plugin => {
        if(plugin.type != 'dev'){
          this.use(plugin)
        }
      })
    }
  }
  /**
   * 安装插件
   * @param {插件} plugin 
   */
  use(plugin){
    this.plugins.set(plugin.name,plugin)
    plugin.install(this)
  }
  /**
   * 注册节点
   * @param {节点类} rnode 
   */
  registerNode(rnode){
    console.log(rnode)
    // if(rnode instanceof BaseNode){
      this.rnodes.set(rnode.name,rnode)
    // }else{
    //   console.error('请注册正确的节点')
    // }
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

  renderData(data){
    data.nodes?.forEach(node => {
      let cla = this.rnodes.get(node.name)
      if(cla){
        let nodeObj = Reflect.construct(cla,[this])
        nodeObj.init(this.editor.renderLayer.getTarget())
        nodeObj.renderData(node.props)
      }
    })
    Object.keys(data.plugins || {}).forEach(key => {
      this.plugins.get(key)?.renderData(data.plugins[key])
    })
  }

  getData(){
    let data = {
      nodes:[],
      plugins:{}
    }
    this.nodes.forEach(node => {
      data.nodes.push(node.getData())
    })
    this.plugins.forEach((value,key) => {
      data.plugins[key] = value.getData()
    })
    return data;
  }


}

export default XCode;