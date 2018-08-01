import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {createStore,applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {createLogger} from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise";
import rootReducer from "./reducers";

const middle=[thunk,promise];
if(process.env.NODE_ENV === "development"){
	const logger=createLogger();
	middle.push(logger);
}

console.log(middle);

const store=createStore(
	rootReducer,
	applyMiddleware(...middle),
);

ReactDOM.render( 
	//Provider组件，可以让容器组件拿到state
	<Provider store={store}>  
		<App />
	</Provider>, 
	document.getElementById('root')
);

registerServiceWorker();
