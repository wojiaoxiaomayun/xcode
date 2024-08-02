import { defineStore } from 'pinia'
import {ref} from '@vue/runtime-dom'
export const useEditorOptionStore = defineStore('userOptions',() => {
  const width = ref('1920px')
  const height = ref('1080px')

  function init(editorOptions){
    width.value = editorOptions.width || '1920px'
    height.value = editorOptions.height || '1080px'
  }

  return {width,height,init}
})