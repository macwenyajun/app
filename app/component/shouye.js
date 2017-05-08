import React,{Component} from "react";
import '../plu/swiper-3.4.2.min.js';
import $ from 'jquery'




var Shouye=React.createClass({
	contextTypes: {
    router: React.PropTypes.object
  },
	getInitialState:function(){
		return {
			bannerItems:[],
			listItems:[],
		}
	},
	//点击h5  判断是否登录  已经登录就  跳转到购物车页面    并且更新购物车内容   如果没有就提示登录  点击确定跳转到登录页面
	tiaoG:function(e){
			//获取ID
			var id=e.target.getAttribute("data-id");
			//   判断本地是否有user   是否已经登录
			if(localStorage.getItem("name")){
				 $.ajax({
		        url: "http://datainfo.duapp.com/shopdata/updatecar.php",
		        data: {
		            userID: localStorage.getItem("name"),
		            goodsID: id
		        },
		        success: function(a) {
		           console.log("加入成功")
		        }
		    })
			}else{
				alert("请先登录")
				this.context.router.push("/mine")
			}
	},
	render:function(){
		return (
			<div className="shouYe">
				<link rel="stylesheet" href="https://cdn.bootcss.com/Swiper/3.4.2/css/swiper.min.css" />
				<header>走秀网</header>
				<div className="sousuo">
					<input type="text" placeholder="请输入类别" />
				</div>
				<div className="banner">
					<div className="swiper-container">
				    <div className="swiper-wrapper">
				    	{
				    		this.state.bannerItems.map(function(value,index){
				    			return <div className="swiper-slide" key={index}><img src={value} /></div>
				    		})
				    	}
				    </div>
					</div>
				</div>
				<div className="list">	
					{
						this.state.listItems.map(function(value,index){
							return <dl key={index}>
												<dt>
													<img src={value.goodsListImg} alt="" />
												</dt>
												<dd>
													<p>{value.goodsName}</p>
													<h3>
														{value.price}
														<span>200</span>
													</h3>
													<h4>0折</h4>
												</dd>
												<h5 onClick={this.tiaoG} data-id={value.goodsID}>
													<i className="iconfont" data-id={value.goodsID}>&#xe600;</i>
												</h5>
											</dl>
						}.bind(this))
					}
						
				</div>
			</div>
		)
	},
	componentDidMount:function(){
		//banner 图数据
		$.ajax({
			url:"http://datainfo.duapp.com/shopdata/getBanner.php?callback=callback",
			dataType:"jsonp",
			success:function(data){
				var arr=[];
				for(var i=0;i<data.length;i++){
					arr.push(eval(data[i].goodsBenUrl)[0])	
				}
				this.setState({
					bannerItems:arr
				})
				//   设置banner   swiper、
				var mySwiper = new Swiper ('.swiper-container', {
		    	loop: true,
				  autoplay:1000,
			  })
			}.bind(this)
		})
		
		//  list 列表数据
		$.ajax({
			dataType:"jsonp",
			url:"http://datainfo.duapp.com/shopdata/getGoods.php?callback=callback",
			success:function(data){
				console.log(data)
				this.setState({
					listItems:data
				})
			}.bind(this)
		})
	}
})
export default Shouye