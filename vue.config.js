const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions:{
        extraResources: [
          {from:'src/bash',to:'../bash'}],
        mac: {
          icon: 'src/newicon.icns'
        }
      }
    }
  }
})
