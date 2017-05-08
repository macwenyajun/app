import React,{Component} from "react"
import { browserHistory } from 'react-router';
import Login from "./login"
import Zhuce from "./zhuce"

var Mine=React.createClass({
	getInitialState:function(){
		return {
			login:true
		}
	},
	swi:function(state){
		this.setState({
			login:state
		})
	},
	render:function(){
		var loginButton;
		if (this.state.login) {
		  loginButton = <Login swi={this.swi}/>;
		} else {
		  loginButton = <Zhuce swi={this.swi} />;
		}
		return (
			<div className="mine">
				
					{loginButton}
				
			</div>
		)
	}
})

export default Mine