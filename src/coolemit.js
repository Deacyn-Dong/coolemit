!function (root, factory) {
  if (typeof module === 'object' && module.exports)
    module.exports = factory();
  else
    root.coolemit = factory();
}(typeof window !== 'undefined' ? window : this, function () {
  var __coolemitEvents = {}
  var index = 0
  var hasKey = Function.call.bind(Object.hasOwnProperty)
  var slice = Function.call.bind(Array.prototype.slice)

  function one (eventName, callback, context) {
    return _bind_func(eventName, callback, context, 1)
  }

  function on (eventName, callback, context) {
    return _bind_func(eventName, callback, context, 0)
  }

  function emit(eventName) {
    var args = slice(arguments, 1)
    setTimeout(function () {
      _emit_func(eventName, args)
    })
  }

  function emitSync(eventName) {
    var args = slice(arguments, 1)
    _emit_func(eventName, args)
  }

  function _bind_func (eventName, callback, context, isOne) {
    // 判断参数
    if (typeof eventName !== 'string' || typeof callback !== 'function') {
      throw new Error('arguments error')
    }
    // 判断是否有该事件
    if (! hasKey(__coolemitEvents, eventName)) {
      __coolemitEvents[eventName] = []
    }
    // 绑定事件
    __coolemitEvents[eventName][index++] = {
      'callback': callback,
      'context': context,
      'isOne': isOne
    }
    // 为解绑提供依据
    return {'eventName': eventName, 'index': index}
  }

  function _emit_func (eventName, args) {
    if (!hasKey(__coolemitEvents, eventName)) {
      throw new Error('emit an event which does not exist') 
    }
    var eventList = __coolemitEvents[eventName]
    // console.log(__coolemitEvents)
    // console.log(eventList)
    for (var i = 0; i < eventList.length; i++) {
      var item = eventList[i]
      console.log(item)
      item['callback'].apply(item['context'], args)
      if (item['isOne']) delete __coolemitEvents[eventName]
    }
    // __coolemitEvents[eventName].forEach(item => {
    //   item['callback'].apply(item['content'], args)
    //   if (item['isOne']) delete __coolemitEvents[eventName]
    // })
  }

  function un (event) {
    if (typeof event === 'string') {
      if (hasOwnKey(__coolemitEvents, eventName)) {
        delete __coolemitEvents[eventName]
        return true
      }
      return false
    } else if (typeof event === 'object') {
      // eventName = event.eventName
      eventName = event.eventName
      index = event.index
      if (hasOwnKey(__coolemitEvents, eventName) && Boolean(__coolemitEvents[eventName][index])) {
        delete __coolemitEvents[eventName][index]
        return true
      }
      return false
    } else {
      throw new Error('unbind arguments error')
    }
  }

  function clear() {
    __coolemitEvents = {}
  }
  return {
    on: on,
    one: one,
    un: un,
    emit: emit,
    emitSync: emitSync,
    clear: clear
  }
});