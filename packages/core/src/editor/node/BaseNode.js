import { useDefaultMoveable } from "../util/createMoveable"

export default class BaseNode {
  DEV__STATUS = true

  static name = '__x_base'

  //定位模式
  position = 'absolute'

  target = null

  resizable = true

  xcode = null

  constructor(xcode){
    this.xcode = xcode;
  }

  init(editor) {
    this.target = this.render(editor)
    if (this.DEV__STATUS) {
      if (this.position == 'absolute') {
        this.initMoveable(editor)
      }
    }
  }

  initMoveable(editor) {
    useDefaultMoveable(editor, this.target, this.resizable)
  }

  //渲染
  render(editor) {
    let dom = document.createElement('div')
    dom.innerHTML = '初始节点'
    editor.appendChild(dom)
    return dom;
  }

  //备份数据，包括要渲染的状态等等
  backup() {

  }
  //还原数据及状态
  restore(data) {

  }
}