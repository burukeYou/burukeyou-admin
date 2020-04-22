<template>
    <div>
      <!--  1 - 条件筛选/功能选择    -->
      <div class="bk-card" style="display: flex;justify-content: space-between">
        <div style="display: flex;align-items: center">
<!--          <div>-->
<!--            角色名: <el-input v-model="roleName" size="small" placeholder="搜索角色" style="width: 150px"></el-input>-->
<!--          </div>-->

        </div>

        <div>
            <el-button type="primary" icon="el-icon-plus" size="small" @click="addRoleDialogVisible = true">添加</el-button>
        </div>
      </div>


      <!--  1 - 数据列表    -->
      <el-card class="box-card" style="margin-top: 10px">
        <el-table  :data="roleData" style="width: 100%" highlight-current-row size="small">
            <el-table-column fixed prop="name" label="角色名" width="100"/>
            <el-table-column prop="code" label="角色Code" width="100"/>
            <el-table-column prop="description" label="简介" width="120"/>
            <el-table-column prop="createdTime" label="创建时间" width="150"/>
            <el-table-column prop="createdBy" label="创建人" width="120"/>
            <el-table-column prop="updatedTime" label="更新时间" width="150"/>
            <el-table-column prop="updatedBy" label="更新人" width="120"/>
            <el-table-column fixed="right" label="操作" width="220">
              <template slot-scope="scope">
                <el-button  type="primary" size="mini" icon="el-icon-edit" @click="toUpdate(scope.row)"/>
                <el-button type="danger"  size="mini" icon="el-icon-delete" @click="deleteRole(scope.row.id)"/>
                <el-button  type="success" size="mini" @click="toAssignPermissions(scope.row)">分配权限</el-button>
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

      <!-- 2 - 修改对话框    -->
      <el-dialog title="修改" :visible.sync="updateDialogVisible" width="50%">
            <el-form ref="form" :model="updateDialogForm" label-width="80px">
                <el-form-item label="角色名">
                      <el-input v-model="updateDialogForm.name"/>
                </el-form-item>
                <el-form-item label="角色code">
                    <el-input v-model="updateDialogForm.code"/>
                </el-form-item>
                <el-form-item label="简介">
                  <el-input type="textarea" v-model="updateDialogForm.description"/>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onUpdate">提交</el-button>
                  <el-button @click="updateDialogVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
      </el-dialog>

      <!-- 3 - 增加对话框    -->
      <el-dialog title="增加" @close="closeAddRoleDialog" :visible.sync="addRoleDialogVisible" width="50%">
          <el-form ref="form" :model="addDialogForm" label-width="80px">
            <el-form-item label="角色名">
              <el-input v-model="addDialogForm.name"/>
            </el-form-item>
            <el-form-item label="角色code">
              <el-input v-model="addDialogForm.code"/>
            </el-form-item>
            <el-form-item label="简介">
              <el-input type="textarea" v-model="addDialogForm.description"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addRole">提交</el-button>
              <el-button @click="closeAddRoleDialog()">取消</el-button>
            </el-form-item>
          </el-form>
      </el-dialog>


     <!--  4 - 权限分配对话框    -->
     <el-dialog @close="closeAssignPermissionDialog" title="分配角色权限" :visible.sync="assignPermissionsDialogVisible" width="50%">
           <el-tree   ref="tree" :data="menuDataTree" show-checkbox node-key="id" default-expand-all highlight-current
             :default-checked-keys="defaultCheckedKeys" :props="defaultProps">
           </el-tree>

           <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="assignPermissions">提交</el-button>
                  <el-button @click="closeAssignPermissionDialog">取 消</el-button>
             </span>
     </el-dialog>

 </div>
</template>

