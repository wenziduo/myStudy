/* 节流函数 （throttle）降低触发频率 */
var timers = null
timers = setTimeout(() => {})
// clearTimeout(timers)
console.log('timers', timers);

var throttle = function(fn, delay) {
  var timer = null;
  return function() {
    if (!timer) {
      timer = setTimeout(function() {
        timer = null;
        fn()
      }, delay)
    }
  }
}

var fn = function() {
  console.log('666')
}

var testThro = throttle(fn, 4000)
setInterval(function() {
  testThro();
}, 500)
