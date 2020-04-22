import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/**
 * //当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 hidden: true // (默认 false)

 //当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 redirect: 'noRedirect'

 //当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 //只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 //若你想不管路由下面的 children 声明的个数都显示你的根路由
 //你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 alwaysShow: true

 name: 'router-name' //设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 meta: {
  roles: ['admin', 'editor'] //设置该路由进入的权限，支持多个权限叠加
  title: 'title' //设置该路由在侧边栏和面包屑中展示的名字
  icon: 'svg-name' //设置该路由的图标
  noCache: true //如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
  breadcrumb: false // 如果设置为false，则不会在breadcrumb面包屑中显示
}
 */


import Layout from '@/layout'

// constantRoutes： 代表那些不需要动态判断权限的路由，如登录页、404、等通用页面。
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/pages/Home'),
      meta: { title: '主页', icon: 'home' }
    }]
  },
  // =========================权限管理===============================================

  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/userManagement',
    name: 'permission',
    meta: {
      title: '权限管理',
      icon: 'permission'
    },
    children:[
      {
        path: '/permission/userManagement',
        name: 'UserManagement',
        component: () => import('@/pages/permission/UserManagement.vue'),
        meta: { title: '用户管理', icon: 'user' }
      },
      {
        path: 'roleManagement',
        name: 'RoleManagement',
        component: () => import('@/pages/permission/RoleManagement'),
        meta: { title: '角色管理', icon: 'role' }
      },
      {
        path: 'menuManagement',
        name: 'MenuManagement',
        component: () => import('@/pages/permission/MenuManagement.vue'),
        meta: { title: '菜单管理', icon: 'menu' }
      }
    ]
  },

  // =========================内容管理===============================================
  {
    path: '/content',
    component: Layout,
    redirect: '/content/api',
    name: 'content',
    meta: {
      title: '内容管理',
      icon: 'content'
    },
    children:[
      {
        path: 'api',
        name: 'ApiMangement',
        component: () => import('@/pages/content/ApiMangement'),
        meta: { title: 'API文档', icon: '' }
      },
      {
        path: 'file',
        name: 'FileMangement',
        component: () => import('@/pages/content/FileMangement'),
        meta: { title: '文件中心', icon: '' }
      },
      {
        path: 'news',
        name: 'NewsMangement',
        component: () => import('@/pages/content/NewsMangement'),
        meta: { title: '新闻轮播', icon: '' }
      },
      {
        path: 'notification',
        name: 'NotificationMangement',
        component: () => import('@/pages/content/NotificationMangement'),
        meta: { title: '系统通知', icon: '' }
      },
      {
        path: 'userfeedback',
        name: 'Userfeedback',
        component: () => import('@/pages/content/Userfeedback'),
        meta: { title: '用户反馈', icon: '' }
      },
      {
        path: 'blackReport',
        name: 'BlackReport',
        component: () => import('@/pages/content/BlackReport'),
        meta: { title: '用户举报', icon: '' }
      },
      {
        path: 'article',
        name: 'ArticleMangement',
        component: () => import('@/pages/content/ArticleMangement'),
        meta: { title: '文章审核', icon: '' }
      },
      {
        path: 'videoMangement',
        name: 'VideoMangement',
        component: () => import('@/pages/content/VideoMangement'),
        meta: { title: '视频管理', icon: '' }
      },
      {
        path: 'channel',
        name: 'ChannelMangement',
        component: () => import('@/pages/content/ChannelMangement'),
        meta: { title: '系统频道', icon: '' }
      },
      {
        path: 'topic',
        name: 'TopicMangement',
        component: () => import('@/pages/content/TopicMangement'),
        meta: { title: '话题管理', icon: '' }
      },
      {
        path: 'label',
        name: 'LableMangement',
        component: () => import('@/pages/content/LableMangement'),
        meta: { title: '标签管理', icon: '' }
      }
    ]
  },

  // ========================= 数据分析===============================================
  {
    path: '/dataAnalysis ',
    component: Layout,
    redirect: '/dataAnalysis/dataAnalysis',
    name: 'dataAnalysis ',
    meta: {
      title: '数据分析',
      icon: 'data'
    }
  },
  // =========================系统监控===============================================
  {
    path: '/monitor',
    component: Layout,
    redirect: '/monitor/serviceMonitor',
    name: 'monitor',
    meta: {
      title: '系统监控',
      icon: 'content'
    },
    children:[
      {
        path: 'serviceMonitor',
        name: 'ServiceMonitor',
        component: () => import('@/pages/monitor/ServiceMonitor'),
        meta: { title: '服务监控', icon: 'link' }
      },
      {
        path: 'flowMonitor',
        name: 'FlowMonitor',
        component: () => import('@/pages/monitor/FlowMonitor'),
        meta: { title: '流量监控', icon: '' }
      },
      {
        path: 'stateMonitor',
        name: 'StateMonitor',
        component: () => import('@/pages/monitor/StateMonitor.vue'),
        meta: { title: '状态监控', icon: '' }
      },
      {
        path: 'auditLogMonitor',
        name: 'AuditLogMonitor',
        component: () => import('@/pages/monitor/AuditLogMonitor'),
        meta: { title: '审计日志', icon: '' }
      },
      {
        path: 'sysytemLogMonitor',
        name: 'SysytemLogMonitor',
        component: () => import('@/pages/monitor/SysytemLogMonitor'),
        meta: { title: '系统日志', icon: '' },
        hidden:true
      }
    ]
  },
  // =========================系统设置===============================================
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/systemSetting',
    name: 'setting',
    meta: {
      title: '系统设置',
      icon: 'monitor'
    },
    children:[
      {
        path: 'systemSetting',
        name: 'SystemSetting',
        component: () => import('@/pages/setting/SystemSetting'),
        meta: { title: '系统设置', icon: '' }
      }
    ]
  },



  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]





// =======================================================================================
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
