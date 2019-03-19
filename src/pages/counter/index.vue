<template>
  <div class="counter-warp">
    <p>Vuex counter：{{ count }}</p>
    <p>Vuex counter：{{ count1 }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>
  </div>
</template>

<script>
// Use Vuex
import store from '../../store'

export default {
  computed: {
    count () {
      // return store.state.count
      return this.$store.state.count
    },
    // 每次获取数据，都要进行一次操作
    count1 () {
      return store.getters.getterTest
    }
  },
  methods: {
    increment () {
      store.commit('increment', 4)
    },
    decrement () {
      store.commit('decrement')
      // store.dispatch('act')
    }
  },
  // 在onload周期内执行数据初始化操作
  onLoad(){
    
  },
}
</script>

<style>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
