<template>
    <div>
      <!--  1 - 条件筛选/功能选择    -->
      <div class="bk-card" style="display: flex;justify-content: space-between">
              <div style="display: flex;align-items: center">
                  <div>
                    姓名: <el-input v-model="condition.nickname" size="small" placeholder="搜索账号/姓名" style="width: 150px"></el-input>
                  </div>

                  <div style="margin-left: 20px">
                    角色:
                    <el-select v-model="condition.role" placeholder="请选择" size="small" style="width: 100px">
                        <el-option v-for="(e,index) in roleOptions" :key="index" :label="e.name" :value="e.code">
                        </el-option>
                    </el-select>
                  </div>

                  <div style="margin-left: 20px">
                       是否可用:
                      <el-switch v-model="condition.enabled">
                      </el-switch>
                  </div>

              </div>

              <div>
                <el-button type="primary" icon="el-icon-add" size="small" @click="addUserDialogVisible  = true">添加管理员</el-button>
                <el-button type="primary" icon="el-icon-search" size="small" @click="search">查询</el-button>
                <el-button type="primary" icon="el-icon-download" size="small" >导出</el-button>
                <el-button type="primary" icon="el-icon-upload" size="small">导入</el-button>
              </div>
      </div>

      <!--  2 - 数据列表    -->
      <el-card class="box-card" style="margin-top: 10px">
          <el-table  :data="tableData" style="width: 100%" highlight-current-row size="small">
            <el-table-column fixed prop="nickname" label="姓名" min-width="100"/>
            <el-table-column  prop="mobile" label="手机" min-width="100"/>
            <el-table-column  prop="email" label="邮箱" min-width="100"/>
            <el-table-column prop="roleList" label="角色" min-width="150">
              <template slot-scope="scope">
                    <span v-for="(e,i) in scope.row.roleList">{{e.name}}/</span>
              </template>
            </el-table-column>
            <el-table-column prop="isLock" label="是否可用" min-width="70">
                <template slot-scope="scope">
                  <el-switch disabled v-model="scope.row.enabled" @change="changeIsLock(scope.row.id,scope.row.enabled)"/>
                </template>
            </el-table-column>
            <el-table-column prop="mobile" label="手机" min-width="100"/>
            <el-table-column prop="email" label="邮箱" min-width="100"/>
            <el-table-column prop="lastloginTime" label="最后登陆时间"  min-width="120"/>
            <el-table-column prop="lastloginHost" label="最后登录地址" min-width="120"/>
            <el-table-column prop="createdBy" label="创建人" min-width="70"/>
            <el-table-column prop="createdTime" label="创建时间" min-width="120"/>
            <el-table-column prop="updatedBy" label="更新人" min-width="70"/>
            <el-table-column prop="updatedTime" label="更新时间" min-width="120"/>
            <el-table-column fixed="right" label="操作" width="230">
              <template slot-scope="scope">
                  <el-button type="" plain @click="handleClick(scope.row)" size="mini">查看</el-button>
                  <el-button  type="primary" size="mini" icon="el-icon-edit" @click="toUpdateUser(scope.row)"/>
                  <el-button type="danger"  size="mini" icon="el-icon-delete" @click="deleteUser(scope.row)"/>
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

      <!--  3 - 修改弹出框    -->
      <el-dialog @close="closeUpdateDialog" title="修改" :visible.sync="updateDialogVisible" width="50%">
          <!--    内容    -->
          <el-form ref="form" :model="updateUserDialogForm" label-width="100px" size="mini">
            <el-form-item label="姓名">
                <el-input v-model="updateUserDialogForm.nickname" style="width: 200px"/>
            </el-form-item>
            <el-form-item label="手机">
              <el-input v-model="updateUserDialogForm.mobile" style="width: 200px"/>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="updateUserDialogForm.password" style="width: 200px"/>
            </el-form-item>
            <el-form-item label="角色">
              <el-select v-model="updateRoleSelecyList" multiple placeholder="请分配角色" style="width: 250px">
                  <el-option v-for="(e,index) in updateRoleOptions"  :key="index" :label="e.name" :value="e.id">
                  </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否锁定">
                <el-switch v-model="updateUserDialogForm.enabled"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateUser">提交</el-button>
              <el-button @click="closeUpdateDialog">取消</el-button>
            </el-form-item>
          </el-form>
      </el-dialog>

    <!--  4 -新增用户弹出框    -->
      <el-dialog @close="closeAddUserDialog" title="添加管理员" :visible.sync="addUserDialogVisible" width="50%">
        <!--    内容    -->
        <el-form ref="form" :model="addUserDialogForm" label-width="100px" size="mini">
          <el-form-item label="姓名">
            <el-input v-model="addUserDialogForm.nickname" style="width: 200px"/>
          </el-form-item>
          <el-form-item label="账号">
            <el-input v-model="addUserDialogForm.adminName" style="width: 200px"/>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="addUserDialogForm.password" style="width: 200px"/>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="addUserDialogForm.roleList" multiple placeholder="请分配角色" style="width: 250px">
                <el-option v-for="(e,index) in roleOptions"  :key="index" :label="e.name" :value="e.id">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addUserr">提交</el-button>
            <el-button @click="closeAddUserDialog">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>



    </div>
