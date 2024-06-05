import type { FileMessage, MiniprogramMessage, NewsMessage, RegisterOptions, SendChatMessageImageMessage, SignatureData, TextMessage, VideoMessage } from '@wecom/jssdk';
import * as ww from '@wecom/jssdk';



export const registerWecom = ({
  corpId,
  agentId,
  timestamp,
  nonceStr,
  signature,
  jsApiList = [],
}: RegisterOptions & SignatureData) =>
  new Promise(async (resolve, reject) => {
    ww.register({
      corpId, // 必填，当前用户企业所属企业ID
      agentId, // 必填，当前应用的AgentID
      jsApiList, // 必填，需要使用的JSAPI列表
      getConfigSignature, // 必填，根据url生成企业签名的回调函数
      getAgentConfigSignature, // 必填，根据url生成应用签名的回调函数
      onAgentConfigSuccess: res => resolve(res),
      onAgentConfigFail: err => reject(err),
    });

    async function getConfigSignature() {
      // 根据 url 生成企业签名
      // 生成方法参考 https://open.work.weixin.qq.com/api/doc/90001/90144/93197
      return { timestamp, nonceStr, signature };
    }

    async function getAgentConfigSignature() {
      // 根据 url 生成应用签名，生成方法同上，但需要使用应用的 jsapi_ticket
      return { timestamp, nonceStr, signature };
    }
  });


export enum EMessageType {
  text = 'text',
  image = 'image',
  video = 'video',
  miniprogram = 'miniprogram',
  file = 'file',
  news = 'news',
}


type TRestMessage = Pick<TextMessage, 'text'> | Pick<SendChatMessageImageMessage, 'image'> |
  Pick<VideoMessage, 'video'> | Pick<FileMessage, 'file'> | Pick<NewsMessage, 'news'> |
  Pick<MiniprogramMessage, 'miniprogram'>

export const sendChatMessage = ({
  msgtype,
  ...rest
}: { msgtype: EMessageType } & TRestMessage) => new Promise((resolve, reject) => {


  // @ts-ignore
  ww.sendChatMessage({
    enterChat: true,
    msgtype,
    [msgtype]: {
      ...rest
    },
    success: resolve,
    fail: reject,
  })

})


export const getExternalUserId = () => new Promise(async (resolve, reject) => {
    try {
      const res = await ww.getCurExternalContact()
      resolve(res.userId || '')
    } catch (error) {
      reject(error)
    }

})



/**
 * 初始化企微
 * 1. 根据code去调接口获取agentConfig/token/当前用户之类的信息
 * 2. 注册企微
 * 3. 调用企微接口
 */
const initialWecom = () => {

}
