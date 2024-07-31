class BaseNode{
  input = []
  output = []

  constructor(input,output){
    this.input = input;
    this.output = output;
  }

  setInputVal(key,value){
    let input = this.getInput().find(input => input.key == key);
    if(input){
      input.value = value;
    }
  }

  renderNode(dom){
    dom.innerHTML = 'BaseNode'
  }

  render(dom){
    dom.innerHTML = 'BaseNode'
  }
}

export default BaseNode;