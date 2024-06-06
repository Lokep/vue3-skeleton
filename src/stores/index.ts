import { defineStore } from 'pinia'

/**
 * @see https://prazdevs.github.io/pinia-plugin-persistedstate/zh/
 */
export const useLetterStore = defineStore('letter', {
  persist: {
    storage: localStorage,
    key:  'persist-letter',
    // paths: []
  },

  state: () => ({

  }),

  actions: {

  }
})
