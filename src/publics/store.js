import {createStore, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import Rpm from 'redux-promise-middleware'

import reducer from './reducers/index'

const logger = createLogger()

const store = createStore(
    reducer,
    applyMiddleware(logger, Rpm)
)

export default store