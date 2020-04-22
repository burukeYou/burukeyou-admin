import request from '@/utils/request'

let baseurl = '/admin'

/**
 *  返回的是promise
 * @param data
 * @returns {AxiosPromise}
 */
const user = {
  login(data) {
    return request({
      url: baseurl+'/admin/login',
      method: 'post',
      data
    })
  },

  logout() {
    return request({
      url: '/vue-admin-template/user/logout',
      method: 'post'
    })
  },

  getAll(condition){
    return request({
      url: baseurl+"/admin",
      method:'get',
      params: condition
    })
  },

  addUser(data){
    return request({
      url: baseurl+'/admin',
      method:'POST',
      data
    });
  },

  getOneById(id){
    return request({
        url: baseurl+'/admin/'+id,
        method:'Get',
    });
  },

  deleteById(id){
    return request({
      url: baseurl+'/admin/'+id,
      method:'Delete',
    });
  }


}

export default user


