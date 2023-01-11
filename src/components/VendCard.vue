<template>
   <div class="block">
          <div class="loader" :class="{block: loaders}"></div>
                <div class="block_row-info"> 
                    <img class="img_logo" src="@/images/vend.png" height="50px">
                     <div class="row">
                        <p>Название Sandbox</p>     
                        <input type="text" v-model="sandbox_name" class="input">
                     </div>  
                      
                     <div class="row">
                        <p>vend.clientId</p>
                        <input type="text" v-model="vend_clientId" class="input">
                     </div>

                     <div class="row">
                        <p>vend.clientSecret</p>
                        <input type="text" v-model="vend_clientSecret" class="input">
                     </div>
                </div>
                <div class="block_row-bottom">
                    <button @click="VendState" class="btn">Настроить</button>
                </div>    
    </div>
</template>

<script>

// import child from 'child_process';
import path from 'path'
import {exec} from 'child_process'

const path_local_or_prod = process.env.NODE_ENV === 'production' ? `${path.join(__dirname, '../../')}bash` : 'src/bash/';

export default {

    data() {
        return {
            sandbox_name: "",
            vend_clientId: "",
            vend_clientSecret: "",
            loaders: true,
            info: 'Ошибок не было, значит сэндбокс почти настроен, осталось подождать запуска контейнеров на площадке',
        }  
    },

    methods: {
        
        VendState() {
            if (this.sandbox_name && this.vend_clientId && this.vend_clientSecret) {
                    this.loaders = false;

                    exec(`bash ${path_local_or_prod}/vend.sh ${this.sandbox_name} ${this.vend_clientId} ${this.vend_clientSecret}`,(error, stdout, stderr) => {
                      if (error) {
                        this.loaders = true;
                        alert(`exec error: ${error}`);
                        return;
                      }
                      this.loaders = true;
                      console.log(`Результат выполнения команды: ${stdout}`)
                      if (stdout.length === 0) {
                        alert(`${this.info}`);
                      }
                    })

                } else {
                    alert('Необходимо заполнить все поля')
                  }
      },
    }, 

}
</script>

<style>


</style>