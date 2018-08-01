import React, {Component} from 'react';
import "./App.css";

import Home from "./pages/Home";
import User from "./pages/User";
import Edit from"./pages/Edit";
import {BrowserRouter as Router,Route,Switch,} from "react-router-dom"; //Switch——>用于只渲染一个页面
import ConNav from "./containers/ConNav";
import ConLogin from "./containers/ConLogin";
import ConRegister from "./containers/ConRegister";
import Manage from "./pages/Manage";
import ConCart from "./containers/ConCart";
import ConProduct from "./containers/ConProduct";
import Female from "./pages/Female";
import Order from "./pages/Order";
import "whatwg-fetch";


class App extends Component {
  render() {
    return (
      //包在整个组件的最外面，用于给内部组件注入相关属性
      // <BrowserRouter> 
      <Router>
	      <div className="App">
	         <ConNav/>
       	  	 <Switch>
	            <Route exact path="/" component={Home}/>
              <Route path="/login" component={ConLogin}/>      
      	      <Route path="/register" component={ConRegister}/>
              <Route path="/manage" component={Manage}/>
              <Route path="/product/:id" component={ConProduct}/>
              <Route path="/female" component={Female} />
              <Route path="/order" component={Order} />
              <Route path="/edit" component={Edit} />
              <Route path="/user" component={User} />
             </Switch>
	      </div>
      </Router>
     	// </BrowserRouter>
    );
  }
}

export default App;