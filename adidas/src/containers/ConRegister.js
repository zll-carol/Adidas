import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Register from "../pages/Register";
import {registerSubmit} from "../actions/register";

const mapStateToProps =(state)=>({
	isFetching: state.register.isFetching,
	error:state.register.error,
})

const mapDispatchToProps=(dispatch)=>({
	register:bindActionCreators(registerSubmit,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(Register)