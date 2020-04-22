<template>
  <div>
    <div class="bk-card" style="display: flex;justify-content: space-between">
      <div style="display: flex">
        <div>
          操作: <el-input v-model="nicknameInput" size="small" placeholder="搜索账号/姓名" style="width: 150px"></el-input>
        </div>

        <div style="margin-left: 10px">
          应用名:
          <el-select v-model="currentSelectValue" placeholder="请选择" size="small" style="width: 100px">
            <el-option v-for="(e,index) in options" :key="e.value" :label="e.label" :value="e.value">
            </el-option>
          </el-select>
        </div>
      </div>

      <div>
        <el-button type="primary" icon="el-icon-search" size="small" @click="search">查询</el-button>
        <el-button type="primary" icon="el-icon-download" size="small" >导出</el-button>
        <el-button type="primary" icon="el-icon-upload" size="small">导入</el-button>
      </div>
    </div>

    <el-card class="box-card" style="margin-top: 10px">
      <el-table  :data="tableData" style="width: 100%" highlight-current-row size="small">
        <el-table-column fixed prop="date" label="操作用户" width="150"/>
        <el-table-column prop="name" label="操作信息" width="120"/>
        <el-table-column prop="province" label="操作时间" width="120"/>
        <el-table-column prop="city" label="操作接口" width="120"/>
        <el-table-column prop="address" label="应用名" width="300"/>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="text-align: center;padding-top: 20px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5,10, 20, 30, 40]"
          :page-size="currentSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>

    </el-card>



  </div>
</template>

<script>
  export default {
    name: "AuditLogMonitor",
    data(){
      return{
        // 分页
        currentPage: 1,
        currentSize: 10,
        totalCount: 30,

        // 表格
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }],

        // 下拉选择（单选）
        options: [{
          value: 'true',
          label: '是'
        }, {
          value: 'false',
          label: '否'
        }],
        currentSelectValue: '',

        nicknameInput:"",


      }
    },
    // =====================Method=======================================
    methods:{
      handleSizeChange(currentSize) {
        this.currentPage=1;
        this.currentSize = currentSize;
        this.search();
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.search();
      },
      handleClick(row) {
        console.log(row);
      },
      search(){

      }
    },
    mounted() {
      /*  this.$http.user.getInfo({id:1}).then(res => {
             console.log(JSON.stringify(res));
        }).catch(err => console.log(err));*/
    }
  }
</script>

<style scoped>
  .conditionDiv  {
    margin-left: 20px;
  }
</style>
