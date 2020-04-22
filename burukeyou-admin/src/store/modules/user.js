import http from '@/api/index'


import { getToken, setToken, removeToken,setWithExpireHours,getCookie } from '@/utils/auth'
import { resetRouter } from '@/router'
import store from "@/store";

/**
 *    Vuex 的state, Aciton, mutations,getters 关系
 *
 *                dispatch(分发)                 commit                         改变
 *   组件(指令) --------------------> action ---------------------> mutations ------------> state (状态)
 *                                                                                          |
 *                                                                                          |
 *                                                                                          v
 *                                                                                        getters 方法获得state
 *                                                                         调用方式比如： （store.getters.token）
 *
 *
 *
 *    action 和 mutations 区别：
 *          mutation 必须同步执行
 *          action 可在内部执行异步操作：比如
                   actions: {
                        incrementAsync ({ commit }) {
                          setTimeout(() => {
                            commit('increment')
                          }, 1000)
                       }
                    }
 */
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: 'https://avatar.csdnimg.cn/9/B/5/1_weixin_41347419.jpg'
  }
}
// ==================================== state ========================

const state = getDefaultState()


// ==================================== mutations ==========this.$store.commit('SET_TOKEN',token);==============

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

// ==================================== Aciton ===========this.$store.dispatch('login');=====================
const actions = {
  //  用户登陆
  login({ commit }, userInfo) {
    console.log(JSON.stringify(userInfo));
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      console.log("a");
          // 异步请求
          http.user.login({ username: username.trim(), password: password }).then(response => {
            const { data } = response
            console.log("登陆成功 cookies token:" + data.access_token);
            commit('SET_TOKEN', data.access_token)  // 保存到vuex
            commit('SET_NAME',data.nickname)  // 保存到vuex
            commit('SET_AVATAR', data.avatar)  // 保存到vuex

            setWithExpireHours("userInfo",{username:data.nickname,avatar:data.avatar},2);
            setToken(data.access_token)  // 保存到cookies

            //console.log("c");
            resolve('SB');  // 异步执行成功回调then方法
            //console.log("d");
          }).catch(error => {
            reject(error) // 异步执行失败cathch方法， 即 catch
          });
      //console.log("b");
    })
  },

  // get user info
  getInfo({ commit, state }) {
    let userInfo = getCookie("userInfo");
    if (userInfo) {
      console.log(JSON.stringify(userInfo));
      commit('SET_NAME', userInfo.username)
      commit('SET_AVATAR', userInfo.avatar)
      console.log(state.name);
    }


   /* return new Promise((resolve, reject) => {
      http.user.getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })*/
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
      /*http.user.logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })*/
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

