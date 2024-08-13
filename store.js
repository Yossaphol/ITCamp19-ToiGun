import { configureStore } from '@reduxjs/toolkit'
import AppSlice from './reducer/AppSlice'

export default configureStore({
  reducer: {
    App : AppSlice
  },
})