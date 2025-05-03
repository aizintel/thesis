// store/index.ts

import { createPinia } from 'pinia'
import { useAuthStore } from './auth/useAuthStore'
import { useUserStore } from './user/useUserStore'

const pinia = createPinia()

export default pinia

export { useAuthStore, useUserStore }
