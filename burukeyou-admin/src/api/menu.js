import request from '@/utils/request'

let baeUrl = '/admin'
const menu = {
  /**
   *  根据角色id获取权限树和全部权限
   * @param roleId
   * @returns {AxiosPromise}
   */
    getAllMenu: function (roleId) {
      return request({
        url: baeUrl+'/permission/'+roleId+'/tree',
        method: 'get'
      })
    },

  /**
   *  给角色分配菜单
   * @param roleId
   * @param data
   * @returns {AxiosPromise}
   */
  assignPermissions(roleId,data){
      return request({
        url: baeUrl+'/permission/'+roleId,
        method:'POST',
        data
      });
  },

  /**
   *   获得所有权限
   */
  getAllMenuList(){
    return request({
        url: baeUrl+'/permission/all',
        method: 'get'
    });
  },

  /**
   *  获得所有可选菜单目录
   * @returns {AxiosPromise}
   */
  getParentMenu(){
    return request({
      url: baeUrl+'/permission/parentMenu',
      method: 'get'
    });
  },

  /**
   *  获得菜单详情
   * @param id
   * @returns {AxiosPromise}
   */
  getById(id) {
    return request({
      url: baeUrl+'/permission/'+id,
      method:'Get'
    });
  },

  /**
   *  保存或者修改菜单
   * @param data
   * @returns {AxiosPromise}
   */
  save(data){
    return request({
        url: baeUrl+'/permission',
        method:'POST',
        data
    });
  },



}

export default menu
