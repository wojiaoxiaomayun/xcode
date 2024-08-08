import XCode from './src/index'
import ButtonNode from './src/editor/node/ButtonNode'
let xcode = new XCode(document.getElementById('app'))
xcode.registerNode(ButtonNode)
xcode.renderData({
  nodes:[{
    name:'__x_button',
    props:{
      text:'我爱中国共产党'
    }
  }]
})