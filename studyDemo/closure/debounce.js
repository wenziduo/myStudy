/* 防抖(debounce) 频繁操作，现在限制的时间内取最后一次*/

var debounce = function(fn, delay) {
  var timer = null;
  return function() {
    clearTimeout(timer)
    timer = setTimeout(fn, delay)
  }
}

function fn() {
  console.log('666')
}

var testDeb = debounce(fn, 1000)

setInterval(testDeb, 800)
