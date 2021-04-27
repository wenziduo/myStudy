Function.prototype.myCall = function () {
  const [target, ...params] = arguments;
  target.fn = this;
  target.fn(...params);
  delete target.fn;
};

Function.prototype.myApply = function () {
  const [target, paramsArr] = arguments;
  console.log("paramsArr", paramsArr);
  target.fn = this;
  if (paramsArr) {
    target.fn(...paramsArr);
  } else {
    target.fn();
  }
  delete target.fn;
};

Function.prototype.myBind = function () {
  const [target, ...params] = arguments;
  target.fn = this;
  return function () {
    console.log("params", params);
    if (params) {
      target.fn(...params);
    } else {
      target.fn();
    }
    delete target.fn;
  };
};

var objP = {
  name: "wenduo",
  a: function (...arg) {
    console.log("this", this);
    console.log("arg", arg);
  },
};

var that = {
  name: "cai",
};

var params01 = {
  age: "11",
};

var params02 = {
  age: "12",
};

objP.a.myCall(that, params01, params02);
objP.a.myApply(that, [params01, params02]);
objP.a.myBind(that, params01, params02)();

function foo() {
  console.log(a); // 输出undefined
  var a = "I am here"; // 赋值
}
foo();
// 实际执行过程
function foo() {
  var a = null; // 变量声明，var初始化undefined
  console.log(a);
  a = "I am here"; // 变量重新赋值
}
