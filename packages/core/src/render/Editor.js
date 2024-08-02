
import {ref,defineComponent,h,onMounted,onUnmounted} from '@vue/runtime-dom'
import Guides from '@scena/guides'
import ScrollTool from '../util/scroll'
import Moveable from 'moveable'
import Conveyer from "@egjs/conveyer";
import {useEditorOptionStore} from '../config/options'
export default defineComponent(() => {
  const editorOptions = useEditorOptionStore();
  let scrollTool = null
  let guides = null
  let guides1 = null
  onMounted(() => {
    const ig = new Conveyer("#xcode-editor-container");
    const ig1 = new Conveyer("#xcode-editor-container",{horizontal:false});
    const guidesDom = document.getElementById('xcode-editor-horizontal-guide');
    guides = new Guides(guidesDom, {
        type: "horizontal",
    }).on("changeGuides", e => {
        console.log(e.guides);
    });
    guides.scroll(-20)
    const guides1Dom = document.getElementById('xcode-editor-vertical-guide');
    guides1 = new Guides(guides1Dom, {
        type: "vertical",
    }).on("changeGuides", e => {
        console.log(e.guides);
    });
    guides1.scroll(-20)
    scrollTool = new ScrollTool(document.getElementById('xcode-editor-container'))
    scrollTool.init((position,isBottom,type) => {
      if(type == 'horizontal'){
        guides.scroll(position - 20)
        guides1.scrollGuides(position)
      }else{
        guides1.scroll(position - 20)
        guides.scrollGuides(position)
      }
    })
    const moveable = new Moveable(document.getElementById('xcode-editor'),{
      target:'.xcode-editor-moveable',
      draggable: true,
      resizable: true,
      scalable: true,
      rotatable: true,
      warpable: true,
      // Enabling pinchable lets you use events that
      // can be used in draggable, resizable, scalable, and rotateable.
      pinchable: true, // ["resizable", "scalable", "rotatable"]
      origin: true,
      keepRatio: true,
      // Resize, Scale Events at edges.
      edge: false,
      throttleDrag: 0,
      throttleResize: 0,
      throttleScale: 0,
      throttleRotate: 0,
      stopPropagation:true
    })
    moveable.on("dragStart", ({ target, clientX, clientY }) => {
        console.log("onDragStart", target);
    }).on("drag", ({
        target, transform,
        left, top, right, bottom,
        beforeDelta, beforeDist, delta, dist,
        clientX, clientY,
    }) => {
      console.log(target)
      target.style.transform = `translate(${left}px,${top}px)`
        if(left > 0 && right > 0){
          target.style.left = `${left}px`;
        }
        if(top > 0 && bottom > 0){
          target.style.top = `${top}px`;
        }
    }).on("dragEnd", ({ target, isDrag, clientX, clientY }) => {
        console.log("onDragEnd", target, isDrag);
    });
  })
  onUnmounted(() => {
    if(scrollTool){
      scrollTool.destroy()
    }
    if(guides){
      guides.destroy()
    }
    if(guides1){
      guides1.destroy()
    }
  })
  return () => h('div',{
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
        class:['bg-white','m-50px','b-rd-md','shadow-xl','shadow-white','relative'],
        style:{width:`${editorOptions.width}`,height:`${editorOptions.height}`},
      },[h('div',{
        class:['xcode-editor-moveable','w-100','h-100','bg-red']
      })])
    ])
  ]) 
},{
  name:'Editor'
})