<script>
    export default {
        name: "RoleManagement",
        data(){
          return {
              // 分页
              currentPage: 1,
              currentSize: 10,
              totalCount: 0,
              roleName: '',
              updateDialogVisible:false,
              assignPermissionsDialogVisible: false,
              updateDialogForm: {
                  id:'',
                  code:'',
                  name: '',
                  description:''

              },

               //
              addRoleDialogVisible: false,
              addDialogForm: {
                id:'',
                code:'',
                name: '',
                description:''

              },


              //
              roleData : ['3'],

              //
              assignPermissionsDialogRoleId:'',
              defaultCheckedKeys:[],
              defaultExpandedKeys:[],
              menuDataTree: [/*{
                  id: '1',
                  label: '一级 1',
                  children: [{
                    id: '4',
                    label: '二级 1-1',
                    children: [{
                      id: '9',
                      label: '三级 1-1-1'
                    }, {
                      id: '10',
                      label: '三级 1-1-2'
                    }]
                  }]
                }*/],

                // 设置 tree 的默认属性
                defaultProps: {
                  children: 'children',
                  label: 'name'
                },

              }
          },
        //====================================== Method ===========================================================
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
              //
              search(){
                  this.$http.role.getPage({page:this.currentPage,size:this.currentSize}).then(res => {
                        this.roleData = res.data.records;
                        this.totalCount = res.data.total;
                  }).catch(err => console.log(err));
              },
               toUpdate(e){
                  this.updateDialogVisible = true;
                   // this.updateDialogForm = {
                   //   id:e.id,
                   //   code:e.code,
                   //   name:e.name,
                   //   description:e.description
                   // }
                  this.$http.role.getById(e.id).then(res => {
                      this.updateDialogForm = res.data;
                  }).catch(err => console.log(err))

               },
              // 查看权限列表
              toAssignPermissions(e){
                  this.assignPermissionsDialogVisible = true;
                  this.$http.menu.getAllMenu(e.id).then(res => {
                          if(res.code === "200"){
                                this.menuDataTree = res.data.tree;
                                this.defaultCheckedKeys = res.data.defaultCheckedKey;
                                this.assignPermissionsDialogRoleId = e.id;
                                //todo 递归展示展开所有
                          }
                  })
              },
              // 分配权限
              assignPermissions(){
                  console.log(JSON.stringify(this.$refs.tree.getCheckedKeys()));
                  this.$http.menu.assignPermissions(this.assignPermissionsDialogRoleId,this.$refs.tree.getCheckedKeys())
                      .then(res => {
                        if (res.code === "200"){
                          this.$message.success("分配成功");
                        }else{
                          this.$message.error("分配失败");
                        }
                      }).catch(err => console.log(err));
              },
              // 添加
              addRole(){
                  this.$http.role.save(this.addDialogForm).then(res => {
                      if (res.code === "200"){
                        this.$message.success("添加成功");
                        this.closeAddRoleDialog();
                        this.search();
                      }else {
                        this.$message.error("添加失败");
                      }
                  });
              },
              closeAddRoleDialog(){
                  this.addRoleDialogVisible = false;
                  this.addDialogForm = {};
              },
              closeUpdateRoleDialog(){
                this.updateDialogVisible = false;
                this.updateDialogForm = {}
              },
              closeAssignPermissionDialog(){
                  this.assignPermissionsDialogVisible = false;
                  this.assignPermissionsDialogRoleId = ''
              },
              // 更新
              onUpdate(){
                this.$http.role.save(this.updateDialogForm).then(res => {
                    if (res.code === "200"){
                      this.$message.success("修改成功");
                      this.closeUpdateRoleDialog();
                      this.search();
                    }else {
                      this.$message.error("修改失败");
                    }
                });
              },
              //删除
              deleteRole(id){
                  this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    this.$http.role.deleteById(id).then(res => {
                        if (res.code === "200"){
                          this.$message({
                            type: 'success',
                            message: '删除成功!'
                          });
                          this.search();
                        }else {
                            this.$message({
                              type: 'info',
                              message: '删除失败'
                            });
                        }
                    })
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消删除'
                    });
                  });
              },

        },
       //========================================== Mounted ========================================================
       mounted() {
          this.search();
       }
    }
</script>

<style scoped>

</style>
