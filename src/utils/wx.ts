import wx from 'weixin-js-sdk'
import qs from 'qs'
import { showToast } from 'vant';

export const go = (url: string, query = {}, callback = () => {}) => {
  console.log('[url]: ', `${url}?${qs.stringify(query)}`)

  if (!wx) {
    showToast("当前方法需要在微信小程序webview环境下使用");
  }

  wx.miniProgram.navigateTo({
    url: `${url}?${qs.stringify(query)}`,
    success: callback,
  });
};
