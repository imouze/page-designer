<template>
  <div id="app">
    <!--分几个区，头部菜单区，右侧属性区，左侧资源区和图层管理区，中间为内容操作区-->
    <header></header>

  </div>
</template>

<script>
  import Header from './components/Header.vue'

  export default {
    name: 'App',
    components: {
        Header
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
