<template>
    <div>
        <p>{{name}}</p>
        <table>
            <tr>
                <th>#</th>
                <th>课程名</th>
                <th>单价</th>
                <th>数量</th>
                <th>价格</th>
            </tr>
            <tr v-for="(c,index) in cartS" :key="c.id" :class="{active:c.active}">
                <td><input type="checkbox" v-model="c.active"></td>
                <td>{{c.text}}</td>
                <td>${{c.price}}</td>
                <td>
                    <button @click=minus(index)>-</button>
                    {{c.count}}
                    <button @click=add(index)>+</button>
                </td>
                <td>${{c.price*c.count}}</td>
            </tr>
            <tr>
                <td></td>
                <td colspan="2">{{activeCount}}/{{count}}</td>
                <td colspan="2">${{total}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
  //   props: ["name", "cartS"],
  props: ["name"],
  //props 是子组件接收父组件的数据的东西。子组件最好不要改数据，应由父组件改。
  //数据应该在父组件那一边存放
  data() {
    return {
      cartS: JSON.parse(localStorage.getItem("cart")) || []
    };
  },
  watch: {
    cartS: {
      handler(n, o) {
        localStorage.setItem("cart", JSON.stringify(n));
      },
      deep: true
    }
  },
  methods: {
    minus(i) {
      //普通的this：总是代表它的直接调用者,没找到直接调用者,则this指的是 window
      // minus:(i)=> { //错误,this 指向了 window; 匿名函数具有全局性;
      /*“箭头函数”的this，总是指向定义时所在的对象，而不是运行时所在的对象。  
    var x=11;
    var obj={
        x:22,
        say:()=>{
            console.log(this.x);
        }
    }
    obj.say();
    //输出的值为11
    所谓的定义时候绑定，就是this是继承自父执行上下文！！中的this，
    比如这里的箭头函数中的this.x，
    箭头函数本身与say平级以key:value的形式，
    也就是箭头函数本身所在的对象为obj，
    而obj的父执行上下文就是window，
    因此这里的this.x实际上表示的是window.x */
      if (this.cartS[i].count > 1) {
        this.cartS[i].count -= 1;
      } else {
        this.remove(i);
        // this.cart[i].splice(i,1);
      }
    },
    add(i) {
      this.cartS[i].count += 1;
    },
    remove(i) {
      if (window.confirm("确定删除？")) {
        this.cartS.splice(i, 1);
      }
    }
  },
  created() {
    //监听一下父组件添加商品事件
    this.$bus.$on("addCart", good => {
      // this.$bus.$on("addCart", function addGG(good) { //错误,普通的this：总是代表它的直接调用者,没找到直接调用者,则this指的是 window
      // this.$root.$on("addCart", good => { //正确
      const ret = this.cartS.find(v => v.id === good.id);
      if (ret) {
        // console.log(ret);
        ret.count += 1;
      } else {
        this.cartS.push({
          ...good,
          count: 1,
          active: true
        });
      }
    });
  },
  computed: {
    activeCount() {
      return this.cartS.filter(v => v.active).length;
    },
    count() {
      return this.cartS.length;
    },
    total() {
      let num = 0;
      this.cartS.forEach(c => {
        if (c.active) {
          num += c.price * c.count;
        }
      });
      return num;
    }
  }
};
</script>

<style lang="scss" scoped>
.active {
  color: green;
}
</style>