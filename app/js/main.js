import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Router,Route,browserHistory,Hashhistory,Link,IndexRoute,Redirect} from "react-router"
import Style from "../css/style.less";
import $ from "jquery";
import "../plu/rem.js";
import App from "../component/app.js";
import More from "../component/more.js";
import Mine from "../component/mine.js";
import Shouye from "../component/shouye.js";
import Shopcar from "../component/shopcar.js";
import Fenlei from "../component/fenlei.js";


var doc=document.getElementById("box")
render((
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute path="/shouye" component={Shouye}/>
			<Route path="/more" component={More} />
			<Route path="/shouye" component={Shouye} />
			<Route path="/fenlei" component={Fenlei} />
			<Route path="/shopcar" component={Shopcar} />
			
			
			<Route path="/mine" component={Mine} />
				
		</Route>
	</Router>
),doc)



