<template>
   <div class="block">
                <div class="block_row-info"> 
                    <img src="@/images/square.png" height="50px">
                     <div class="row">
                        <p>Название Sandbox</p>     
                        <input type="text" class="input">
                     </div>  
                      
                     <div class="row">
                        <p>app_id</p>
                        <input type="text" class="input">
                     </div>
                     <div class="row">
                        <p>app_secret</p>
                        <input type="text" class="input">
                     </div>
                     <div class="row">
                        <p>sandbox_app_id</p>
                        <input type="text" class="input">
                     </div>
                     <div class="row">
                        <p>sandbox_access_token</p>
                        <input type="text" class="input">
                     </div>
                     <div class="row">
                        <p>webhook_key</p>
                        <input type="text" class="input">
                     </div>
                     <div class="row">
                        <p>webhook_v2_key</p>
                        <input type="text" class="input">
                     </div>
                </div>
                <div class="block_row-bottom">
                    <button class="btn">Настроить</button>
                </div>    
            </div>
</template>

<script>
export default {
    data() {
        return {
            sandbox_name: ''
        }
    }

}
</script>

<style>

</style>