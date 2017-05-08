import React, {Component} from 'react';
import {Link} from "react-router"

class App extends Component {
	render(){
		return (
			<div className="app">
				
					{this.props.children}
				
				<ul>
					<li><Link to="/shouye" activeClassName="danger"><i className="iconfont">&#xe634;</i><span>首页</span></Link></li>
					<li><Link to="/fenlei" activeClassName="danger"><i className="iconfont">&#xe60d;</i><span>分类</span></Link></li>
					<li><Link to="/shopcar" activeClassName="danger"><i className="iconfont">&#xe600;</i><span>购物车</span></Link></li>
					<li><Link to="/mine" activeClassName="danger"><i className="iconfont">&#xe601;</i><span>我的秀</span></Link></li>
					<li><Link to="/more" activeClassName="danger"><i className="iconfont">&#xe602;</i><span>更多</span></Link></li>
				</ul>
			</div>
		)
	}
}
export default App;