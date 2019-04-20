<template>
  <div id="listTodos">
    <ul>
      <li v-for="(todo,i) in todos" :key="i">
      <router-link :to="{name:todo.link}">{{todo.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Aside',
    data: function () {
      return {
        todos: [
          {link: 'EcommerceParameter', name: '电商参数类数据信息'},
          // {link: 'Forum', name: '论坛数据信息'},
          {link: 'EcommerceComment', name: '电商评论类数据信息'}
          // {link: 'Tender', name: '招标类信息'},
          // {link: 'NumberAttribution', name: '号码归属地信息'}
        ]
      };
    }
  };
</script>

<style scoped>
  ul{
    margin-top: 20vh;
  }
  li{
    margin: 30px;
    font-size: 18px;
    /*color: rgba(255, 255, 255, 0.6);*/
    color: white;
    list-style: none;
  }
  a {
    text-decoration: none;
    color: gainsboro;
  }
  .router-link-active {
    color: white;
  }

</style>
