<template>
     <div class="block">
            <div class="block_row-info">
              <div class="loader" :class="{block: loaders}"></div> 
                    <img src="@/images/vend.png" height="50px">
                     <div class="row">
                        <p>Название Sandbox</p>     
                        <input type="text" v-model="sandbox_name"  class="input">
                     </div>  
                      
                     <div class="row">
                        <p>secret_id</p>
                        <input type="text" v-model="lspos_secret" class="input">
                     </div>

                      <div class="row">
                        <p>lightspeed Аккаунт ID</p>
                        <input type="text" v-model="lspos_account" class="input">
                     </div>
                </div>
                <div class="block_row-bottom">
                    <button @click="buildSSO" class="btn">Тут что-то будет</button>
                </div>   
    </div>
</template>

<script>
export default {

  data() {
    return {
      sandbox_name: '',
      lspos_secret: '',
      lspos_account: '',
      loaders: true
    }
  },

  methods: {
    buildSSO() {

    }

  }


}
</script>

<style>

</style>