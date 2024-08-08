import { Editor_Mounted,Editor_UnMounted } from "../EventKey";
import Guides from '@scena/guides'
import ScrollTool from '../editor/util/scroll'
const GuidesPlugin = {
  name:'editor-guides-plugin',
  // dev|preview|both
  type:'dev',
  xcode:null,
  hguides:null,
  vguides:null,
  install(xcode){
    this.xcode = xcode;
    this.initHguides()
    this.initVguides()
    this.initScroll()
  },
  initScroll(){
      let scrollTool = new ScrollTool(this.xcode.editor.renderLayer.getTarget().parentElement)
      scrollTool.init((position,isBottom,type) => {
        if(type == 'horizontal'){
          this.hguides?.scroll(position - 20)
          this.vguides?.scrollGuides(position)
        }else{
          this.vguides?.scroll(position - 20)
          this.hguides?.scrollGuides(position)
        }
      })
      this.xcode.bus.on(Editor_UnMounted,function(){
        scrollTool.destory()
      })
  },
  // 创建标尺
  initHguides(){
    const guidesDom = document.createElement('div');
    guidesDom.className = ['absolute','top-0','left-30px','right-0','h-30px','z-1'].join(' ')
    console.log(guidesDom)
    this.xcode.editor.toolsLayer.getTarget().appendChild(guidesDom)
    this.hguides = new Guides(guidesDom, {
        type: "horizontal",
    }).on("changeGuides", e => {
        console.log(e.guides);
    });
    this.hguides.scroll(-20)
    this.xcode.bus.on(Editor_UnMounted,function(){
      this.hguides.destory()
    })
  },
  // 创建标尺
  initVguides(){
    const guides1Dom = document.createElement('div');
    guides1Dom.className = ['absolute','top-30px','bottom-20px','left-0','w-30px','z-1'].join(' ')
    this.xcode.editor.toolsLayer.getTarget().appendChild(guides1Dom)
    this.vguides = new Guides(guides1Dom, {
        type: "vertical",
    }).on("changeGuides", e => {
        console.log(e.guides);
    });
    this.vguides.scroll(-20)
    this.xcode.bus.on(Editor_UnMounted,function(){
      this.vguides.destory()
    })
  }
}
export default GuidesPlugin;