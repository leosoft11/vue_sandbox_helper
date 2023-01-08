<template>
     <div class="block">
            <div class="block_row-info">
              <div class="loader" :class="{block: loaders}"></div> 
                    <img class="img_logo" src="@/images/lightspeednew.svg">
                     <div class="row">
                        <p>Название Sandbox</p>     
                        <input type="text" v-model="sandbox_name" class="input">
                     </div>  
                      
                     <div class="row">
                        <p>secret_id</p>
                        <input type="text" v-model="lspos_secret" class="input">
                     </div>

                      <div class="row">
                        <p>lightspeed Аккаунт ID</p>
                        <input type="text" v-model="lspos_account" class="input">
                      </div> 

                      <div class="row">
                        <p>stage mode</p>
                        <input type="checkbox" v-model="stageMode">
                      </div> 
                </div>

                <div class="block_row-bottom">
                    <button @click="registerOwner" class="btn">Настроить Сэндбокс</button>
                </div>

                <div v-if="urlSSO.length" class="block_row-bottom">
                    <button class="btn" @click="openFromNewPageUrl">Открыть SSO</button>
                </div>
    </div>
</template>

<script>

import {createHash} from 'crypto';
import {shell} from 'electron'
import {exec} from 'child_process'


export default {

  data() {
    return {
      sandbox_name: '',
      lspos_secret: '',
      lspos_account: '',
      loaders: true,
      urlSSO: '',
      stageMode: false
    }
  },

  methods: {

    buildSSO() {
      let t = Math.round(+new Date()/1000);
      let signature = (this.lspos_account + t + this.lspos_secret);

      const descr = {
          ls:`lightspeed_account_id=${this.lspos_account}`,
          t: `timestamp=${t}`,
          s: `signature=${createHash('sha256').update(signature).digest('hex')}`
      }

      this.urlSSO = `https://${this.sandbox_name}-lspos.ecwid.qa/sso?${descr.ls}&${descr.s}&${descr.t}`
      
    },

    openFromNewPageUrl() {
       shell.openExternal(this.urlSSO);
    },

    registerOwner() {

        if (this.sandbox_name && this.lspos_secret && this.lspos_account) {
          this.loaders = false;

          // Регаем магазин
          exec(`curl -XPOST 'https://my${this.sandbox_name}.ecwid.qa/resellerapi/v1/register?register=y' --data 'email=lukarek@ecwid.com&password=123456&name=VSV8&key=lightspeed___key&plan=LIGHTSPEED_UNLIMITED&external_account_id=${this.lspos_account}'`, (error, stdout, stderr) => {
              if (error) {
                  this.loaders = true;
                  console.log(stderr);
                  alert(`exec error: ${error}`);
                  return;
              } else {
                  alert(`Результат выполнения регистрации магазина команды": ${stdout}`)
                  this.buildSSO();
                  this.loaders = true;
                  // Нужны ли вебхуки ?
                  exec(`echo "update application set webhookurl = 'https://${this.sandbox_name}-lspos.ecwid.qa/webhooks/ecwid’ where namespace = 'ecwid-lightspeed-app';" | psql-sand ${this.sandbox_name} appmarket`, (error, stdout, stderr) => {
                    if (error) {
                          this.loaders = true;
                          console.log(stderr);
                          alert(`exec error: ${error}`);
                          return;
                    } else {
                          alert(`Обновляем вебуки в базе данных, результат выполнения функции: ${stdout}`); 
                    }
                  })
              }
          });

          // Устанавливаем stage окружение для LS аккаунта
           if (this.stageMode) {
                exec(`echo "update properties set value = 'false' where name = 'alwaysUseLsposProductionMode';" | psql-sand ${this.sandbox_name} proxy`, (error, stdout, stderr) => {
                      if (error) {
                            this.loaders = true;
                            console.log(stderr);
                            alert(`exec error: ${error}`);
                            return;
                      } else {
                            alert(`Устанавливаем стэйдж окружение в базе данных, результат выполнения функции: ${stdout}`)
                      }
                    })
            }
        } else {
            alert("Необходимо заполнить все поля, кроме чекбокса");
          }
    },
  }
}
</script>

<style>


</style>