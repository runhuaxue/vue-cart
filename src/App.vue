<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <!-- 条件语句 -->
    <p v-if="showName">{{name}}</p>
    <!-- <input type="text" v-model="text"> -->
    
    <!-- 循环语句 -->
    <ul>
      <li v-for="(good, index) in goods" :key="good.id">
        <span>{{good.text}}</span>
        <span>${{good.price}}</span>
        <button @click="addGood(index)">add to cart</button>
      </li>
    </ul>

    <!-- 购物车 -->
    <!-- <cart :name="name" :cartS="cartF"></cart> -->
    <cart :name="name"></cart>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Cart from "./components/Cart.vue";
import { setTimeout } from "timers";
import axios from "axios";
import { log } from "util";

export default {
  name: "app",
  data() {
    return {
      name: "开课吧购物车",
      showName: false,
      goods: [
        // { id: 1, text: "web", price: 200 },
        // { id: 2, text: "front-end", price: 340 }
      ]
      // cartF: [],
      // text:''
    };
  },
  components: {
    HelloWorld,
    cart: Cart
  },
  async created() {
    //创建钩子，组件创建完成执行一次
    setTimeout(() => {
      this.showName = true;
    }, 1000);

    //查询产品列表
    try {
      const response = await axios.get("/api/goods");
      console.log(response);
      this.goods = response.data.list;
    } catch (error) {
      //错误处理
    }

    //不用await就用then 函数
    // axios.get("/api/goods").then(resp=>{
    //   this.goods = resp.data.list;
    // }).catch(err=>{
    //   //错误处理
    // })
  },
  methods: {
    addGood(i) {
      const good = this.goods[i];
      // this.$root.$emit('addCart', good);
      this.$bus.$emit("addCart", good);
      // const ret = this.cartF.find(v => v.id === good.id);
      // if (ret) {
      //   // console.log(ret);
      //   ret.count += 1;
      // } else {
      //   this.cartF.push({
      //     ...good,
      //     count: 1,
      //     active: true
      //   });
      // }

      // this.goods.push({
      //   text:this.text,
      //   price:1000
      // })
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
