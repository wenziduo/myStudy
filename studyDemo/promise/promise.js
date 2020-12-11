function Promise(fun) {
  var self = this;
  self.data = undefined;
  self.status = "pending";
  self.resolve = function (value) {
    // console.log("success resolve");
    // console.log('self.callbacks', self)
    self.status = "fullfiled";
    self.data = value;
    for (var i = 0; i < self.callbacks.length; i++) {
      self.callbacks[i].onResolve();
    }
  };
  self.reject = function () {
    if (self.status !== "pending") {
      return;
    }
    self.status = "rejected";
    for (var i = 0; i < self.callbacks.length; i++) {
      self.callbacks[i].onReject();
    }
  };
  self.all = function () {};
  self.race = function () {};
  self.callbacks = [];
  fun(self.resolve, self.reject);
}

Promise.prototype.then = function (onResolve, onReject) {
  var self = this;
  if (self.status === "fullfiled") {
    return new Promise((resolve, reject) => {
      resolve(self.data);
    });
  }
  if (self.status === "rejected") {
    return new Promise((resolve, reject) => {
      reject(self.data);
    });
  }
  if (self.status === "pending") {
    return new Promise((resolve, reject) => {
      self.callbacks.push({
        onResolve: function (value) {
          onResolve(value);
          resolve(value);
        },
        onReject: function (value) {
          onReject(value);
          reject(value);
        },
      });
    });
  }
};

Promise.prototype.catch = function () {};

const fetchPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 2000);
  setTimeout(() => {
    reject();
  }, 4000);
});

fetchPromise
  .then(
    (resolve) => {
      console.log("fetchPromise-01", fetchPromise);
      console.log("fetchPromise-01-resolve", resolve);
      console.log("success then resolve");
    },
    (reject) => {
      console.log("fetchPromise-01", fetchPromise);
      console.log("fetchPromise-01-reject", reject);
      console.log("success then reject");
    }
  )
  .then(
    (resolve) => {
      console.log("fetchPromise-02", fetchPromise);
      console.log("fetchPromise-02-resolve", resolve);
      console.log("success then resolve");
    },
    (reject) => {
      console.log("fetchPromise-02", fetchPromise);
      console.log("fetchPromise-02-reject", reject);
      console.log("success then reject");
    }
  );
