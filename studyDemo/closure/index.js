/* 闭包示例 */

function closureA() {
  var numArr = [];
  return function () {
    numArr.push(
      "4568944894864569849874845dewqewqe dwdsadwqaedwqedwqedwqedwad 84484848ewqe4wq489"
    );
    console.log("numArr", numArr);
  };
}

function closureB(num) {
  num = num + 1;
  console.log(num);
}

// var testMod = closureA();
// for (var i = 0; i < 10; i++) {
//   testMod();
// }

// console.log("testMod", testMod);

// for (let i = 0; i < 10; i++) {
//   setTimeout(function () {
//     console.log("i：", i);
//   });
// }

var name = "The Window";

var object = {
  name: "My Object",
  getNameFunc: function () {
    return function () {
      return this.name;
    };
  },
};

var testObj = object.getNameFunc();
console.log(testObj());
