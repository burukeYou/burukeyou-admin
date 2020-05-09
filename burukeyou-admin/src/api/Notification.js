import request from '@/utils/request'

let baeUrl = "/notification"


const notification = {
  /**
   * 	 根据通知类型获取通知
   */
  publishNotification(args){
    return request({
      url: baeUrl + "/notification/publish",
      params:args,
      method:'POST',
      headers: {'content-type': 'application/x-www-form-urlencoded'}
    });
  },

    /**
     * 	 根据通知类型获取通知
     */
    getPageByType(args){
      return request({
        url: baeUrl + "/notification/page",
        params:args
      });
    }

}

export default notification
