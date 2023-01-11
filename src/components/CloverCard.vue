<template>
      <div class="block">
        <div class="loader" :class="{block: loaders}"></div>
                <div class="block_row-info"> 
                    <img class="img_logo" src="@/images/clover.png">
                     <div class="row">
                        <p>Название Sandbox</p>     
                        <input v-model="sandboxName" type="text" class="input">
                     </div>  
                      
                     <div class="row">
                        <p>Verify key</p>
                        <input v-model="verifyKey" type="text" class="input">
                     </div>

                     <div class="row">
                        <p>Приложение</p>
                        <select v-model="selectInput" class="select">
                                <option></option>
                                <option>EU</option>
                                <option>DIRECT_EU</option>
                                <option>SITE_EU</option>
                                <option>US</option>
                                <option>DIRECT_US</option>
                                <option>SITE_US</option>
                        </select>
                     </div>
                </div>
                <div class="block_row-bottom">
                    <button @click="cloverSettings" class="btn">Настроить</button>
                    <button @click="CloverGetKey" class="btn">Получить ключ</button>
                </div>
                <input type="text" class="clover_keyCopy input" style="opacity: 0;">   
            </div>
</template>

<script>

// import exec from 'child_process'
import path from 'path'
import {exec} from 'child_process'

const path_local_or_prod = process.env.NODE_ENV === 'production' ? `${path.join(__dirname, '../../')}bash` : 'src/bash/';

export default {

    data() {
        return {
            sandboxName: '',
            verifyKey: '',
            selectInput: '',
            cloverKeyCopy: '',
            loaders: true,
            info: 'Ошибок не было, значит сэндбокс почти настроен, осталось подождать запуска контейнеров на площадке',
        }
    },

    methods: {
        CloverGetKey() {
            if (this.sandboxName) {
                this.loaders = false;
                exec(`bash ${path_local_or_prod}/cloverKey.sh ${this.sandboxName}`, (error, stdout, stderr) => {
                    if (error) {
                        this.loaders = true;
                        alert(`exec error: ${error}`);
                        return;
                    }
                    this.loaders = true;
                    if (stdout.length == 1) {
                        alert(`Не нашлось ничего`);
                    } else {
                        // Тут собираем массив ключей(если их будет много)
                        let Key  = stdout.replace(/\s+/g, '').split(',').reverse().slice(1).reverse();
                        // Получаем последний найденный ключ 
                        let lastEl = Key.slice(-1)[0];
                        this.cloverKeyCopy = lastEl;
                        this.cloverKeyCopy.select();
                        document.execCommand("copy");
                        console.log(stderr);
                        alert(`Ваш Ключ: ${lastEl} Сохранен в буфер обмена`);
                    }
                });
            
            } else {
                alert('Введите название сэндбокса');
            }
        },

        cloverSettings() {
            if (this.sandbox_name && this.verifyKey && this.selectInput) {
                this.loaders = false;
                   exec(`bash ${path_local_or_prod}/clover.sh ${this.sandbox_name} ${this.verifyKey} ${this.selectInput}`,(error, stdout, stderr) => {
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
                // const exec_proc = (coommand) => {
                // const s_process = child.exec(coommand);
                //     s_process.stdout.on('close', (code) => {
                //         console.log(code);
                //         this.loaders = true;
                //         alert(`${this.info}`);
                //     })
                // }
                //
                // exec_proc(`bash ${path_local_or_prod}/clover.sh ${this.sandbox_name} ${this.verifyKey} ${this.selectInput}`);

            } else {
                alert("Необходимо заполнить все поля");
              }
        }
    },
}
</script>

<style>

</style>