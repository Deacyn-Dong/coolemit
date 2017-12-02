# coolemit

一个小巧的发布/订阅库，使用JavaScript语言实现

## 用途

解决一些通知或传参问题

1. 微信小程序后退时无法传参

```
A -> B -> C

// 在C页面内 navigateBack，将返回A页面
wx.navigateBack({
  delta: 2
})
```

API文档中，只能配置后退层级，不能带参数，这时可以使用coolemit，在当前页面发布一个事件，在后退页面订阅事件来解决

2. Vue的事件总线

在一些多级嵌套的组件或者没有父子关联的组件中，使用coolemit建立通道，进行传参

## 优势

轻巧（不带注释100+行），便捷（迅速解决问题），鲜活（提供ES5和ES6两个版本）

## 文档

1. 引用

```
import coolemit from 'coolemit.js';

// or

var coolemit = require("coolemit.js");
```

2. 使用

```
import coolemit from 'coolemit.js';

function test_callback(data1, data2) {
  console.log('this is a event 1');
}

// 订阅事件
var eventObj = coolemit.on('test_event', test_callback);
var eventObj2 = coolemit.on('test_event', function(data1, data2) {
  console.log('this is a event 2');
});

// 发布事件
coolemit.emit('test_event', 'test_data1', 'test_data2');

// 取消订阅
coolemit.un(eventObj); // only cancel the eventObj.
coolemit.un('test_event'); // cancel all events named `test_event`.
coolemit.un(test_callback); // cancel all the `test_callback` functions.
```

## LICENSE

MIT
