export default class Bus{
  listener = new Map();

	on(eventName,callBack){
    if(!callBack){
      return this;
    }
		if(!this.listener.has(eventName)){
			this.listener.set(eventName,[])
		}
    this.listener.get(eventName).push(callBack);
		return this;
	}
  emit(eventName,options){ 
    let callbacks = this.listener.get(eventName) || []
    callbacks.forEach(callback => {
      let ret = callback.call(this,options)
      if(options.success){ret?options.success(ret):options.success()}							
    })
    return this;
	}
	remove(eventName){
		this.listener.delete(eventName)
    return this;
	}
};