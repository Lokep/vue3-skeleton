import type { DirectiveBinding, VNode } from "vue"

const longpress = {
  bind: function (el: HTMLElement, binding: DirectiveBinding, vNode: VNode) {
    if (typeof binding.value !== 'function') {
      throw 'callback must be a function'
    }
    // 定义变量
    let pressTimer: ReturnType<typeof setTimeout> | null = null
    // 创建计时器（ 2秒后执行函数 ）
    let start = (e: MouseEvent | TouchEvent) => {
      if (e.type === 'click' && 'button' in e && e.button !== 0) {
        return
      }
      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          handler()
        }, 2000)
      }
    }
    // 取消计时器
    let cancel = () => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null
      }
    }
    // 运行函数
    const handler = (e: MouseEvent | void) => {
      binding.value(e)
    }
    // 添加事件监听器
    el.addEventListener('mousedown', start)
    el.addEventListener('touchstart', start)
    // 取消计时器
    el.addEventListener('click', cancel)
    el.addEventListener('mouseout', cancel)
    el.addEventListener('touchend', cancel)
    el.addEventListener('touchcancel', cancel)
  },
  // 当传进来的值更新的时候触发
  componentUpdated(el: HTMLElement, { value }: DirectiveBinding) {
    // @ts-ignore
    el.$value = value
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind(el: HTMLElement) {
    // @ts-ignore
    el.removeEventListener('click', el.handler)
  },
}

export default longpress
