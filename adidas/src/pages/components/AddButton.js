import React,{Component} from "react";
import PropTypes from "prop-types";
import {Button} from "antd";

class AddButton extends Component{
	static PropTypes={
		onChange:PropTypes.func.isRequired,
		defaultValue:PropTypes.number.isRequired
	}
	state={
		value:this.props.defaultValue  //一开始input框里的默认值，在handleChange(e){}里获得
	}

	handleChange(e){
		const value=parseInt(e.target.value,10);  /*target获取到的是字符串类型，
由parseInt转为数字类型。10表示十进制*/
		this.setState({value});
		this.props.onChange(value);
	}
	handleMinus(){
		const currentValue=parseInt(this.state.value,10) - 1;
		const value=currentValue < 1 ? 1 :currentValue; //当减少到小于1时就等于1，否则都等于当前值
		this.setState({
			value:value
		});
		this.props.onChange(value);
	}
	handlePlus(){
		const value=parseInt(this.state.value,10) + 1;
		this.setState({
			value:value
		});
		this.props.onChange(value);
	}

	render(){
		return(
			<div className="addButton">
				<Button onClick={this.handleMinus.bind(this)}>-</Button>
				<input value={this.state.value} type="number"
					onChange={this.handleChange.bind(this)}
					style={{height:24,lineHeight:24,textAlign:"center"}}
				/>	
				<Button onClick={this.handlePlus.bind(this)}>+</Button>
			</div>
		)
	}
}

export default AddButton;