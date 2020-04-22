import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


//默认过期时间是打开到关闭浏览器
export function getCookie(key) {
  return Cookies.get(key)
}

export function setCookie(key,value) {
  return Cookies.set(key, value)
}

export function setWithExpireDays(key,value,expireDays) {
  return Cookies.set(key, value,{ expires:  expireDays}); //
}

export function setWithExpireHours(key,value,expireDays) {
  return Cookies.set(key, value,{ expires:  expireDays/24}); //
}


export function setWithExpireMinutes(key,value,expireDays) {
  return Cookies.set(key, value,{ expires:  expireDays/24/60}); //
}

