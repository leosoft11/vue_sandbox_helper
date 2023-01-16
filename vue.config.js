const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions:{
        extraResources: [
          {from:'src/bash',to:'../bash'}],
        publish: [
          {
            provider: 'github',
            owner: 'leosoft11',
            repo: 'vue_sandbox_helper',
          }
        ],
        mac: {
          icon: 'src/newicon.icns'
        }
      }
    }
  }
})
