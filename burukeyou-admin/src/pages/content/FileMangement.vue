<template>
    <div>
       <!-- 1 -     -->
        <div class="bk-card" style="display: flex;justify-content: space-between">
          <div style="display: flex;;flex-wrap: wrap;flex: 1">
              <div>
                文件名: <el-input v-model="nicknameInput" size="small" placeholder="搜索文件名/文件类型" style="width: 150px"/>
              </div>

              <div style="margin-left: 10px">
                文件所属:
                <el-select v-model="fileTypeSelectValue" placeholder="请选择" size="small" style="width: 100px">
                  <el-option v-for="(e,index) in fileTypeOptions" :key="e.value" :label="e.label" :value="e.value">
                  </el-option>
                </el-select>
              </div>

              <div style="margin-left: 10px">
                文件存储源:
                <el-select v-model="fileSourceSelectValue" placeholder="请选择" size="small" style="width: 100px">
                  <el-option v-for="(e,index) in fileSourceOptions" :key="e.value" :label="e.label" :value="e.value">
                  </el-option>
                </el-select>
              </div>

              <div class="block" style="margin-top: 10px">
                  时间范围:
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
              <el-button type="primary" icon="el-icon-search" size="small" @click="search">查询</el-button>
              <el-button type="primary" icon="el-icon-download" size="small" >导出</el-button>
          </div>
        </div>

        <!--  2 -     -->
      <el-card class="box-card" style="margin-top: 10px">
        <el-table  :data="tableData" style="width: 100%" highlight-current-row size="small">
          <el-table-column fixed prop="parentType" label="所属类型" width="100"/>
          <el-table-column fixed prop="parentName" label="具体所属" width="100"/>
          <el-table-column prop="name" label="文件名" width="120"/>
          <el-table-column prop="createBy" label="所属用户" width="80"/>
          <el-table-column prop="contentType" label="文件类型" width="80"/>
          <el-table-column prop="size" label="文件大小" width="70"/>
          <el-table-column prop="url" label="url" width="120"/>
          <el-table-column prop="source" label="存储源" width="120"/>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
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
        name: "FileMangement",
        data(){
          return{
              // 分页
              currentPage: 1,
              currentSize: 10,
              totalCount: 30,
              fileTypeOptions:[
                  {value:'article',label:'文章'},
                  {value:'boiling',label:'沸点'},
                  {value:'userAvatar',label:'用户头像'},
                  {value:'topicAvatar',label:'话题头像'},
                  {value:'labelAvatar',label:'标签头像'},
                  {value:'favoritesBackground',label:'收藏背景'}
              ],
             fileTypeSelectValue:"",

              fileSourceOptions:[
                {value:'FastDFS',label:'FastDFS'},
                {value:'aliOSS',label:'阿里云OSS'},
                {value:'qiniuOSS',label:'七牛云OSS'},
              ],
             fileSourceSelectValue:"",

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
              timeTangeSelectValue:"",


              tableData:[]
          }
        },

        // ============================== Method =============================================
        methods:{
            search(){
                console.log(JSON.stringify(this.timeTangeSelectValue)); // ["2020-04-07T16:00:00.000Z","2020-05-11T16:00:00.000Z"]

            }
        }
    }
</script>

<style scoped>

</style>
