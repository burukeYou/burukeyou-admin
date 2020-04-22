<template>
    <div>
      <!--  1 - 条件筛选/功能选择    -->
      <div class="bk-card" style="display: flex;justify-content: flex-end">
        <div>
            <el-button type="primary" icon="el-icon-plus" size="small" @click="toAddMenu">添加</el-button>
            <el-button @click="changeTableExpand(true)" type="primary" size="small">全部展开</el-button>
            <el-button @click="changeTableExpand(false)" type="primary"  size="small">全部折叠</el-button>
        </div>
      </div>

      <!--  2 - 数据列表    -->
      <el-card class="box-card" style="margin-top: 10px" >
        <el-table height="500" ref="treeTable" :data="menuData" style="width: 100%" highlight-current-row size="small"
                   row-key="id"
                   :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                   :default-expand-all="false">
          <el-table-column fixed prop="name" label="菜单名称" min-width="200">
            <template slot-scope="scope">
                    <svg-icon  v-if="scope.row.type === 'Directory'" icon-class="dir" style="width: 25px;height: 20px"/>
                    <svg-icon  v-if="scope.row.type === 'MENU'" icon-class="subDir" style="width: 16px;height: 17px"/>
                    <svg-icon  v-if="scope.row.type === 'BUTTON'" icon-class="file" style="width: 20px;height: 20px"/>
                  {{scope.row.name}}
            </template>
          </el-table-column>
          <el-table-column prop="code" label="菜单code" min-width="130"/>
          <el-table-column prop="url" label="菜单url" min-width="200"/>
          <el-table-column prop="urlMethod" label="请求方式" max-width="150" min-width="100"/>
          <el-table-column prop="description" label="简介" max-width="120"/>
          <el-table-column prop="type" label="菜单类型" min-width="80">
            <template slot-scope="scope">
                <el-tag v-if="scope.row.type === 'Directory'" effect="dark">目录</el-tag>
                <el-tag v-if="scope.row.type === 'MENU'" type="success">菜单</el-tag>
                <el-tag v-if="scope.row.type === 'BUTTON'" type="info">资源</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="isshow" label="是否显示" min-width="80">
              <template slot-scope="scope">
                  <el-switch v-model="scope.row.isshow" @change="changeIsEnabled(scope.row.id,scope.row.isshow)"/>
              </template>
          </el-table-column>
          <el-table-column prop="disabled" label="是否禁用" min-width="80">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.disabled" @change="changeIsEnabled(scope.row.id,scope.row.disabled)"/>
            </template>
          </el-table-column>
          <el-table-column prop="createdTime" label="创建时间" width="120"/>
          <el-table-column prop="createdBy" label="创建人" width="80"/>
          <el-table-column prop="updatedTime" label="更新时间" width="120"/>
          <el-table-column prop="updatedBy" label="更新人" width="80"/>
          <el-table-column fixed="right" label="操作" width="220">
            <template slot-scope="scope">
              <el-button  type="primary" size="mini" icon="el-icon-edit" @click="toUpdate(scope.row)"/>
              <el-button type="danger"  size="mini" icon="el-icon-delete"/>
            </template>
          </el-table-column>
        </el-table>
      </el-card>


      <!-- 3 - 修改对话框    -->
      <el-dialog :title="isSave ? '添加菜单' : '修改菜单'" :visible.sync="updateDialogVisible" width="50%">
        <el-form ref="form" size="mini" :model="updateDialogForm" label-width="100px">
          <el-form-item label="菜单名">
            <el-input v-model="updateDialogForm.name"/>
          </el-form-item>
          <el-form-item label="菜单code">
            <el-input v-model="updateDialogForm.code"/>
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="updateDialogForm.orderNum"/>
          </el-form-item>
          <el-form-item label="菜单图标">
            <el-input v-model="updateDialogForm.icon"/>
          </el-form-item>
          <el-form-item label="url">
            <el-input v-if="isSave"  v-model="updateDialogForm.url"/>
            <el-input v-else disabled v-model="updateDialogForm.url"/>
          </el-form-item>
          <el-form-item label="请求方式">
            <el-select v-model="updateDialogForm.urlMethod" placeholder="请选择">
                <el-option key="1" label="POST" value="POST"/>
                <el-option key="2" label="DELETE" value="DELETE"/>
                <el-option key="3"  label="GET" value="GET"/>
                <el-option key="4" label="PUT" value="PUT"/>
            </el-select>

          </el-form-item>
          <el-form-item label="菜单类型">
              <el-select v-model="updateDialogForm.type" size="small" style="width: 100px">
                  <el-option key="1" label="目录" value="Directory"/>
                  <el-option key="2" label="菜单" value="MENU"/>
                  <el-option key="3" label="资源" value="BUTTON"/>
              </el-select>
          </el-form-item>
          <el-form-item label="是否禁用:">
              <el-switch v-model="updateDialogForm.disabled">
              </el-switch>
          </el-form-item>
          <el-form-item label="是否显示:">
            <el-switch v-model="updateDialogForm.isshow">
            </el-switch>
          </el-form-item>
          <el-form-item label="所属目录菜单">
            <el-select v-model="updateDialogForm.parentId" size="small" style="width: 100px">
                <el-option v-for="(item,index) in parentMenuOptions" :key="index" :label="item.name"  :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="简介">
            <el-input type="textarea" v-model="updateDialogForm.description"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateMenu">提交</el-button>
            <el-button @click="updateDialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>


    </div>
</template>

<script>
    export default {
        name: "MenuManagement",
        data(){
          return{
            updateDialogVisible:false,
            isSave: false,
            updateDialogForm:{

            },
            parentMenuOptions:[],

            menuData:[]
          }
        },
        // ================================= Method ================================
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
            toAddMenu(){
                this.isSave = true;
                this.updateDialogForm = {};
                this.updateDialogVisible = true;
            },
            toUpdate(e){
              this.isSave = false;
              this.updateDialogVisible = true;
              this.updateDialogForm = e;
              this.$http.menu.getById(e.id).then(res => {
                    if (res.code === "200"){
                        this.updateDialogForm = res.data;
                    }
              }).catch(err => console.log(err));
            },
            intitParentOptions(){
                this.$http.menu.getParentMenu().then(res => {
                    this.parentMenuOptions = res.data;
                  this.parentMenuOptions.push({id:"-1",name:"顶级目录"});
                })
            },
            //
            updateMenu(){
                  console.log(JSON.stringify(this.updateDialogForm));
                  this.$http.menu.save(this.updateDialogForm).then(res => {
                    if (res.code === "200"){
                        this.$message.success("保存成功");
                        this.updateDialogVisible = false;
                        this.search();
                    }else {
                        this.$message.error("保存失败");
                    }
                  }).then(err => console.log(err));
            },

            changeIsEnabled(userId,value){
              console.log("改变锁定,改变用户: %s, 当前值为:%s",userId,value)
            },

            //
            recursiveExpandOrFold(rows,isExpand){
                for (let e of rows){
                    this.$refs.treeTable.toggleRowExpansion(e, isExpand)
                    if (e.children) {
                      this.recursiveExpandOrFold(e.children, isExpand)
                    }
                }
            },
            changeTableExpand(isExpand){
                this.recursiveExpandOrFold(this.menuData,isExpand);
            },
            search(){
                this.$http.menu.getAllMenuList().then(res => {
                      if (res.code === "200"){
                        this.menuData = res.data;
                      }
                }).catch(err => err);
            }

        },

        mounted() {
            this.search();
            this.intitParentOptions();
        }
    }
</script>

<style scoped>

</style>
