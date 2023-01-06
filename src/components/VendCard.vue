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
import child from 'child_process';

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

                    const exec_proc = (coommand) => {
                            const s_process = child.exec(coommand);
                            s_process.stdout.on('close', (stdout,code) => {
                                console.log(code);
                                console.log(stdout);
                                this.loaders = true;
                                alert(this.info);
                            })
                    }
                    exec_proc(`bash src/bash/vend.sh ${this.sandbox_name} ${this.vend_clientId} ${this.vend_clientSecret}`);
                } else {
                    alert('Необходимо заполнить все поля')
                }
      },
    }, 

}
</script>

<style>


</style>