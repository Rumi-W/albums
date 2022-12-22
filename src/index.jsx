import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import reducers from './store/reducers'
import App from './App'
import reportWebVitals from './reportWebVitals'

import './index.css'

const composeEnhancers =
    process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter basename="/albums/">
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
