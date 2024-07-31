
import {ref,defineComponent,h,onMounted} from '@vue/runtime-dom'
//@unocss-skip-start
//class="absolute relative b-rd transform-x min-w z-1"
//@unocss-skip-end
import Guides from '@scena/guides'
import ScrollTool from '../util/scroll'
export default defineComponent(() => {
  const editorWidth = ref(2000)
  const editorHight = ref(2000)
  onMounted(() => {
    const guidesDom = document.getElementById('xcode-editor-horizontal-guide');
    const guides = new Guides(guidesDom, {
        type: "horizontal",
    }).on("changeGuides", e => {
        console.log(e.guides);
    });
    guides.scroll(-20)
    const guides1Dom = document.getElementById('xcode-editor-vertical-guide');
    const guides1 = new Guides(guides1Dom, {
        type: "vertical",
    }).on("changeGuides", e => {
        console.log(e.guides);
    });
    guides1.scroll(-20)
    let scrollTool = new ScrollTool(document.getElementById('xcode-editor-container'))
    scrollTool.init((position,isBottom,type) => {
      if(type == 'horizontal'){
        guides.scroll(position)
        guides1.scrollGuides(position)
      }else{
        guides1.scroll(position)
        guides.scrollGuides(position)
      }
    })
  })
  return () => h('div',{
    id:'xcode',
    class:['w-100%','h-100%','relative']
  },[
    h('div',
      {
        id:'xcode-editor-horizontal-guide',
        class:['absolute','top-0','left-30px','right-0','h-30px','z-1']
    }),
    h('div',
      {
        id:'xcode-editor-vertical-guide',
        class:['absolute','top-30px','bottom-20px','left-0','w-30px','z-1']
    }),
    h('div',{
      id:'xcode-editor-container',
      class:['w-100%','h-100%','of-auto','bg-#1B1B1F']
    },[
      h('div',{
        id:'xcode-editor',
        class:['bg-white','m-50px','b-rd-md'],
        style:{width:`${editorWidth.value}px`,height:`${editorHight.value}px`},
      })
    ])
  ])
  
})