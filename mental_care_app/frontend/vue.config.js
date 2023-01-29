// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
// })

module.exports = {
  assetsDir: "static",
  transpileDependencies: true,
  devServer: {
    proxy: "https://localhost:5000"
  }
}
