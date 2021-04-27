function compose(middleware) {
  return function (context, next) {
    // last called middleware #
    let index = -1;
    return dispatch(0);
    function dispatch(i) {
      if (i <= index)
        return Promise.reject(new Error("next() called multiple times"));
      index = i;
      const fn = middleware[i] || next;
      if (!fn) return Promise.resolve();
      try {
        return Promise.resolve(
          fn(context, function next() {
            return dispatch(i + 1);
          })
        );
      } catch (err) {
        return Promise.reject(err);
      }
    }
  };
}

const middleware = [
  async (context, next) => {
    console.log("01 - 01");
    await next();
    console.log("01 - 02");
  },
  async (context, next) => {
    console.log("02 - 01");
    await next();
    console.log("02 - 02");
  },
  async (context, next) => {
    console.log("03 - 01");
    await next();
    console.log("03 - 02");
  },
  async (context, next) => {
    console.log("04 - 01");
    await next();
    console.log("04 - 02");
  },
  async (context, next) => {
    console.log("05 - 01");
    await next();
    console.log("05 - 02");
  },
];

console.log("start");
const middleCompose = compose(middleware);
middleCompose(async (context, next) => {
  console.log("start - 01");
  await next();
  console.log("start - 02");
});
