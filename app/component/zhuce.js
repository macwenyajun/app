import React,{Component} from "react"
import { browserHistory } from 'react-router';

var Zhuce=React.createClass({
	swiLogin:function(){
		this.props.swi(true)
	},
	render:function(){
		return (
			<div>
				<button onClick={this.swiLogin}>点击</button>
			</div>
		)
	}
})

export default Zhuce