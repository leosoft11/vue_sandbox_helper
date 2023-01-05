<template>
  <div class="block" data-tabs-target="weebly">
                <div class="block_clover-info"> 
                    <img src="@/images/weebly.png" height="50px">
                     <div class="row">
                        <p>Название Sandbox</p>     
                        <input type="text" class="sandbox_name--weebly input">
                     </div>  
                      
                     <div class="row">
                        <p>weebly.clientId</p>
                        <input type="text" class="weebly_clientId input">
                     </div>

                     <div class="row">
                        <p>weebly.secretKey</p>
                        <input type="text" class="weebly_secretKey input">
                     </div>

                     <div class="row">
                        <p>App version</p>
                        <input type="text" class="weeblyAppID input" placeholder="1.0.10">
                     </div>
                </div>
                <div class="block_clover-bottom">
                    <button class="btn_weebly btn">Настроить</button>
                    <button class="btn_weebly_app btn">Создать App</button>
                </div>   
            </div>
</template>

<script>

export default {
 
}
</script>

<style>

</style>