</template>

<script>
    export default {
        name: "UserManagement",
        data(){
          return{
              // 分页
              totalCount: 0,

              condition:{
                page:1,
                size:10,
                enabled:null,
                role:null,
                nickname:null,
                orderField:null,
                order:null,
              },

              // 表格
              tableData: [],

              // 下拉选择（单选）
              roleOptions: [],
              roleSelectValue: '',

              nicknameInput:"",

              isLock:false,

              //
               updateDialogVisible: false,
               updateUserDialogForm:{
                    id:null,
                    nickname: '',
                    adminName: '',
                    password: '',
                    enabled: true
               },
              updateRoleSelecyList:[],
              updateRoleOptions: [],

            //
            addUserDialogVisible: false,
            addUserDialogForm:{
              nickname: '',
              adminName: '',
              password: '',
              roleList:[],
            },


          }
        },
        // =====================Method=======================================
        methods:{
          handleSizeChange(currentSize) {
            this.condition.size = currentSize;
            this.search();
          },
          handleCurrentChange(currentPage) {
            this.condition.page = currentPage;
            this.search();
          },
          handleClick(row) {
           // console.log(row);
          },
          search(){
             //let cd  = this.condition; // 引用传递
              let cd = {
                   page:this.condition.page ,
                  size:this.condition.size,
                  enabled:this.condition.enabled,
                  role:this.condition.role,
                  nickname:this.condition.nickname,
                  orderField:this.condition.orderField,
                  order:this.condition.order,
              };

              this.$http.user.getAll(cd).then( res => {
                    this.tableData = res.data.records;
                    this.totalCount = res.data.total
              }).catch(err => console.log(err));
          },
          toUpdateUser(user){
              this.initUpdateDialogOptions();
              this.updateDialogVisible  = true;
              this.$http.user.getOneById(user.id).then(res => {
                this.updateUserDialogForm = res.data;
                for(let e of res.data.roleList){
                  this.updateRoleSelecyList.push(e.id);
                }
              }).catch(err => console.log(err));
          },
          changeIsLock(userId,value){
             console.log("改变锁定,改变用户: %s, 当前值为:%s",userId,value)
          },
          initRoleSelectOptions(){
             this.$http.role.getAll().then(res => {
                this.roleOptions = res.data;
               this.roleOptions.unshift({code:'',name:'全部'});
               this.roleSelectValue =  '';
             });
          },
          initUpdateDialogOptions(){
            this.$http.role.getAll().then(res => {
              this.updateRoleOptions = res.data;
            });
          },
          addUserr(){
              console.log(JSON.stringify(this.addUserDialogForm));
            this.$http.user.addUser(this.addUserDialogForm).then(res => {
              if (res.code === "200"){
                this.$message.success("添加成功");
                this.addUserDialogVisible = false;
                this.search();
              }else {
                this.$message.error("t添加失败");
              }
            })
          },
          updateUser(){
            let param = {
                id: this.updateUserDialogForm.id,
                nickname: this.updateUserDialogForm.nickname,
                //adminName: this.updateUserDialogForm.adminName,
               // password: '',
                roleList:this.updateRoleSelecyList,
                mobile:this.updateUserDialogForm.mobile,
                enabled: this.updateUserDialogForm.enabled
            };
            this.$http.user.addUser(param).then(res => {
                  if (res.code === "200"){
                    this.$message.success("修改成功");
                    this.closeUpdateDialog();
                  }else {
                    this.$message.error("修改失败");
                  }
            }).catch(err => console.log(err));
          },
          closeAddUserDialog(){
              this.addUserDialogForm = {nickname: '', adminName: '', password: '', role:[]}
              this.addUserDialogVisible = false;
          },
          closeUpdateDialog(){
            this.updateDialogVisible = false;
            this.updateUserDialogForm = {};
            this.updateRoleSelecyList = [];
          },
          deleteUser(row){
             this.$http.user.deleteById(row.id).then(res => {
                 if (res.code === "200"){
                   this.$message.success("删除成功");
                   this.search();
                 }else {
                   this.$message.error("删除失败");
                 }
             });
          },
          responseMessageTip(opeation){
              if (res.code === "200"){
                this.$message.success(opeation+"成功");
              }else {
                this.$message.error(opeation+"失败");
              }
          }
        },
        mounted() {
         /*  this.$http.user.getInfo({id:1}).then(res => {
                console.log(JSON.stringify(res));
           }).catch(err => console.log(err));*/
          this.initRoleSelectOptions();
          this.search();
        }
    }
</script>

<style scoped>
  .conditionDiv  {
      margin-left: 20px;
  }
</style>
