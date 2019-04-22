import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import articles from './ducks/articles'

const reducer = (state = {foo: ''}, action) => {
    switch (action.type) {
        case 'FOO':
            return {...state, foo: action.payload};
        default:
            return state
    }
}

const reducers = combineReducers({
    reducer,
    articles
})

const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(thunk))(createStore)
const makeStore = initialState => createStoreWithMiddleware(reducers, initialState)

export default makeStore