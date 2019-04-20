<template>
  <div id="app">
    <RouterView></RouterView>
    <!--<HelloWorld></HelloWorld>-->
  </div>
</template>

<script>
import Layouts from '@/common/Layouts';
import HelloWorld from '@/components/HelloWorld';
export default {
  name: 'App',
  components: {HelloWorld, Layouts}
};
</script>

<style>

</style>
