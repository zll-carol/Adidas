import React, {Component} from 'react';
import {Button,Menu,Icon,Layout,Dropdown} from 'antd';
import PropTypes from "prop-types";
import ConCart from "../../containers/ConCart";
import "../../css/NavHeader.css";

import { Link } from "react-router-dom"; //用于页面间的跳转

// const currentUser=localStorage.getItem("username");
// console.log(currentUser);

const {Header} = Layout;
const {SubMenu,Item} = Menu;
const MenuItemGroup = Menu.ItemGroup;

const img="/imgs/logo.png";

class NavHeader extends Component {
	state = {
		current: 'home',
	}

	static propTypes={
		username:PropTypes.string.isRequired,
		actions:PropTypes.object.isRequired,
	}

	handleClick = (e) => {
		console.log('click ', e);
		this.setState({
			current: e.key,
		});
	}

	handleLogout(){
		console.log("Logout");
		this.props.actions.navLogout();
		window.location.href="/";
	}

	render() {
		const userItems=(
			<Menu>
				<Item><Link to="user">用户中心</Link></Item>
				<Item><Link to="manage">管理中心</Link></Item>
				<Item><Button onClick={this.handleLogout.bind(this)}>退出登录</Button></Item>
			</Menu>
		)
		return (
			<Layout>
				<Header className="header" >
					<Link to={{
						pathname:"/",
						// search:"?name=张三",
						state:{
							age:18
						}
					}}>
	      				<div className="logo">
	      					<img src={img} alt={img} />
	      				</div>
	      			</Link>
      				<Menu 
			        onClick={this.handleClick}
			        selectedKeys={[this.state.current]}
			        mode="horizontal"
			       	style={{background:"black",color:"white",height:65,fontWeight:"bold",marginTop:10,paddingTop:10}}>
			        <SubMenu key={"male"} title={<span>男子</span>}>
			          <MenuItemGroup title="鞋类">
			            <Menu.Item key="male:1">Originals</Menu.Item>
			            <Menu.Item key="male:2">跑步</Menu.Item>
			            <Menu.Item key="male:3">adidas neo</Menu.Item>
			            <Menu.Item key="male:4">篮球</Menu.Item>
			            <Menu.Item key="male:5">户外</Menu.Item>
			            <Menu.Item key="male:6">网球</Menu.Item>
			            <Menu.Item key="male:7">足球</Menu.Item>
			            <Menu.Item key="male:8">拖鞋</Menu.Item>
			            <Menu.Item key="male:9">训练</Menu.Item>
			            <Menu.Item key="male:10">miadidas 个性化定制</Menu.Item>
			          </MenuItemGroup>
			         
			        </SubMenu>
			        <SubMenu key={"female"} title={<Link to="/female">女子</Link>}>
			          <MenuItemGroup title="鞋类">
			            <Menu.Item key="female:1">Originals</Menu.Item>
			            <Menu.Item key="female:2">跑步</Menu.Item>
			            <Menu.Item key="female:3">adidas neo</Menu.Item>
			            <Menu.Item key="female:4">户外</Menu.Item>
			            <Menu.Item key="female:5">网球</Menu.Item>
			            <Menu.Item key="female:6">拖鞋</Menu.Item>
			            <Menu.Item key="female:7">训练</Menu.Item>
			            <Menu.Item key="female:8">miadidas 个性化定制</Menu.Item>
			          </MenuItemGroup>
			          
			        </SubMenu>
			        <SubMenu key={"little"} title={<span>童装</span>}>
			          <MenuItemGroup title="大童（8~14岁）">
			            <Menu.Item key="little:1">男大童：鞋类</Menu.Item>
			            <Menu.Item key="little:2">女大童：鞋类</Menu.Item>
			            <Menu.Item key="little:3">男大童：服装</Menu.Item>
			            <Menu.Item key="little:4">女大童：服装</Menu.Item>
			            <Menu.Item key="little:5">箱包附配件</Menu.Item>
			          </MenuItemGroup>
			          <MenuItemGroup title="小2童（4-8岁）">
			            <Menu.Item key="little1:1">男小童：鞋类</Menu.Item>
			            <Menu.Item key="little1:2">女小童：鞋类</Menu.Item>
			            <Menu.Item key="little1:3">男小童：服装</Menu.Item>
			            <Menu.Item key="little1:4">女小童：服装</Menu.Item>
			            <Menu.Item key="little1:5">箱包附配件</Menu.Item>
			          </MenuItemGroup>
			        </SubMenu>
			         <SubMenu key={"sport"} title={<span>运动</span>}>
			          <MenuItemGroup title="跑步">
			            <Menu.Item key="sport:1">跑鞋</Menu.Item>
			            <Menu.Item key="sport:2">跑步服饰</Menu.Item>
			            <Menu.Item key="sport:3">UltraBOOST</Menu.Item>
			            <Menu.Item key="sport:4">PureBOOST</Menu.Item>
			            <Menu.Item key="sport:5">Alpha Bounce</Menu.Item>	
			          </MenuItemGroup>
			          <MenuItemGroup title="训练">
			            <Menu.Item key="sport1:1">Option 3</Menu.Item>
			            <Menu.Item key="sport1:2">Option 4</Menu.Item>
			            <Menu.Item key="sport1:3">Option 3</Menu.Item>
			            <Menu.Item key="sport1:4">Option 4</Menu.Item>
			            <Menu.Item key="sport1:5">Option 3</Menu.Item>
			            <Menu.Item key="sport1:6">Option 4</Menu.Item>
			          </MenuItemGroup>
			          <MenuItemGroup title="足球">
			            <Menu.Item key="sport2:1">Option 3</Menu.Item>
			            <Menu.Item key="sport2:2">Option 4</Menu.Item>
			            <Menu.Item key="sport2:3">Option 3</Menu.Item>
			            <Menu.Item key="sport2:4">Option 4</Menu.Item>
			            <Menu.Item key="sport2:5">Option 3</Menu.Item>
			            <Menu.Item key="sport2:6">Option 4</Menu.Item>
			          </MenuItemGroup>
			          <MenuItemGroup title="篮球">
			            <Menu.Item key="sport3:1">Option 3</Menu.Item>
			            <Menu.Item key="sport3:2">Option 4</Menu.Item>
			            <Menu.Item key="sport3:3">Option 3</Menu.Item>
			            <Menu.Item key="sport3:4">Option 4</Menu.Item>
			            <Menu.Item key="sport3:5">Option 3</Menu.Item>
			            <Menu.Item key="sport3:6">Option 4</Menu.Item>
			          </MenuItemGroup>
			          <MenuItemGroup title="户外">
			            <Menu.Item key="sport4:1">Option 3</Menu.Item>
			            <Menu.Item key="sport4:2">Option 4</Menu.Item>
			            <Menu.Item key="sport4:3">Option 3</Menu.Item>
			            <Menu.Item key="sport4:4">Option 4</Menu.Item>
			            <Menu.Item key="sport4:5">Option 3</Menu.Item>
			            <Menu.Item key="sport4:6">Option 4</Menu.Item>
			          </MenuItemGroup>
			          <MenuItemGroup title="其他运动">
			            <Menu.Item key="sport5:1">Option 3</Menu.Item>
			            <Menu.Item key="sport5:2">Option 4</Menu.Item>
			            <Menu.Item key="sport5:3">Option 3</Menu.Item>
			            <Menu.Item key="sport5:4">Option 4</Menu.Item>
			            <Menu.Item key="sport5:5">Option 3</Menu.Item>
			            <Menu.Item key="sport5:6">Option 4</Menu.Item>
			          </MenuItemGroup>
			        </SubMenu>
			         <SubMenu key={"brand"} title={<span>品牌</span>}>
			          <MenuItemGroup title="鞋类">
			            <Menu.Item key="brand:1">Originals</Menu.Item>
			            <Menu.Item key="brand:2">跑步</Menu.Item>
			            <Menu.Item key="brand:3">adidas neo</Menu.Item>
			            <Menu.Item key="brand:4">户外</Menu.Item>
			            <Menu.Item key="brand:5">网球</Menu.Item>
			            <Menu.Item key="brand:6">拖鞋</Menu.Item>
			            <Menu.Item key="brand:7">训练</Menu.Item>
			            <Menu.Item key="brand:8">miadidas 个性化定制</Menu.Item>
			          </MenuItemGroup>

			        </SubMenu>
			          <SubMenu key={"miadidas"} title={<span>miadidas定制</span>}>
			          <MenuItemGroup title="鞋类">
			            <Menu.Item key="miadidas:1">Originals</Menu.Item>
			            <Menu.Item key="miadidas:2">跑步</Menu.Item>
			            <Menu.Item key="miadidas:3">adidas neo</Menu.Item>
			            <Menu.Item key="miadidas:4">户外</Menu.Item>
			            <Menu.Item key="miadidas:5">网球</Menu.Item>
			            <Menu.Item key="miadidas:6">拖鞋</Menu.Item>
			            <Menu.Item key="miadidas:7">训练</Menu.Item>
			            <Menu.Item key="miadidas:8">miadidas 个性化定制</Menu.Item>
			          </MenuItemGroup>				 
			        </SubMenu>
	     	 		</Menu>
	     	 		<div className="line1"></div>
	     	 		<div className="line2"></div>	     	 	
	     	 		{
	     	 			//如果登录成功，存在该用户，则显示用户下拉列表
	     	 			!!this.props.username ?  //username是由actions和reducers里传过来的
	     	 			
	     	 			<div className="user">	 
	     	 				<div className="shoppingCart">
    							<ConCart />
    						</div>    	 				
	     	 				<Link to="/edit">
	     	 					<Button type="primary" className="edit-btn" icon="edit">邮件订阅
	     	 					</Button>
	     	 				</Link>
	     	 				 <Dropdown overlay={userItems}>
				                 <Button icon="user">{this.props.username}
				                   <Icon type="down" />
				                 </Button>
			               	 </Dropdown> 
	     	 			</div>
	     	 			:     //如果登录失败，不存在该用户，则依旧只显示登录和注册按钮
	     	 			<div>
		     	 			<Link to="/login">	
				     	 		<Button  type="primary" style={{float: "right", top: -45,right:20}} >登录
		          				</Button>
		          				<Icon type="user" className="login" />
         			   		</Link>        				
	          				<Link to="register">       				
		         				<Button ghost style={{float: "right", top: -45}} type="primary">注册
		          				</Button>
	         				</Link>         	
	     	 			</div>
	     	 		}         							
  				</Header> 
      		</Layout>
	  	);
	}
}

export default NavHeader;