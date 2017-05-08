import React,{Component} from "react"
import { browserHistory } from 'react-router';
import $ from "jquery"
//文本框默认选中
$(document).ready(function(){
	$(".txt").focus().select();
})




var Login=React.createClass({
	contextTypes: {
	    router: React.PropTypes.object
	},
	getInitialState:function(){
		return {
			items:{}
		}
	},
	componentWillMount:function(){
		var user = localStorage.getItem("name");
		var pwd = localStorage.getItem("pwd");
		if(pwd===null){
			pwd=""
		}
		if(user===null){
			user=""
		}
		this.setState({
			items:{
				name:user,
				password:pwd
			}
		})
	},
	//改变输入框内容
	handleChange:function(){
		var user=this.refs.user.value;
		var pwd=this.refs.pwd.value;
		this.setState({
			items:{
				name:user,
				password:pwd
			}
		})
	},
	//点击登录按钮
	handleClick:function(){
		var user=this.refs.user.value;
		var pwd=this.refs.pwd.value;
		//   返回0：用户名不存在  返回对象：成功  2密码不正确
		$.ajax({
			url: "http://datainfo.duapp.com/shopdata/userinfo.php",
			data: {
				status: "login",
				userID: user,
				password: pwd
			},
			success: function(data) {
				if(data!=0&data!=2){
					localStorage.setItem("name", user)
					if(this.refs.chd.checked){
						localStorage.setItem("pwd", pwd)
					}
					//   成功跳转到首页
					this.context.router.push("/shouye")
				}else if(data==0){
					$(".txt").val("用户名不存在").css("color","red")
				}else if(data==2){
					$(".txt").val("密码不正确").css("color","red")
				}
			}.bind(this)
						
		});
	},
	swiReg:function(){
		this.props.swi(false)
	},
	render:function(){
		return (
			<div className="mine">
				<header>
					<i className="iconfont">&#xe634;</i>
					<p>登录</p>
					<a onClick={this.swiReg}>注册</a>
				</header>
				<div className="main">
					<input type="text"  onChange={this.handleChange} className="txt" placeholder="用户名" value={this.state.items.name} ref="user" />
					<input type="password" className="pwd" placeholder="密码" value={this.state.items.password}ref="pwd" onChange={this.handleChange} />
					<div className="jizhu">
						<input type="checkbox" ref="chd" />记住密码 <span>忘记密码？</span>
					</div>
					<input type="button" className="btn" value="登录" onClick={this.handleClick} />
				</div>
			</div>
		)
	}
})

export default Login