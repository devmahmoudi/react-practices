import {configureStore} from "@reduxjs/toolkit"

// action
const aciton01 = { 'type': 'counter/increment', 'payload': 1 }

// action creator
export const increment = (payload = 1) => {
    return { 'type': 'counter/increment', 'payload': payload }
}

// initial state
const initialState = {value : 0}

// reducer
const reducer = (state = initialState, action) => {
    const stateCopy = {...state}

    if(action.type === "counter/increment")
        stateCopy.value += action.payload

    return stateCopy
}

// store
export const store = configureStore({reducer: reducer})

// selector
const counterValueSelector = (state) => state.value

// current state value
export const counterValue = counterValueSelector(store.getState())