// 原型链继承
// 优点：能通过instanceOf和isPrototypeOf的检测

// 注意：给原型添加方法的语句一定要放在原型替换Parent.prototype = new Grand();之后

// 缺点:(1)Grand中的属性(不是方法)也变成了Parent的prototype中的公用属性，
//      如上面例子中的color属性，可以同时被instance1和instance2修改
//      (2)创建子类型的时候，不能像父类型的构造函数中传递参数。
function Grand() {
  this.colors = ["red", "yellow"];
  this.grandName = "QQQ";
}
Grand.prototype.name = "grand";
Grand.prototype.grandName = "grand";
function Parent() {
  this.names = ["cai", "wen"];
}
Parent.prototype = new Grand();
Parent.prototype.constructor = Parent;
function Son() {}
var parent01 = new Parent();
parent01.grandName = "WWW";
var parent02 = new Parent();
console.log(parent01);
console.log(parent02);
Son.prototype = parent;

var son = new Son();
console.log(son instanceof Son);
console.log("son", son);

// 借助构造函数继承
// 原理：在子类型构造函数的内部调用超类型构造函数
// 优点：解决了superType中的私有属性变公有的问题，可以传递参数
// 缺点：方法在函数中定义，无法得到复用
function Animal() {
  this.name = "animal";
  this.addr = "杭州";
}
Animal.prototype.fun = function () {};
function Dog() {
  Animal.call(this);
  this.name = "dog";
}
var dog = new Dog();
console.log("dog", dog);

// 组合式继承
// 优点：继承前两者的优点，能通过instanceOf和isPrototypeOf的检测
// 缺点：两次调用父构造器函数，浪费内存。
function People(number) {
  this.number = number;
  this.groups = [true];
}
People.prototype.sayNumber = function () {
  console.log("say number", this.number);
};
function Man(age) {
  People.call(this, 20);
  this.age = age;
}
Man.prototype = new People(5);
Man.prototype.constructor = Man;
Man.prototype.sayAge = function () {
  console.log("say age", this.age);
};
var man01 = new Man(15);
man01.sayNumber();
man01.sayAge();
console.log(man01 instanceof People);
console.log("man01", man01);
man01.groups.push(false);
var man02 = new Man(15);
console.log("man02", man02);
man02.sayNumber();
man02.sayAge();
console.log(man02 instanceof People);
console.log(man02);

// 原型式继承
// 使用场合：没必要构建构造函数，仅仅是想模拟一个对象的时候
function createObj(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

// 寄生继承
// 缺点：方法在函数中定义，无法得到复用
function createOther(obj) {
  var cloneObj = createObj(obj);
  cloneObj.sayHello = "hello";
  return cloneObj;
}

var mobile = {
  size: "4.7",
  name: "iphone 12",
};

var newMobile = createOther(mobile);
newMobile.size = "4.8";
console.log("newMobile", newMobile);
console.log("mobile", mobile);

// 寄生组合继承(最理想)：
function changePrototype(subType, superType) {
  var newProtoType = createObj(superType.prototype);
  subType.prototype = newProtoType;
  subType.prototype.constructor = subType.prototype.constructor;
}

function SuperType() {
  this.name = "SuperType";
  this.Super = "Super";
}
SuperType.prototype.superNames = ["aaa"];
function SubType() {
  SuperType.call(this);
  this.name = "SubType";
  this.sub = "sub";
}

changePrototype(SubType, SuperType);

var newSubType01 = new SubType();
newSubType01.superNames.push("bbb");
console.log("newSubType01", newSubType01);

var newSubType02 = new SubType();
console.log("newSubType02", newSubType02);
