import React,{Component} from "react";
import PropTypes from "prop-types";
import{Card} from "antd";
import {Link} from "react-router-dom";
import "../../css/ProductCard.css";

class ProductCard extends Component{
	static propTypes={
		product:PropTypes.object.isRequired, //product由父组件Female.js传进来
	}

	render(){
		const{
			name,description,price,images,_id
		}=this.props.product;
		console.log(images);
		return(
			<div className="productCard">
				<Card bodyStyle={{padding:2,cursor:"pointer"}}>
					<Link to={"/product/"+_id}>
						<div className="custom-image">
							<img alt="图片" src={images}/>
						</div>
						<div className="custom-card">
							<h3>{name}</h3>
							<p>{description}</p>
							<p className="price">￥ : {price} </p>
						</div>
					</Link>
				</Card>
			</div>
		)
	}
}

export default ProductCard;

