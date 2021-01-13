module.exports = {
  "port": "3008",
  "proxy": {
    "dev": {
      "from": "/b2b",
      "to": "",
      "secure": false,
      "changeOrigin": true,
      "pathRewrite": {
        "^/b2b": "/b2b"
      }
    },
    "test": {
      "from": "/b2b",
      "to": "",
      "secure": false,
      "changeOrigin": true,
      "pathRewrite": {
        "^/b2b": "/b2b"
      }
    },
    "local": {
      "from": "/b2b",
      "to": "",
      "secure": false,
      "changeOrigin": true,
      "pathRewrite": {
        "^/b2b": "/b2b"
      }
    }
  },
  "currentPath": "D:\\workspace\\weimeng-components\\weimeng-test"
}