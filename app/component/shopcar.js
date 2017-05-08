import React,{Component} from "react";
import $ from "jquery"
var Shopcar=React.createClass({
	getInitialState:function(){
		return {
			items:[],
			zongshu:0,
			zongjia:0
		}
	},
	//点击删除事件  
	handleClick:function(e){
		var aaa=e.target.getAttribute("data-number");
		var id=e.target.getAttribute("data-id");
		if(e.target.value=="+"){
			aaa++
		}else if(e.target.value=="-"){
			
			if(aaa==0){
				aaa=0
			}else{
				aaa--
			}
		}else{
			aaa=0
		}
		$.ajax({
			url: "http://datainfo.duapp.com/shopdata/updatecar.php",
            dataType: "jsonp",
            data: {
                userID: localStorage.getItem("name"),
                goodsID:id,
                number:aaa
            },
            error:function(){
            	$.ajax({
					url: "http://datainfo.duapp.com/shopdata/getCar.php",
		            dataType: "jsonp",
		            data: {
		                userID: localStorage.getItem("name")
		            },
		            success:function(data){
		            	console.log(data[0].number)
		            	var arrZ=[];
		            	var arrD=[];
		            	var zongshu=0;
		            	var zongjia=0;
		            	for(var i=0;i<data.length;i++){
		            		arrZ.push(parseInt(data[i].number))
		            		arrD.push(parseInt(data[i].price))
		            	}
		            	// 计算总数量
		            	for(var i=0;i<arrZ.length;i++){
		            		zongshu+=arrZ[i]
		            		zongjia+=arrZ[i]*arrD[i]
		            	}
		            	this.setState({
		            		zongshu:zongshu,
		            		zongjia:zongjia,
		            		items:data
		            	})
		            }.bind(this)
				})
            }.bind(this),
            success:function(){
            	alert(2)
            	
            }.bind(this)
		})
	},
	render:function(){
		return (
			<div className="shopcar">
				<header>
					<p>购物车</p>
					<a href="script:;">去结算</a>
				</header>
				<div className="jishu">
					商品数量：<span className="shuliang">{this.state.zongshu}</span> 应付总额(不含运费)：<span className="zonge">{this.state.zongjia}</span>
				</div>
				<div className="shopCarMain">
					{
						this.state.items.map(function(value,index){
							return <dl key={index}>
										<dt><img src={value.goodsListImg} alt="" />
										</dt>
										<dd>
											<h2>
												{value.goodsName}
											</h2>
											<h3>
												{value.className}
											</h3>
											<h4>单价：
												<span>￥{value.price} </span>
											</h4>
											<h5>
												<span>数量：</span>
												<input type="button" className="jia" value="+" onClick={this.handleClick} data-id={value.goodsID} data-number={value.number} />
												<input type="text" className="txt" value={value.number} />
												<input type="button" className="jian" value="-" onClick={this.handleClick} data-id={value.goodsID} data-number={value.number} />
											</h5>
											<p onClick={this.handleClick} data-id={value.goodsID}>
												<i className="iconfont" data-id={value.goodsID}>&#xe6a7;</i>
											</p>
										</dd>
									</dl>
						}.bind(this))
					}
				</div>
			</div>
		)
	},
	componentDidMount:function(){
		//请求  购物车数据
		$.ajax({
			url: "http://datainfo.duapp.com/shopdata/getCar.php",
            dataType: "jsonp",
            data: {
                userID: localStorage.getItem("name")
            },
            success:function(data){
            	//console.log(data[0].number)
            	var arrZ=[];
            	var arrD=[];
            	var zongshu=0;
            	var zongjia=0;
            	for(var i=0;i<data.length;i++){
            		arrZ.push(parseInt(data[i].number))
            		arrD.push(parseInt(data[i].price))
            	}
            	// 计算总数量
            	for(var i=0;i<arrZ.length;i++){
            		zongshu+=arrZ[i]
            		zongjia+=arrZ[i]*arrD[i]
            	}
            	this.setState({
            		zongshu:zongshu,
            		zongjia:zongjia,
            		items:data
            	})
            }.bind(this)
		})
	}
})
export default Shopcar