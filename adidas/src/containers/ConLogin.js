import Login from "../pages/Login";
import * as LoginActions from "../actions/login"; /* LoginActions是一个对象,这里的*as就是把actions文件
夹中的login.js里的函数都作为LoginActions的属性。 */
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({  /*mapStateToProps函数 ——>将外部的state对象
映射到UI组件的props对象上，这样UI组件中定义的属性才可以获取到值*/
	isFetching: state.login.isFetching,
	user: state.login.user,
	message: state.login.message,
	error: state.login.error,
})

const mapDispatchToProps = (dispatch) => ({ /*mapDispatchToProps函数 ——>将
dispatch注入到action文件夹中 */
	actions: bindActionCreators(LoginActions, dispatch)  /*因为LoginActions对象的属性就是actions文件中
的login.js里的函数,所以这里再和actions绑定，在UI组件上就可以直接调用action里的函数了 */
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)  /*connect方法就
是让子组件获取到store中的state和dispatch,store是和reducer里处理数据的函数绑定在一起的，
子组件只有获取到state,那么定义的属性才会有值，子组件获取到dispatch才可以触发action事件，
然后调用reducer里的处理函数*/