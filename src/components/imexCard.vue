<template>
    <div class="block">
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

import child from 'child_process';

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
                const exec_proc = (coommand) => {
                    const s_process = child.exec(coommand);
                    s_process.stdout.on('close', (code) => {
                        console.log(code);
                        this.loaders = true;
                        alert(`${this.info}`);
                    })
                }
            exec_proc(`bash src/bash/imex.sh ${this.sandboxName}`);
            } else {
                alert('Необходимо заполнить все поля')
            }

        }
    }

}
</script>

<style>

</style>