define(function (require, exports, module) {
  document.getElementById("btn-click").onclick = function () {
    seajs.use(['./moduleB.js'], function(b) {
      console.log("b", b);
    })
  };
  module.exports = {
    name: "Bob",
    doSomeThing: function () {
      console.log(666);
    },
  };
});
