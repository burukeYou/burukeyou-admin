import request from '@/utils/request'

let baseUrl = '/system'

const channel  = {
  /**
   *  分页多条件获取话题
   * @param condition
   * @returns {AxiosPromise}
   */
  getPageByCondition(condition){
    return request({
      url: baseUrl+'/channel/page',
      method:'GET',
      params:condition
    });
  },

  /**
   *    增加话题
   *     // headers:{
        //   'Content-Type': 'multipart/form-data'
        // }
   */
  save(data){
      return request({
        url: baseUrl+'/channel',
        method:'POST',
        data:data
      });
  },

  /**
   *  删除
   * @param id
   * @returns {AxiosPromise}
   */
  deleteById(id){
    return request({
      url: baseUrl+'/channel/'+id,
      method:'Delete',
    });
  }


};


export default channel;
