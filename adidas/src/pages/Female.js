import React,{Component} from "react";
import {Carousel,Icon,Row, Col} from "antd";
import api from "../service/api";
import ProductCard from "./components/ProductCard";
import "../css/Female.css";

const imgs = [{
	img:"imgs/female1.jpg",
	content:"立即购买"
}, {
	img: "imgs/female2.jpg",
	content:"立即购买"
}, {
	img: "imgs/female3.jpg",
	content:"立即购买"
}, {
	img: "imgs/5.jpg",
	content:"立即购买"
}];

class Female extends Component{
	state={
		allProducts:[]
	}
	getProducts(){
		api.getProducts().then((res)=>{
			if(res.OK){
				this.setState({allProducts:res.docs});
			}
			console.log(res.docs);
		})
	}
	componentWillMount() {
	    this.getProducts();
	}

	render(){
		return(
			<div className="female">
				<h3>女子</h3>
				<Carousel autoplay>
				   {
				   	imgs.map((img,i)=>{
				   		return(
				   			<div key={i}>
				   				<img style={{margin:"auto"}} src={img.img} alt={img.img} />
				   				<Icon type="left" className="left"/>
				   				<Icon type="right" className="right"/>   	
				   				<h3>{img.content} <Icon type="right-circle"/></h3>
				   			</div>
				   		)
				   	})
				   }
  				</Carousel>
		
				<div className="product">
					<Row gutter={10}>
					   	{
					   	  this.state.allProducts.map((product, i) => (
					   	    <Col span={12} key={i}>
					   	    	<ProductCard key={i} product={product}/> 
					   	    </Col>
					   	  ))
					   	}
				   	</Row>
				</div>
			</div>
		)
	}
}

export default Female;