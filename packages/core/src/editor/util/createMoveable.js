import Moveable from "moveable";

export const createMoveable = (partentElement,options) => {
  return new Moveable(partentElement,options)
}

export const useDefaultMoveable = (editorDom,target,resizable) => {
  const moveable = createMoveable(editorDom,{
    target:target,
    draggable: true,
    resizable: true,
    stopPropagation:true,
    snappable: true,
    snapDirections: {
      top: true,
      left: true,
      bottom: true,
      right: true,
      center: true,
      middle: true
    },
    elementSnapDirections: {
      middle: true,
      center: true,
      top: true,
      left: true,
      bottom: true,
      right: true
    },
    snapThreshold: 5,
    elementGuidelines: [editorDom],
    scrollable:true,
    scrollOptions:{
      container: editorDom.parentElement,
      threshold: 30,
      checkScrollEvent: false,
      throttleTime: 0,
    }
  })
  moveable.useResizeObserver = true;
  moveable.on('scroll',({scrollContainer, direction}) => {
    scrollContainer.scrollBy(direction[0] * 10, direction[1] * 10);
  })
  moveable.on("dragStart", ({ target, clientX, clientY }) => {
      // console.log("onDragStart", target);
  }).on("drag", ({
      target, transform,
      left, top, right, bottom,
      beforeDelta, beforeDist, delta, dist,
      clientX, clientY,
  }) => {
      if(left > 0 && right > 0){
        target.style.left = `${left}px`;
      }
      if(top > 0 && bottom > 0){
        target.style.top = `${top}px`;
      }
  }).on("dragEnd", (data) => {
      // console.log("onDragEnd", target, isDrag);
      console.log(data)
  });
  
  if(resizable){
    moveable.on("resizeStart", ({ target, clientX, clientY }) => {
    }).on("resize", ({ target, width, height, dist, delta, clientX, clientY }) => {
        console.log("onResize", target);
        delta[0] && (target.style.width = `${width}px`);
        delta[1] && (target.style.height = `${height}px`);
    }).on("resizeEnd", ({ target, isDrag, clientX, clientY }) => {
    });
  }
  return moveable;
}