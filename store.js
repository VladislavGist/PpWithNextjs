import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer } from 'redux-form'
import { composeWithDevTools } from 'redux-devtools-extension'

import auth from './ducks/auth'
import preloader from './ducks/preloader'
import filterCity from './ducks/filterCity'
import menuReducer from './ducks/menuReducer'
import accountType from './ducks/accountType'
import allParamsUrl from './ducks/allParamsUrl'
import articles from './ducks/articles'
import photosReducer from './ducks/photosReducer'
import snackbarReducer from './ducks/snackbarReducer'
import toggleAddMoreBtn from './ducks/toggleAddMoreBtn'
import contactFormStatus from './ducks/contactFormStatus'

const reducers = combineReducers({
    routing: routerReducer,
	form: reducer,
    articles,
    auth,
    preloader,
    filterCity,
    menuReducer,
    accountType,
    allParamsUrl,
    photosReducer,
    snackbarReducer,
    toggleAddMoreBtn,
    contactFormStatus,
})

const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(thunk))(createStore)
const makeStore = initialState => createStoreWithMiddleware(reducers, initialState)

export default makeStore