import type { RouteMeta } from "vue-router"

export enum EPlatform {
  H5 = 'h5',
  PC = 'pc'
}

/**
 * @interface ICustomRouteMeta
 * @description 自定义路由元信息
 * @property {string} [navgationBarTitle] - 导航栏标题
 * @property {'default' | 'custom'} [navigationStyle] - 导航栏样式
 * @property {string} [navigationBarBackgroundColor] - 导航栏背景色
 * @property {'black' | 'white'} [navigationBarTextStyle] - 导航栏文字颜色
 * @property {boolean} [showArrow] - 是否显示箭头
 * @property {string} [icon] - 自定义图标
 * @property {boolean} [checkNetwork] - 是否检查网络
 * @property {boolean} [checkAuth] - 是否检查权限
 * @property {Function} [checkAuthFallback] - 权限检查失败的回调函数
 * @property {boolean} [cache] - 是否缓存页面
 * @property {Array<string>} [transitionName] - 页面切换动画
 * @see https://animate.style/
 * @property {boolean} [canPullDownRefresh] - 是否开启下拉刷新
 * @property {boolean} [canReachBottom] - 是否开启上拉加载
 * @property {Array<Function>} [invokes] - 注入方法
 * @property {boolean} [invokeWXSDK] - 是否调用微信SDK
 * @property {boolean} [invokeWWSDK] - 是否调用企业微信SDK
 */
export interface ICustomRouteMeta extends RouteMeta {
  plaftorm?: EPlatform,

  navgationBarTitle?: string,
  navigationStyle?: 'default' | 'custom',
  navigationBarBackgroundColor?: string,
  navigationBarTextStyle?: 'black' | 'white',
  showArrow?: boolean,
// ------

  icon?: string,

  checkNetwork?:boolean,

  checkAuth?:boolean,
  checkAuthFallback?: Function,

  cache?:boolean,

  transitionName?: Array<string>

  canPullDownRefresh?:boolean,
  canReachBottom?:boolean,

  invokes?: Array<Function>,

  invokeWXSDK?: boolean,
  invokeWWSDK?: boolean,
}
