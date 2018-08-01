import React, {Component} from "react";
import {Button, Spin,message} from "antd";
import ProductCard from "./components/ProductCard";
import AddButton from "./components/AddButton";
import PropTypes from "prop-types";
import api from "../service/api";
import "../css/Product.css";

class Product extends Component{
  static propTypes={
    addCart:PropTypes.func.isRequired
  }
  state={
    product:{},
    count:1,
  }

  componentWillMount(){
    console.log(this.props);
    const id=this.props.match.params.id;
    console.log("ID:",id);
    api.getProduct(id).then((res)=>{  /*因为在增加商品的时候已
经将添加的商品存入数据库，所以可以通过id进行查找*/
      if(res.OK){
        this.setState({product:res.doc})  //通过id获取到商品
      }else{
        message.error(res.message)
      }
    })
  }

  handleCount(value){
    console.log("count:",value);
    this.setState({
      count:value   //AddButton.js中input框的值
    })
  }
  handleAddCart(){
    const postData=[{  /*必须要传商品的id和数量才可以将相应
的商品存入到购物车数据库中*/
      pid:this.state.product._id,
      num:this.state.count,
    }]
    console.log("addCart:",postData);
    api.addCart(postData).then((res)=>{
      if(res.OK){
        this.props.addCart(res.count)
      }
      console.log("res:",res);
    })
  }

  render(){
    const{product}=this.state;
    if(!product.images){
      return <Spin/>
    }
    return(
      <div className="product">
          <h1>商品详情</h1>
          <ProductCard product={this.state.product} />            
          <AddButton onChange={this.handleCount.bind(this)} 
            defaultValue={this.state.count}
          />
          <Button onClick={this.handleAddCart.bind(this)}>加入购物车</Button>
      </div>
    )
  }
}

export default Product;
