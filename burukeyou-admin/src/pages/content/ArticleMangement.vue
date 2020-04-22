<template>
    <div>
      <!--  1    -->
      <div class="bk-card" style="display: flex;justify-content: space-between">
        <div style="display: flex">
          <div>
            文章名: <el-input v-model="articleNameInput" size="small" placeholder="搜索文章名" style="width: 150px"></el-input>
          </div>

          <div style="margin-left: 10px">
             状态:
            <el-select v-model="currentSelectValue" placeholder="请选择" size="small" style="width: 100px">
              <el-option v-for="(e,index) in options" :key="e.value" :label="e.label" :value="e.value">
              </el-option>
            </el-select>
          </div>
        </div>

        <div>
          <el-button type="primary" icon="el-icon-search" size="small" @click="search">查询</el-button>
          <el-button type="primary" icon="el-icon-download" size="small" >导出</el-button>
        </div>
      </div>

      <!-- 2     -->
      <el-card class="box-card" style="margin-top: 10px">
        <el-table  :data="tableData" style="width: 100%" highlight-current-row size="small">
          <el-table-column fixed prop="title" label="文章标题" width="150"/>
          <el-table-column prop="description" label="文章简介" show-overflow-tooltip  width="120"/>
          <el-table-column prop="userNickname" label="用户名" width="120"/>
          <el-table-column prop="state" label="审核状态" width="120"/>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
              <el-button type="text" size="small">审核通过</el-button>
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
        name: "ArticleMangement",
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

            articleNameInput:"",
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
    }
</script>

<style scoped>

</style>
