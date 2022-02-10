import { configureStore,createSlice } from '@reduxjs/toolkit'
import { projectListSlice } from 'screens/projectList/ProjectListSlice'
import { authSlice } from './AuthSlice'
export const rootReducer = {
    projectList: projectListSlice.reducer,
    auth: authSlice.reducer,
}

export const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>