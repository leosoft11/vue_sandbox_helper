<template>
      <div @viewDetails="viewDetails" class="block" data-tabs-target="clover">
                <div class="block_clover-info"> 
                    <img src="@/images/clover1.png" height="50px">
                     <div class="row">
                        <p>Название Sandbox</p>     
                        <input v-model="sandboxName" type="text" class="sandbox_name input">
                     </div>  
                      
                     <div class="row">
                        <p>Verify key</p>
                        <input v-model="verifyKey" type="text" class="clover_key input">
                     </div>

                     <div class="row">
                        <p>Приложение</p>
                        <select v-model="selectInput" class="clover_select select">
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
                <div class="block_clover-bottom">
                    <button @click="CloverState" class="btn_clover btn">Настроить</button>
                    <button class="btn_getKey btn">Получить ключ</button>
                </div>
                <input type="text" class="clover_keyCopy input" style="opacity: 0;">   
            </div>
</template>

<script>
export default {

    data() {
        return {
            sandboxName: '',
            verifyKey: '',
            selectInput: '',
            cloverKeyCopy: '',
            info: 'Ошибок не было, значит сэндбокс почти настроен, осталось подождать запуска контейнеров на площадке',


        }
    },

    methods: {
        CloverState() {
            this.$emit("CloverState", this.sandboxName, this.verifyKey, this.selectInput, this.cloverKeyCopy, this.info);
    }
 }
}
</script>

<style>

</style>