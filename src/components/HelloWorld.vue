<template>
  <div class="hello">
    <p>{{msg}}</p>
    <form>
      <input type="text" v-model="msg" placeholder="edit">
      <ul>
        <li v-for="(item,i) in items">{{i}}{{item}}</li>
      </ul>
    </form>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      items: ['测试1', '测试2']
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
