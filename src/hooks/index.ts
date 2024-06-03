import { reactive, type UnwrapNestedRefs } from "vue"

export const useReactive = <T extends object>(initialValue:T ) => {
  const state = reactive(initialValue)

  const setState = (newState: Record<keyof UnwrapNestedRefs<T>, any>) => {
    for (const key in newState) {
      if (newState.hasOwnProperty(key)) {
        state[key] = newState[key]
      }
    }
  }

  return [state, setState]
}
