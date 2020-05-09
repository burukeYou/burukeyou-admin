import request from '@/utils/request'

let baseUrl = '/article';

const article = {
  getPageByCondition(condition) {
    return request({
      url: baseUrl+'/article/mini/page',
      method:'GET',
      params:condition
    });
  },

  updateState(args){
    return request({
      url: baseUrl+'/article/'+args.id+'/'+args.state,
      method:'PUT'
    });
  }

};


export default article;
