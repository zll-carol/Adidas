import React,{Component} from "react";
import {Col,Row,Menu} from "antd";
import{Link,Switch,Route} from "react-router-dom";
import UploadImg from "./components/UploadImg";
import Product from "./AddProduct";
import AddCategory from "./AddCategory";
import Tag from "./AddTag";
import "../css/Manage.css";

const MenuItem=Menu.Item;

class Manage extends Component{
	handleClick(item){  /*跳转页面写法1：根据key来跳转到相应的路由，因此key里
写的是路由地址;跳转页面写法2：使用<Link to=""></Link>*/
		console.log(this.props);
		console.log("item:",item);
		this.props.history.push(item.key);
	}

	render(){
		return(
			<div className="manage" >
				<Row>
					<Col md={4}  xs={8} sm={8} className="nav">
						<h1>管理中心</h1>
						<hr style={{margin:10}} />
						<div className="Manage">
							<h2>管理菜单</h2>
						<Menu
						onClick={this.handleClick.bind(this)}
						>
							<MenuItem key="/manage/category">
								<Link to="/manage/category">  
								增加分类
								</Link>
							</MenuItem>
							<MenuItem key="/manage/tag">
								<Link to="/manage/tag">
								增加标签
								</Link>
							</MenuItem>
							<MenuItem key="/manage/product">
								<Link to="/manage/product">
								增加产品
								</Link>
							</MenuItem>
							<MenuItem key="/manage/uploadimg">			
								上传图片											
							</MenuItem>						
						</Menu>
						</div>
					</Col>
					<Col xs={16} sm={6} md={20}>
						<Switch>
							<Route path="/manage/uploadimg" render={(props)=>(
								<UploadImg max={3}
									getImgList={(list)=>console.log(list)}
									action="http://192.168.1.210:3000/upload"
								/>)
						    }/>
						    <Route path="/manage/product" component={Product} />
	  						<Route path="/manage/tag" component={Tag}/>				
							<Route path="/manage/category" component={AddCategory} />
						</Switch>
					</Col>
				</Row>
		    </div>
		)
	}
}

export default Manage;