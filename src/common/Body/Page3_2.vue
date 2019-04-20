<template>
  <div>
    产品类别
    <!--类别选择-->
    <el-select v-model="type" clearable filterable placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.label"
      ></el-option>
    </el-select>
    <!--数据展示（表单）-->
    <el-table :data="newData" stripe style="width: 100%" v-loading="loading">
      <el-table-column
        prop="type" label="产品类别" width="180"></el-table-column>
      <el-table-column
        prop="brand" label="商品品牌" width="180"></el-table-column>
      <el-table-column
        prop="name" label="商品名称" width="180"></el-table-column>
      <el-table-column
        prop="comment" label="评价详情"></el-table-column>
      <el-table-column
        prop="commenttype" label="评价类型" width="100"></el-table-column>
      <el-table-column
        prop="source" label="数据来源" width="100"></el-table-column>
    </el-table>
    <!--分页功能-->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'EcommerceComment',
    data() {
      return {
        loading: true,
        // 类别
        options: [
          {
            value: '0',
            label: '台式洗碗机'
          },
          {
            value: '1',
            label: '壁挂式空调'
          }
        ],
        value: '',
        // 筛选后数据
        newData: [
          {
            type: '',
            brand: '',
            name: '',
            comment: '',
            commenttype: '',
            source: ''
          }
        ],
        type: '',
        finder: {},
        // 分页功能
        currentPage: 1,
        total: 0
      };
    },
    methods: {
      // 分页功能
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getdata();
      },
      // shuaixuan: function () {
      //   this.finder = dict({'type': this.options[t].label});
      //   dict(t);
      //   this.getdata();
      //   return t;
      // },
      // 从后台获取数据
      getdata: function () {
        let path = 'http://localhost:5050/api/data';
        var vm = this;
        console.log(path);
        console.log(vm.currentPage);
        // console.log(JSON.parse(JSON.stringify(vm.$data.finder)));
        axios.get(path, {
          params: {
            finder: this.finder,
            page: vm.currentPage}
        }).then(function (response) {
          vm.loading = false;
          console.log('enter:', response);
          console.log('hahhahaha.enter!!!!');
          // response.setHeaderValue('Access-Control-Allow-Origin', '*');
          vm.total = response.data.total_count;
          vm.newData = response.data.result;
        });
      }
    },
    watch: {
      type: function () {
        this.finder = {'type': this.type};
        this.getdata();
      }
    },
    mounted() {
      this.getdata();
    }
  };
</script>

<style scoped>
  div{
    font-family: 微软雅黑;
    color: #000;
    font-weight: bold;
  }

</style>
