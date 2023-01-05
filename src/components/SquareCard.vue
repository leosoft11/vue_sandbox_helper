<template>
   <div class="block" data-tabs-target="square">
                <div class="block_clover-info"> 
                    <img src="@/images/square.png" height="50px">
                     <div class="row">
                        <p>Название Sandbox</p>     
                        <input type="text" class="sandbox_name--square input">
                     </div>  
                      
                     <div class="row">
                        <p>app_id</p>
                        <input type="text" class="square_appId input">
                     </div>
                     <div class="row">
                        <p>app_secret</p>
                        <input type="text" class="square_secret input">
                     </div>
                     <div class="row">
                        <p>sandbox_app_id</p>
                        <input type="text" class="square_sandboxAppID input">
                     </div>
                     <div class="row">
                        <p>sandbox_access_token</p>
                        <input type="text" class="square_sandboxAccessToken input">
                     </div>
                     <div class="row">
                        <p>webhook_key</p>
                        <input type="text" class="square_webhookKey input">
                     </div>
                     <div class="row">
                        <p>webhook_v2_key</p>
                        <input type="text" class="square_webhookV2key input">
                     </div>
                </div>
                <div class="block_clover-bottom">
                    <button class="btn_square btn">Настроить</button>
                </div>    
            </div>
</template>

<script>
export default {

}
</script>

<style>

</style>