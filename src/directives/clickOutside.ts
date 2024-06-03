import type { DirectiveBinding } from "vue";

const clickOut = {
  bind(el: HTMLElement, { value }: DirectiveBinding) {

    function clickHandler(e: MouseEvent) {
      //先判断点击的元素是否是本身，如果是本身，则返回
      // @ts-ignore
      if (el.contains(e.target)) return;
      //判断指令中是否绑定了函数
      if (typeof value === 'function') {
        //如果绑定了函数，则调用函数，此处value就是clickImgOut方法
        value()
      }
    }

    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    // @ts-ignore
    el.handler = clickHandler;
    //添加事件监听
    setTimeout(() => {
      // @ts-ignore
      document.addEventListener('click', el.handler);
    }, 0);
  },
  unbind(el: HTMLElement) {
    //解除事件监听
    // @ts-ignore
    document.removeEventListener('click', el.handler);
  }
}

export default clickOut

