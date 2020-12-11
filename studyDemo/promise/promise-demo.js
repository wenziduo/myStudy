new Promise((resolve) => {
  console.log("step 1");
  setTimeout(() => {
    resolve("100");
  }, 1000);
})
  .then((value) => {
    return new Promise((resolve) => {
      console.log("step-1-1");
      setTimeout(() => {
        resolve("110");
      }, 1000);
    })
      .then((value) => {
        console.log("step-1-2");
        return value;
      })
      .then((value) => {
        console.log("step-1-3");
        return new Promise((resolve) => {
          console.log("step-2-1");
          setTimeout(() => {
            resolve("210");
          }, 1000);
        })
          .then((value) => {
            console.log("step-2-2");
            return value;
          })
          .then((value) => {
            console.log("step-2-3");
            return value;
          });
      });
  })
  .then((value) => {
    console.log(value);
    console.log("step 2");
  });

// 检测promise.all
Promise.all([
  new Promise((resolve) => {
    setTimeout(() => {
      resolve("I`m p1 ");
    }, 500);
  }),
  new Promise((resolve) => {
    setTimeout(() => {
      resolve("I`m p2 ");
    }, 1000);
  }),
]).then((res) => {
  console.log("res", res);
});
