<template>
    <div class="block">
          <div class="loader" :class="{block: loaders}"></div>
                <div class="block_row-info"> 
                    <img class="img_logo" src="@/images/weebly.png" height="50px">
                     <div class="row">
                        <p>Название Sandbox</p>     
                        <input v-model="sandbox_name_weebly" type="text" class="input">
                     </div>  
                      
                     <div class="row">
                        <p>weebly.clientId</p>
                        <input v-model="weeblyClientId" type="text" class="input">
                     </div>

                     <div class="row">
                        <p>weebly.secretKey</p>
                        <input v-model="weeblyClientSecret" type="text" class="input">
                     </div>

                     <div class="row">
                        <p>App version</p>
                        <input v-model="weeblyAppId" type="text" class="input">
                     </div>
                </div>
                <div class="block_row-bottom">
                    <button @click="vendSettings" class="btn">Настроить</button>
                    <button @click="vendOpenUrl" class="btn">Создать App</button>
                </div>   
            </div>
</template>

<script>

import child from 'child_process';
import {shell} from 'electron';
import path from 'path'

const path_local_or_prod = process.env.NODE_ENV === 'production' ? `${path.join(__dirname, '../../')}bash` : 'src/bash/';

export default {
    data() {
        return {
            sandbox_name_weebly: "",
            weeblyClientId: "",
            weeblyClientSecret: "",
            weeblyAppId: "1.0.10",
            loaders: true,
            info: 'Ошибок не было, значит сэндбокс почти настроен, осталось подождать запуска контейнеров на площадке',
        }
    }, 

    methods: {

        vendSettings() {
            if(this.sandbox_name_weebly && this.weeblyClientId && this.weeblyClientSecret && this.weeblyAppId) {
        
                this.loaders = false;
        
                const exec_proc = (coommand) => {
                const s_process = child.exec(coommand);
                    s_process.stdout.on('close', (code) => {
                        console.log(code);
                        this.loaders = true;
                        alert(`${this.info}`);
                    })
            }
            exec_proc(`bash ${path_local_or_prod}/weebly.sh ${this.sandbox_name_weebly} ${this.weeblyClientId} ${this.weeblyClientSecret} ${this.weeblyAppId}`);
                

            } else {
                alert('Необходимо заполнить все поля')
            }
        },

        vendOpenUrl() {
            shell.openExternal("https://lamps.ecwid.com/~lukarek/php/");               
        }
    }
 
}
</script>

<style>

</style>