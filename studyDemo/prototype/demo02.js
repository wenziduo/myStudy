function Func01() {
  this.name = "caiwenduo";
  var obj = new Object({name: 'dsad'});
  console.log(obj);
  var createObj = Object.create(null, { a: { value: 2 } })
  console.log(createObj);
}
Func01.prototype.age = 15
var func01 = new Func01();
console.log('func01', func01)
