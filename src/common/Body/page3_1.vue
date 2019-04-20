<template>
  <div>
    产品类别
    <!--类别选择-->
    <el-select v-model=" selecttype" clearable filterable placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
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
      :background="true"
      @currentpage="handleCurrentChange"
      :current-page="page.pageNo"
      :page-size="page.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="allCount">
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
        // 原始数据
        tableData: [
          // {
          //   type: '台式洗碗机',
          //   brand: '海尔',
          //   name: '海尔（Haier）小海贝 6套 进口变频电机  简洁安装 72度高温双效除菌 活水台式 洗碗机 鎏金黑 HTAW50STGB',
          //   comment: '垃圾的不能再垃圾了，漏发几个配件，和客服申请补发，结果从6月8号开始每天都有人打电话来问，' +
          //     '而且全是不同的人，每个人都要问我一遍漏发什么，机器型号是什么，问完都说立马给我安排补发，' +
          //     '到今天6月15号还是没有发过来！刚才又有人打电话来，又问漏发什么，型号是什么！气的我要疯了，' +
          //     '这是什么处理方式？互相之间没有信息互通吗？漏发的东西不要也罢了！！！',
          //   commenttype: '好评',
          //   source: '京东'
          // }
        ],
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
        selecttype: '',
        keyword: {},
        // 分页功能
        page: {
          pageNo: 1, // 当前页
          pageSize: 10, // 每页条数,  默认10条
          totalRecords: 0, // 总条数
          totalPages: 0 // 总页数
        } // 已完成项目翻页
      };
    },
    methods: {
      // 分页方法
      handleCurrentChange(val) {
        console.log(val);
        this.page.pageNo = val;
        this.getdata();
      },
      getList() {
        this.keyword = {'type': this.selecttype};
        console.log(this.keyword);
        return this.keyword;
      },
      shuaixuan: function (t) {
        // 此句不可省略，有该句后可实现实时变更数据信息
        this.newData = this.tableData;
        if (t !== '') {
          this.newData = this.newData.filter(temp => {
            // options是根据本身的0，1，2，3……进行索引的
            console.log(this.options[t].label);
            // 等于===
            return temp['type'] === this.options[t].label;
          });
        }
      },
      // 从后台获取数据
      getdata: function () {
        let path = 'http://localhost:5050/api/data';
        var vm = this;
        console.log(path);
        axios.get(path, {
          finder: this.getList(),
          per_page: this.page.pageSize,
          page: this.page.pageNo
        }).then(function (response) {
          vm.loading = false;
          console.log(response);
          console.log('hahhahaha.enter!!!!');
          // response.setHeaderValue('Access-Control-Allow-Origin', '*');
          vm.newData = response.data.result;
        });
      },
      watch: {
        selecttype() {
          this.getList();
        }
      },
      mounted() {
        this.getdata();
      }
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
