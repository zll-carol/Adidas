import React, {Component} from "react";
import {Button, Icon,Spin,Badge} from "antd"; //Badge用于在购物车图标的顶部显示数量
import CartItem from "./CartItem";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; //用于页面间的跳转
import "../../css/ShoppingCart.css";

class ShoppingCart extends Component {
	static propTypes={
		isFetching:PropTypes.bool.isFetching,
		cartList:PropTypes.array.isRequired,
		count:PropTypes.number.isRequired,
		valid:PropTypes.bool.isRequired,
		getCart:PropTypes.func.isRequired,
		delCart:PropTypes.func.isRequired,
	}

	state = {
		showList: false
	}
	handleMouseLeave() {
		this.setState({
			showList: false
		})
	}
	hanldeMouseOver() {
		this.setState({
			showList: true
		});
		if(this.props.valid){
			this.props.getCart();
		}
	}	
	render() {
		const{isFetching,cartList,delCart,count}=this.props;
		const {showList}=this.state;
		let countn=0;let sum=0;   //countn是加入购物车的所有商品的数量
		return (
			<div className="shoppingCart"
			 onMouseLeave={this.handleMouseLeave.bind(this)}
			>
				<Button size="large"
				onMouseOver={this.hanldeMouseOver.bind(this)}
				>
				   <Badge count={count} showZero> 
				 	  购物车 &nbsp;
				 	  <Icon type={"shopping-cart"}/>
				   </Badge>
				</Button>
				{
					showList ?
					<div className="cart" >
						<h3>最近添加的商品</h3>
						{
							isFetching ? //如果isFetching等于true说明还没有请成功，则显示loading符号
							<Spin className="spin"/>
							:
							<div className="cartList">
								{
									cartList.length > 0 ?
									cartList.map((cart,i)=>{
										countn += cart.num;  // +=表示在原来的基础上再加上
										sum += cart.num * cart.product.price;
										return(
											<CartItem product={cart.product}
											num={cart.num} key={i}
											delCart={()=>delCart(cart._id)}
											/>
										)
									})
									: <p className="emputy" >购物车里什么也没有噢 <Icon type="frown-o" /> </p>
								}	
							</div>
						}
						<div className="cartFooter">
							<p>共 {countn}件商品，共计￥{sum.toFixed(2)}</p>
							<Button type="primary" >
								<Link to="/order">去结算</Link>
							</Button>
						</div>
					</div>
					:null
				}
			</div>	
		)
	}
}

export default ShoppingCart;
