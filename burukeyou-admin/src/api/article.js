import request from '@/utils/request'

let baseUrl = '/article';

const article = {
  getPageByCondition(condition) {
    return request({
      url: baseUrl+'/topic/page',
      method:'GET',
      params:condition
    });
  }

};


export default article;
