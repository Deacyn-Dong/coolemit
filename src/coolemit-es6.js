!function (root, factory) {
  if (typeof module === 'object' && module.exports)
    module.exports = factory();
  else
    root.coolemit = factory();
}(typeof window !== 'undefined' ? window : this, function () {
  let __coolemitEvents = {}
  let index = 0
  const hasKey = Function.call.bind(Object.hasOwnProperty)

  function one (eventName, callback, context) {
    return _bind_func(eventName, callback, context, 1)
  }

  function on (eventName, callback, context) {
    return _bind_func(eventName, callback, context, 0)
  }

  function emit(eventName, ...args) {
    setTimeout(() => {
      _emit_func(eventName, args)
    })
  }

  function emitSync(eventName, ...args) {
    _emit_func(eventName, args)
  }

  function _bind_func (eventName, callback, context, isOne) {
    // 判断参数
    if (typeof eventName !== 'string' || typeof callback !== 'function') {
      throw new Error('arguments error')
    }
    // 判断是否有该事件
    if (!hasKey(__coolemitEvents, eventName)) {
      __coolemitEvents[eventName] = []
    }
    // 绑定事件
    __coolemitEvents[eventName][index++] = {
      callback,
      context,
      isOne
    }
    // 为解绑提供依据
    return { eventName, index }
  }

  function _emit_func (eventName, args) {
    if (!hasKey(__coolemitEvents, eventName)) {
      throw new Error('emit an event which does not exist') 
    }
    __coolemitEvents[eventName].forEach(item => {
      item['callback'].apply(item['content'], args)
      if (item['isOne']) delete __coolemitEvents[eventName]
    })
  }

  function un (event) {
    if (typeof event === 'string') {
      if (hasKey(__coolemitEvents, eventName)) {
        delete __coolemitEvents[eventName]
        return true
      }
      return false
    } else if (typeof event === 'object') {
      const { eventName, index } = event
      if (hasKey(__coolemitEvents, eventName) && Boolean(__coolemitEvents[eventName][index])) {
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
    on,
    one,
    un,
    emit,
    emitSync,
    clear
  }
});