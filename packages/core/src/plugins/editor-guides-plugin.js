import Bus from "../util/Bus";
import { Editor_Mounted,Editor_UnMounted } from "../EventKey";
import Guides from '@scena/guides'
const GuidesPlugin = {
  name:'editor-guides-plugin',
  install(options){
    Bus.on(Editor_Mounted,function(){
      this.initHguides()
      this.initVguides()
    })
    Bus.on(Editor_UnMounted,function(){

    })
  },
  // 创建标尺
  initHguides(){
    const guidesDom = document.getElementById('xcode-editor-horizontal-guide');
    this.hguides = new Guides(guidesDom, {
        type: "horizontal",
    }).on("changeGuides", e => {
        console.log(e.guides);
    });
    this.hguides.scroll(-20)
  },
  // 创建标尺
  initVguides(){
    const guides1Dom = document.getElementById('xcode-editor-vertical-guide');
    this.vguides = new Guides(guides1Dom, {
        type: "vertical",
    }).on("changeGuides", e => {
        console.log(e.guides);
    });
    this.vguides.scroll(-20)
  }
}
export default GuidesPlugin;