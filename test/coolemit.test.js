const coolemit = require("../src/coolemit.js")
const expect = require('chai').expect

describe('订阅事件', function() {
  it('返回一个对象', function() {
    expect(coolemit.on('demo1',function(e){console.log(e)})).to.be.an('object').and.have.all.keys('eventName', 'index')
    // expect(coolemit.on('demo2')).to.throw(new Error('arguments error'))
  });
});

// describe('发布事件', function() {
//   it('返回结果', function() {
//     var demo = null
//     coolemit.on('demo1',function(e){demo = e;})
//     coolemit.emitSync('demo1', 'test')
//     expect(demo).to.equal('test')
//   });
// });