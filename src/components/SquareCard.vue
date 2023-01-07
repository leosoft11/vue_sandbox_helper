<template>
   <div class="block">
        <div class="loader" :class="{block: loaders}"></div>
                <div class="block_row-info"> 
                    <img class="img_logo" src="@/images/square.png">

                     <div class="row">
                        <p>Название Sandbox</p>     
                        <input v-model="sandbox_name" type="text" class="input">
                     </div>  
                      
                     <div class="row">
                        <p>app_id</p>
                        <input v-model="app_id" type="text" class="input">
                     </div>

                     <div class="row">
                        <p>app_secret</p>
                        <input v-model="app_secret" type="text" class="input">
                     </div>

                     <div class="row">
                        <p>sandbox_app_id</p>
                        <input v-model="sandbox_app_id" type="text" class="input">
                     </div>

                     <div class="row">
                        <p>sandbox_access_token</p>
                        <input v-model="sandbox_access_token" type="text" class="input">
                     </div>

                     <div class="row">
                        <p>webhook_key</p>
                        <input v-model="webhook_key" type="text" class="input">
                     </div>

                     <div class="row">
                        <p>webhook_v2_key</p>
                        <input v-model="webhook_v2_key" type="text" class="input">
                     </div>
                </div>

                <div class="block_row-bottom">
                    <button @click="squareSettings" class="btn">Настроить</button>
                </div>    
            </div>
</template>

<script>

import child from 'child_process';

export default {
    data() {
        return {
            sandbox_name: '',
            app_id: '',
            app_secret: '',
            sandbox_app_id: '',
            sandbox_access_token: '',
            webhook_key: '',
            webhook_v2_key: '',
            loaders: true,
            info: 'Ошибок не было, значит сэндбокс почти настроен, осталось подождать запуска контейнеров на площадке',
        }
    },

    methods: {
        squareSettings() {
        if (this.sandbox_name && this.app_id && this.app_secret && this.sandbox_app_id && this.sandbox_access_token && this.webhook_key && this.webhook_v2_key) {

            this.loaders = false;
            const exec_proc = (coommand) => {
                    const s_process = child.exec(coommand);
                    s_process.stdout.on('close', (code) => {
                        console.log(code);
                        this.loaders = true;
                        alert(`${this.info}`);
                    })
            }
            exec_proc(`bash src/bash/square.sh ${this.sandbox_name} ${this.app_id} ${this.app_secret} ${this.sandbox_app_id} ${this.sandbox_access_token} ${this.webhook_key} ${this.webhook_v2_key}`);

        } else{
            alert('Необходимо заполнить все поля')
            }
        }
    }

}
</script>

<style>

</style>