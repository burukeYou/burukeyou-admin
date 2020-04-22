import request from '@/utils/request'

let baseUrl = '/admin'

const role = {
  /**
   *  获取所有角色列表
   * @returns {AxiosPromise}
   */
  getAll(){
    return request({
      url: baseUrl+'/role/all',
      method: 'get',
    });
  },

  /**
   *  分页查询角色列表
   */
  getPage(param){
    return request({
      url: baseUrl+'/role/page',
      method:'Get',
      params: param
    });
  },

  /**
   *    新增或者修改角色
   */
  save(data){
    return request({
      url: baseUrl+'/role',
      method:'POST',
      data
    });
  },

  /**
   *  删除角色
   * @returns {AxiosPromise}
   */
  deleteById(id){
      return request({
        url: baseUrl+'/role/'+id,
        method:'Delete',
      });
  },

  /**
   *   查看角色详情
   */
  getById(id){
    return request({
      url: baseUrl+'/role/'+id,
      method:'GET'
    });
  }



}

export default role
