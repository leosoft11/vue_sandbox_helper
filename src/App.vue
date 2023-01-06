<template>
    <div class="main">
            <div class="left">
                <nav class="link">
                    <li v-for="list in menuList"
                        class="link_text"
                        :class="{active: list.active}"
                        :key="list.id"
                        @click="switchLink(list.active, list.id)"
                        >{{list.itemlist}}
                    </li>
                </nav>
            </div>

            <div class="right">
              <div class="right_pos" v-if="this.menuList[0].active == false && this.menuList[1].active == false && this.menuList[2].active == false && this.menuList[3].active == false && this.menuList[4].active == false && this.menuList[5].active == false ">
                <h1>Welcome to Sandbox, please choose the desired service from the list</h1>
              </div>

              <clover-card :class="{block_active: this.menuList[0].active}"/>
              <vend-card  :class="{block_active: this.menuList[1].active}"/>
              <weebly-card :class="{block_active: this.menuList[2].active}"/>
              <imex-card :class="{block_active: this.menuList[3].active}"/>
              <square-card :class="{block_active: this.menuList[4].active}"/>
              <lightspeed-pos :class="{block_active: this.menuList[5].active}"/>

            </div>
          
    </div>
</template>

<script>

import CloverCard from '@/components/CloverCard'
import ImexCard from '@/components/imexCard'
import SquareCard from '@/components/SquareCard'
import WeeblyCard from '@/components/WeeblyCard'
import VendCard from '@/components/VendCard'
import lightspeedPos from '@/components/lightspeedPos'


export default {
  name: 'App',
  components: {
    CloverCard, ImexCard, SquareCard, WeeblyCard, VendCard, lightspeedPos
  },


  data(){
    {
      return {
        menuList:[
          {id:0, itemlist: 'Clover',active: true},
          {id:1, itemlist: 'Vend', active: false},
          {id:2, itemlist: 'Weebly',active: false},
          {id:3, itemlist: 'imex', active: false},
          {id:4, itemlist: 'Square', active: false},
          {id:5, itemlist: 'lspos', active: false},
        ],
      }
    }
  },
   methods: {
      switchLink(actived, id) {

        this.menuList.forEach(({id}) => {
          this.menuList[id].active = false;
        })

        if (actived == false) {
          this.menuList[id].active = true;
        }
      },
    },
  }
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.main {
  width: 100%;
  height: 100vh;
  display: flex;
}

.left {
  flex: 1 1 20%;
  background-color: #1f2328;
  text-align: center;
  color: #dfe3e7;
}

.right {
  flex: 1 1 70%;
  background: #ccc;
}

.right_pos{
  text-align: center;
}

.link {
  font-size: 20px;
}

.link_text {
  text-decoration: none;
  list-style: none;
  width: 100%;
  cursor: pointer;
  padding-top: 10px;
  padding-bottom: 10px;
}

.link_text:hover {
  background-color: #068eef;
  transition: 1s;
}

.active {
  background-color: #068eef;
}

/* Clover */

.block_row-info {
  max-width: 500px;
  margin: 0 auto;
  padding-top: 50px;
}

.sandbox_name {
  font-size: 18px;
}

.row {
  min-width: 350px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.block_row-bottom {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 20px;
  background-color: #068eef;
  color: #fff;
  background-image: linear-gradient(45deg, #0674db, #069cf9);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 15%), 0 0 0 1px rgb(0 0 0 / 10%) inset;
  min-width: 255px;
  height: 40px;
  padding: 9px 12px;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.45;
  border: initial;
  cursor: pointer;
}

.btn:hover {
  background-image: linear-gradient(20deg, #0b7fec, #29a9f8);
}

.btn_disabled {
  background-image: linear-gradient(40deg, #757c83, #7892a1);
}
.input {
  height: 27px;
  width: 250px;
  padding: 3px, 10px, 4px;
  border-radius: 5px;
  font-size: 16px;
  line-height: 22px;
  border: initial;
  padding-left: 10px;
}

.select {
  height: 27px;
  width: 261px;
  border-radius: 5px;
  font-size: 16px;
  line-height: 22px;
  border: initial;
}

.block {
  display: none;
}

.block_active {
  display: block;
}

.loader {
  background: #333 url(images/loading.gif) no-repeat center center;
  height: 100vh;
  width: 100%;
  position: fixed;
  z-index: 100;
  background-size: 10%;
  top: 0;
  left: 0;
  opacity: 0.9;
}

.img_logo {
   height: 50px;
}

</style>
