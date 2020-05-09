<template>
    <div>
      <!--  1    -->
      <div class="bk-card" style="display: flex;justify-content: space-between">
        <div style="display: flex">
          <div>
            文章名: <el-input v-model="articleNameInput" size="small" placeholder="搜索文章名" style="width: 150px"></el-input>
          </div>

          <div style="margin-left: 10px">
             审核状态:
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
          <el-table-column prop="state" label="审核状态" width="120">
            <template slot-scope="scope">
               <el-button size="mini" v-if="scope.row.state === 1" type="success"> {{convertState(scope.row.state)}}</el-button>
               <el-button size="mini" v-if="scope.row.state === 2" type="primary"> {{convertState(scope.row.state)}}</el-button>
               <el-button size="mini" v-if="scope.row.state === 3" type="danger"> {{convertState(scope.row.state)}}</el-button>
               <el-button size="mini" v-if="scope.row.state === 0" type="warning"> {{convertState(scope.row.state)}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="createdTime" label="创建时间" width="120"/>
          <el-table-column fixed="right" label="操作" width="250">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
              <el-button @click="updateArticleState(scope.row.id,1)" type="text" size="small">通过</el-button>
              <el-button @click="updateArticleState(scope.row.id,2)" type="text" size="small">不通过</el-button>
              <el-button @click="updateArticleState(scope.row.id,3)" type="text" size="small">禁止</el-button>
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
            tableData: [],

            // 下拉选择（单选）
            options: [
              {value: 0, label: '未审核'},
              {value: 1, label: '审核通过'},
              {value: 2, label: '审核未通过'},
              {value: 3, label: '禁止'}
            ],
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
              let con = {
                 page: this.currentPage,
                 size: this.currentSize,
                 state: this.currentSelectValue,
                  title: this.articleNameInput
              }
              this.$http.article.getPageByCondition(con).then(res => {
                  this.tableData = res.data.records;
                  this.totalCount = res.data.total;
              }).catch(err => console.log(err));
          },
          convertState(e){
            if (e === 0)
              return "未审核"
            if (e === 1)
              return "审核通过"
            if (e === 2)
              return "审核未通过"
            if (e === 3)
              return "禁止"
          },
          updateArticleState(id,state){
              this.$http.article.updateState({id:id,state:state}).then(res => {
                  if (res.code === "200"){
                    this.$message.success("操作成功");
                    this.search();
                  }else{
                    this.$message.error("操作失败");
                  }
              }).catch(err => console.log(err))
          }
        },
      mounted() {
          this.search();
      }
    }
</script>

<style scoped>

</style>
