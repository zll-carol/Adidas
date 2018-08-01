import React, {Component} from "react";
import {Carousel,Icon, Card,Row,Col} from "antd";
import api from "../service/api";

import"../css/Home.css";

const imgs = [{
	img: "imgs/11.png",
	content:"立即购买"
}, {
	img: "imgs/2.jpg",
	content:"立即购买"
}, {
	img: "imgs/22.png",
	content:"立即购买"
}, {
	img: "imgs/4.jpg",
	content:"立即购买"
}, {
	img: "imgs/5.jpg",
	content:"立即购买"
}];

const img=["imgs/sport.jpg","imgs/11.jpg","imgs/22.jpg","imgs/33.jpg","imgs/44.jpg"];

class Home extends Component{
	render() {
		return (
			<div className="home">
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

  				<Card style={{ width: 240 }} bodyStyle={{ padding: 0 }} className="card" >					
				   <a href="/">
				    <div className="custom-image">
				      <img alt="sprot" width="100%" src={img[0]} />
				    </div>
				    <div className="custom-card">
				      <h3 style={{fontWeight:600}} >足球个性印制产品</h3>
				      <p>立即印制</p>
				    </div>
				   </a>
			    </Card>

			    <div className="card1">
				    <Row>
				      <Col span={12}>				       
				         <Card >										
						   <a href="/">
						    <div className="custom-image">
						      <img alt="sprot" width="100%" src={img[1]} />
						    </div>
						    <div className="custom-card">
						      <h3 style={{fontWeight:600}} >状态正然</h3>
						      <p>立即购买</p>
						    </div>
						   </a>
					    </Card>
				      </Col>
				      <Col span={12}>
				        <Card >  
					        <a href="/">
						    <div className="custom-image">
						      <img alt="sprot" width="100%" src={img[2]} />
						    </div>
						    <div className="custom-card">
						      <h3 style={{fontWeight:600}} >我是专注</h3>
						      <p>立即购买</p>
						    </div>
						   </a>
						</Card>
				      </Col>

				      <Col span={12}>
				        <Card > 
				        <a href="/">
						    <div className="custom-image">
						      <img alt="sprot" width="100%" src={img[3]} />
						    </div>
						    <div className="custom-card">
						      <h3 style={{fontWeight:600}} >由我创造</h3>
						      <p>立即购买</p>
						    </div>
						   </a>
						</Card>
				      </Col>
				      <Col span={12}>
				        <Card> 
				        <a href="/">
						    <div className="custom-image">
						      <img alt="sprot" width="100%" src={img[4]} />
						    </div>
						    <div className="custom-card">
						      <h3 style={{fontWeight:600}} >生来好动</h3>
						      <p>立即购买</p>
						    </div>
						   </a>
						</Card>
				      </Col>
				    </Row>
			 	</div>	    
			</div>
		);
	}
}

export default Home;