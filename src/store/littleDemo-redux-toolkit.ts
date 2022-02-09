import { configureStore,createSlice } from '@reduxjs/toolkit'
import { projectListSlice } from 'screens/projectList/ProjectListSlice'
const initialState = {
    date: 2
}
const slice = createSlice({
    name: 'clice',
    initialState,
    reducers: {
        increase(state){
            state.date ++
        },
        decrease(state) {
            state.date --
        }
    }
})

const reducer = {
    s : slice.reducer,
    project: projectListSlice.reducer
}
const stores = configureStore({
    reducer: reducer
})
const action = slice.actions
const select = (state:(typeof initialState)) => state