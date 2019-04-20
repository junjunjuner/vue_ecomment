<!--suppress ALL -->
<template>
  <div id="add_example">
    <form v-on:submit.prevent="hahaha">
      <label for="hehehe">Add a todo</label>
      <input v-model="newtext" id="hehehe" placeholder="edit">
      <button>add</button>
    </form>
    <ul>
      <li is="mytest" v-for="(todo,index) in todos" v-bind:key="todo.name" v-bind:title="todo.thing" v-on:remove="todos.splice(index,1)"></li>
    </ul>
  </div>
</template>

<script>
  import Vue from 'vue';
  Vue.component('mytest', {
    props: ['title'],
    template: "<li>{{title}}</li><li v-on:click='$emit=(remove)'>Remove</li>"
  });
    export default {
      name: 'Test',
      data() {
        return {
          newtext: '',
          todos: [
            {name: '1', thing: '1111'},
            {name: '2', thing: '2222'}
          ],
          newname: 3
        };
      },
      methods: {
        hahaha: function () {
          this.todos.push({
            name: this.newname++,
            thing: this.newtext
          });
          this.newtext = '';
        }
      }
    };
</script>

<style scoped>

</style>
