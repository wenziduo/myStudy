define(['./moduleB.js'], function (res) {
  console.log('res', res);
  return {
    moduleA: "moduleA",
  };
});
