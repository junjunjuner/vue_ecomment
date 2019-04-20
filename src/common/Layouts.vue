<template>
    <el-container>
        <el-aside>
          <Aside></Aside>
        </el-aside>
      <el-container>
        <el-header height="10vh">
          <Header></Header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
    import Header from '@/common/layout/Header';
    import Aside from '@/common/layout/Aside';
    import Test from '@/test/Test';
    export default {
        name: 'Layouts',
      components: {Test, Aside, Header}
    };
</script>

<style>
  .el-aside{
    width: 260px;
    background-image: linear-gradient(to bottom, #315481, #918e82 100%);
    height: 95vh;
  }
  .el-header{
    background-image: linear-gradient(to bottom, #d0edf5, #e1e5f0 100%);
    text-align: center;
    line-height: 8vh;
  }
  .el-main{
    /*line-height: 65vh;*/
    background: white;
    text-align: center;
  }
  body{
    margin-left: 200px;
    margin-right: 200px;
    /*background-color: #315481;*/
    background-image: linear-gradient(to bottom, #315481, #918e82 100%);
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .el-container{
    width: auto;
    height: auto;
  }

</style>
