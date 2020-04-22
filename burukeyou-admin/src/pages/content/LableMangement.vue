<template>
  <div>
    <!--  1  -->
    <div class="bk-card" style="display: flex;justify-content: space-between">
      <div style="display: flex">
        <div>
          标签名: <el-input v-model="condition.name" size="small" placeholder="搜索标签名" style="width: 150px"/>
        </div>

        <div style="margin-left: 10px">
          排序:
          <el-select v-model="condition.orderField" placeholder="请选择" size="small" style="width: 100px">
            <el-option  key="1" label="按关注量" value="focus_count"></el-option>
            <el-option  key="2" label="按文章量" value="article_count"></el-option>
          </el-select>
        </div>

        <div style="margin-left: 10px">
          优先级:
          <el-select v-model="condition.order" placeholder="请选择" size="small" style="width: 100px">
            <el-option  key="1" label="升序" value="Asc"></el-option>
            <el-option  key="2" label="降序" value="Desc"></el-option>
          </el-select>
        </div>
      </div>

      <div>
        <el-button type="primary" icon="el-icon-plus" size="small" @click="toaddLabel">添加</el-button>
        <el-button type="primary" icon="el-icon-search" size="small" @click="search">查询</el-button>
        <el-button type="primary" icon="el-icon-download" size="small" >导出</el-button>
      </div>
    </div>

    <!--  2  -->
    <el-card class="box-card" style="margin-top: 10px;">
      <el-table height="480px" :data="tableData" style="width: 100%" highlight-current-row size="small">
        <el-table-column fixed prop="avatar" label="标签图片" width="150">
          <template slot-scope="scope">
            <img :src="scope.row.avatar"  style="width: 60px;height: 60px">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="标签名" width="120"/>
        <el-table-column prop="focusCount" label="关注量" width="120"/>
        <el-table-column prop="articleCount" label="文章量" width="120"/>
        <el-table-column prop="createdBy" label="创建人" width="120"/>
        <el-table-column prop="createdTime" label="创建时间" width="120"/>
        <el-table-column prop="updatedBy" label="更新人" width="120"/>
        <el-table-column prop="updatedTime" label="更新时间" width="120"/>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="toUpdateLabel(scope.row)" type="text" size="small">修改</el-button>
            <el-button type="text" size="small" @click="deleteLabel(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="text-align: center;padding-top: 20px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="condition.page"
          :page-sizes="[5,10, 20, 30, 40]"
          :page-size="condition.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>

    </el-card>

    <!--  3 -->
    <el-dialog title="增加" @close="closeUpdateDialog" :visible.sync="updateDialogVisible" width="50%">
      <el-form ref="form" :model="updateDialogForm" label-width="80px">
        <el-form-item label="话题图片">
          <input type="file" ref="topicImg"  @change="onChangeFile"/>
        </el-form-item>
        <el-form-item label="话题名">
          <el-input v-model="updateDialogForm.name"/>
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" v-model="updateDialogForm.description"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addLabel">提交</el-button>
          <el-button @click="closeUpdateDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "LabelMangement",
    data(){
      return{
        // 分页
        condition:{
          page:1,
          size:10,
          name:'',
          orderField:'',
          order:''
        },
        totalCount:0,
        winHeight: '500px',

        //
        updateDialogVisible:false,
        updateDialogForm:{
          id:'',
          name:'',
          description:''
          // topicAvatar:''
        },
        isSave:false,
        // upload image
        dialogImageUrl: null,


        // 表格
        tableData: [],
        currentSelectValue: '',
        articleNameInput:"",
      }
    },
    // ======================================Method========================================================
    methods:{
      handleSizeChange(currentSize) {
        this.condition.page =1;
        this.condition.size = currentSize;
        this.search();
      },
      handleCurrentChange(currentPage) {
        this.condition.page = currentPage;
        this.search();
      },
      handleClick(row) {
        console.log(row);
      },
      search(){
        let con ={
          page:this.condition.page,
          size:this.condition.size,
          name:this.condition.name,
          orderField:this.condition.orderField,
          order:this.condition.order
        };

        this.$http.label.getPageByCondition(con).then(res => {
          this.tableData = res.data.records;
          this.totalCount = res.data.total;
        }).catch(err => console.log(err));
      },
      toaddLabel(){
        this.isSave = true;
        this.updateDialogVisible = true;
      },
      toUpdateLabel(){
        this.isSave = true;
        this.updateDialogVisible = true;
      },
      addLabel(){
        //this.$refs.topicImg.click();
        this.$http.label.save(this.updateDialogForm).then(res => {
          if (res.code === "200"){
            this.$message.success("保存成功");
            this.updateDialogVisible = false;
            this.search();
          }else {
            this.$message.error("保存失败");
          }
        })
      },
      closeUpdateDialog(){
        this.updateDialogVisible = false;
        this.updateDialogForm = {};
      },
      deleteLabel(id){
        this.$http.label.deleteById(id).then(res => {
          if (res.code === "200"){
            this.$message.success("删除成功");
            this.search();
          }else {
            this.$message.error("删除失败");
          }
        }).catch(err => console.log(err));
      },
      // 处理上传图片
      onChangeFile(item){
        // let currentFile = item.target.files[0];
        // this.updateDialogForm.referenceFile = currentFile
        // console.log(JSON.stringify( this.updateDialogForm));
      },

    },
    //============================== Mounted ====================================================
    mounted() {
      this.search();

      this.winHeight =  (Math.ceil((document.documentElement.clientHeight))-500) + 'px' ;
      console.log(this.winHeight);

    }
  }
</script>

<style scoped>
  .avatar-uploader el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
