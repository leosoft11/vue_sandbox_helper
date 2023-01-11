<template>
    <div class="block">
      <div class="loader" :class="{block: loaders}"></div>
                <div class="block_row-info"> 
                    <img class="img_logo" src="@/images/imex.png">
                    <div class="row">
                        <p>Название Sandbox</p>     
                        <input v-model="sandboxName" type="text" class="input">
                     </div>  
                </div>
                <div class="block_row-bottom">
                    <button @click="imexSettings" class="btn">Настроить</button>
                </div>    
            </div>
</template>

<script>

import path from 'path'
import {exec} from 'child_process'

const path_local_or_prod = process.env.NODE_ENV === 'production' ? `${path.join(__dirname, '../../')}bash` : 'src/bash/';

export default {

    data() {
        return {
            sandboxName: '',
            loaders: true,
            info: 'Ошибок не было, значит сэндбокс почти настроен, осталось подождать запуска контейнеров на площадке',
        }
    },

    methods: {
        imexSettings() {
            if (this.sandboxName) {
                this.loaders = false;

                exec(`bash ${path_local_or_prod}/imex.sh ${this.sandboxName}`,(error, stdout, stderr) => {
                  if (error) {
                    this.loaders = true;
                    alert(`exec error: ${error}`);
                    return;
                  }
                  this.loaders = true;
                  console.log(`${stdout}`)
                  console.log(`${stderr}`)
                  alert(`Результат выполнения команды: ${stdout}`);
                  alert(`${this.info}`);
                })

            } else {
                alert('Необходимо заполнить все поля')
              }
        }
    }

}
</script>

<style>

</style>