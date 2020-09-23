import React,{Component} from 'react';
import Order from '../../Components/Checkout Components/Order/Order';

import { connect } from 'react-redux';
import * as actionCreators from './../../store/actions/index';
import Spinner from '../../Components/Spinner/Spinner';

class Orders extends Component{

    componentDidMount(){
        this.props.fetchOrder(this.props.token,this.props.userid);
    }
    render(){
        let order = <Spinner/>;
        if(this.props.loading===false){
            order = this.props.orders.map((ele,i)=>{
                return <Order key={ele.id} ind={ele.indegridents} price={ele.totalPrice}/>;
            });
        }
        if(this.props.err){
            order = <h1>Failed To Fetch Your Orders.Make Sure You are Sign In.</h1>
        }
        return(
            <div style={{padding: "50px 0 0 0"}}>
                {order}
            </div>
        );
    }
}

const mapStateToProps = state=>{
    return{
        orders: state.fetchOrder.orders,
        loading: state.fetchOrder.loading,
        err: state.fetchOrder.err,
        token: state.auth.token,
        userid: state.auth.userID
    };
}

const mapDispatchToProps = dispatch=>{
    return{
        fetchOrder: (token,userid)=>{dispatch(actionCreators.FETCHING__ORDER(token,userid))}
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Orders); 