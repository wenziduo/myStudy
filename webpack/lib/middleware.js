class MiddleWare {
  middleWares = []
  use = (fn) => {
    this.middleWares.push(fn)
  }
}
