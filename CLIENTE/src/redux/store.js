import { configureStore } from '@reduxjs/toolkit'
import  data  from './slice'
export const store = configureStore({
  reducer: {
    data 
  },
})