<template>
    <div>
        <!--   1 - 选择     -->
        <div class="bk-card" style="display: flex;justify-content: space-between">
          <div style="display: flex;align-items: center">
            <div>
              标题: <el-input v-model="nicknameInput" size="small" placeholder="搜索账号/姓名" style="width: 150px"></el-input>
            </div>

            <div style="margin-left: 10px">
              状态:
              <el-select v-model="currentSelectValue" placeholder="请选择" size="small" style="width: 100px">
                <el-option v-for="(e,index) in options" :key="e.value" :label="e.label" :value="e.value">
                </el-option>
              </el-select>
            </div>

            <div class="block" style="margin-left: 10px">
                发布日期:
                <el-date-picker
                  size="small"
                  v-model="timeTangeSelectValue"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions">
                </el-date-picker>
            </div>

          </div>

          <div>
            <el-button type="primary" icon="el-icon-search" size="small" @click="search">搜索</el-button>
            <el-button type="primary" size="small" @click="publicNotification">发布通知</el-button>
          </div>
        </div>


        <!--  2 -   数据列表   -->
        <el-card class="box-card" style="margin-top: 10px">
          <el-table  :data="tableData" style="width: 100%" highlight-current-row size="small">
            <el-table-column fixed prop="content.title" label="标题" width="200"/>
            <el-table-column fixed prop="content.tt" label="内容" width="250"/>
            <el-table-column fixed prop="acceptId" label="接收者" width="80">
                <template slot-scope="scope">
                  {{convertAcceptId(scope.row.acceptId)}}
                </template>
            </el-table-column>
<!--            <el-table-column fixed prop="date" label="状态" width="100"/>-->
<!--            <el-table-column prop="name" label="发布人" width="120"/>-->
            <el-table-column prop="createdTime" label="发布日期" width="120"/>
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
                <el-button type="text" size="small">删除</el-button>
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


        <!--  3 - 发布通知弹出框      -->
        <el-dialog title="发布系统通知" :visible.sync="publicDialogVisible" width="50%">
              <el-form ref="form" :model="publicDialogForm" label-width="80px">
                <el-form-item label="标题">
                    <el-input v-model="publicDialogForm.title"/>
                </el-form-item>
                <el-form-item label="接收者">
                    <el-select v-model="publicDialogForm.acceptId"  filterable remote reserve-keyword
                      :remote-method="acceptUserSelectOnchange" :loading="acceptUserSelectLoading">
                      <el-option key="1" label="所有用户" value="#00000"/>
                      <el-option v-for="item in acceptUserSelectOptions" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input type="textarea" v-model="publicDialogForm.content"/>
                </el-form-item>
                <el-form-item label="是否置顶">
                    <el-switch v-model="publicDialogForm.top"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button @click="updateDialogVisible = false">取消</el-button>
                </el-form-item>
              </el-form>
        </el-dialog>




    </div>
</template>

<script>
    export default {
        name: "NotificationMangement",
        data(){
          return{
            // 分页
            currentPage: 1,
            currentSize: 10,
            totalCount: 30,
            timeTangeSelectValue:"",
            nicknameInput:"",

            pickerOptions: {
              shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近一个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近三个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                  picker.$emit('pick', [start, end]);
                }
              }]
            },

            // 表格
            tableData: [],

            // 下拉选择（单选）
            options: [{
              value: 'true',
              label: '是'
            }, {
              value: 'false',
              label: '否'
            }],
            currentSelectValue: '',
            publicDialogVisible:false,

            publicDialogForm:{
              acceptId:"",
              content:"",
              title:"",
              type:"SYSTEM"
            },
            acceptUserSelectLoading:false,
            acceptUserSelectOptions:[],



          }
        },
        // ======================== Method ======================================================
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
                this.$http.notification.getPageByType({type:"SYSTEM",page:this.currentPage,size:this.currentSize}).then(res => {
                      this.tableData = res.data.records;
                      this.totalCount = res.data.total;
                }).catch(err => console.log(err));
          },
            publicNotification(){
                  this.publicDialogVisible = true;
            },
            acceptUserSelectOnchange(query){
                console.log("搜索用户:%s",query);
                  if (query !== '') {
                    this.acceptUserSelectLoading = true;
                    setTimeout(() => {
                      this.acceptUserSelectLoading = false;
                      this.acceptUserSelectOptions.push({label:'李白',value:'102'});
                    }, 200);
                  } else {
                    this.options = [];
                  }
            },
           onSubmit(){
              console.log(JSON.stringify(this.publicDialogForm));
              let condition = {
                acceptId: this.publicDialogForm.acceptId,
                type: this.publicDialogForm.type,
                content: JSON.stringify({title:this.publicDialogForm.title,tt:this.publicDialogForm.content})
              }

               this.$http.notification.publishNotification(condition).then(res => {
                  if (res.code === "200"){
                    this.$message.success("发布成功");
                     this.publicDialogVisible = false;
                     this.search();
                  }else {
                     this.$message.error("发布失败："+res.message);
                  }
               }).catch(err => console.log(err));
           },
          convertAcceptId(id){
             if (id === "#00000")
               return "所有用户";
          }
        },
       //=======================================================Mounted ==========================================
      mounted() {
          this.search();
      }

    }
</script>

<style scoped>

</style>
