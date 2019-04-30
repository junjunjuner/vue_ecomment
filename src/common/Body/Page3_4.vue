<!--新增excel表导出功能-->
<template>
  <div>
    <div id="select">
      <el-input type="text" v-model="search" placeholder="此处可搜索评价详情" width="200px"></el-input>
      <!--<el-input type="submit" value="搜索" width="50"></el-input>-->
      <!--类别选择-->
      产品类别
      <el-select v-model="type" clearable filterable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        ></el-option>
      </el-select>
      <el-button type="primary" class="out" @click="exportClick()">导出</el-button>
    </div>
    <div id="form">
      <!--数据展示（表单）-->
      <!--搜索关键词高亮-->
      <el-table :data="newData" stripe style="width: 100%" v-loading="loading">
        <el-table-column label="产品类别" width="180">
          <template slot-scope="scope">
            <span class="col-cont" v-html="showDate(scope.row.type)"></span>
          </template>
        </el-table-column>
        <el-table-column label="商品品牌" width="180">
          <template slot-scope="scope">
            <span class="col-cont" v-html="showDate(scope.row.brand)"></span>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" width="180">
          <template slot-scope="scope">
            <span class="col-cont" v-html="showDate(scope.row.name)"></span>
          </template>
        </el-table-column>
        <el-table-column label="评价详情">
          <template slot-scope="scope">
            <span class="col-cont" v-html="showDate(scope.row.comment)"></span>
          </template>
        </el-table-column>
        <el-table-column label="评价类型" width="100">
          <template slot-scope="scope">
            <span class="col-cont" v-html="showDate(scope.row.commenttype)"></span>
          </template>
        </el-table-column>
        <el-table-column label="数据来源" width="100">
          <template slot-scope="scope">
            <span class="col-cont" v-html="showDate(scope.row.source)"></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
  import moment from 'moment';
  export default {
    name: 'EcommerceComment',
    data() {
      return {
        loading: true,
        // 类别
        options: [
          {
            value: '0',
            label: '扫地机器人'
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
        search: '',
        // 分页功能
        currentPage: 1,
        total: 0,
        // 导出的list
        exportList: []
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
      // 搜索关键词高亮
      showDate(val) {
        val = val + '';
        if (val.indexOf(this.search) !== -1 && this.search !== '') {
          return val.replace(this.search, '<font color="red">' + this.search + '</font>');
        } else {
          return val;
        }
      },

      // 从后台获取数据
      getdata: function () {
        let path = 'http://localhost:5050/api/data';
        var vm = this;
        console.log(path);
        console.log(vm.currentPage);
        // console.log(JSON.parse(JSON.stringify(vm.$data.finder)));
        axios.get(path, {
          params: {
            type: this.type,
            search: this.search,
            page: vm.currentPage}
        }).then(function (response) {
          vm.loading = false;
          console.log('enter:', response);
          console.log('hahhahaha.enter!!!!');
          // response.setHeaderValue('Access-Control-Allow-Origin', '*');
          vm.total = response.data.total_count;
          vm.newData = response.data.result;
        })
          .catch(error => {
            console.log('发生错误：', error);
          });
      },

      exportClick () {
        let path = 'http://localhost:5050/api/exportdata';
        var vm = this;
        // console.log(JSON.parse(JSON.stringify(vm.$data.finder)));
        axios.get(path, {
          params: {
            type: vm.type,
            search: vm.search
          }
        }).then(function (response) {
          // response.setHeaderValue('Access-Control-Allow-Origin', '*');
          vm.total = response.data.total_count;
          vm.exportList = response.data.result;
          vm.export2Excel();
        })
          .catch(error => {
            console.log('导出数据发生错误：', error);
          });
      },

      export2Excel () {
        require.ensure([], () => {
          const {export_json_to_excel} = require('../../vendor/Export2Excel');
          const tHeader = ['产品类别', '商品品牌', '商品名称', '评价详情', '评价类型', '数据来源'];
          const filterVal = ['type', 'brand', 'name', 'comment', 'commenttype', 'source'];
          const list = this.exportList;
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '电商评价数据' + moment(new Date()).format('YYYYMMDDHHmmss'));
        });
      },

      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]));
      }
    },
    watch: {
      type: function () {
        // this.finder = {'type': this.type};
        this.getdata();
      },
      search: function () {
        this.getdata();
      }
    },
    mounted() {
      this.getdata();
    }
  };
</script>

<style scoped>
  .el-input{
    width: 200px;
  }
  div{
    font-family: 微软雅黑;
    color: #000;
    font-weight: bold;
  }

</style>
