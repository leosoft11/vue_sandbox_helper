<template>
   <div class="block" data-tabs-target="vend">
                <div class="block_clover-info"> 
                    <img src="@/images/vend.png" height="50px">
                     <div class="row">
                        <p>Название Sandbox</p>     
                        <input type="text" v-model="sandbox_name"  class="sandbox_name--vend input">
                     </div>  
                      
                     <div class="row">
                        <p>vend.clientId</p>
                        <input type="text" v-model="vend_clientId" class="vend_clientId input">
                     </div>

                     <div class="row">
                        <p>vend.clientSecret</p>
                        <input type="text" v-model="vend_clientSecret" class="vend_clientSecret input">
                     </div>
                </div>
                <div class="block_clover-bottom">
                    <button @click="VendState" class="btn_vend btn">Настроить</button>
                </div>    
            </div>
</template>

<script>

export default {
    
    data() {
        return {
            sandbox_name: "",
            vend_clientId: "",
            vend_clientSecret: "",
            info: 'Ошибок не было, значит сэндбокс почти настроен, осталось подождать запуска контейнеров на площадке',
        }  
    },

    methods: {
        VendState() {
            this.$emit("VendState",  this.sandbox_name, this.vend_clientId, this.vend_clientSecret, this.info);
        },
    }, 

}
</script>

<style>

</style>