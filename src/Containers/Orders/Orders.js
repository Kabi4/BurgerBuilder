import React,{Component} from 'react';
import Order from '../../Components/Checkout Components/Order/Order';

import { connect } from 'react-redux';
import * as actionCreators from './../../store/actions/index';
import Spinner from '../../Components/Spinner/Spinner';

class Orders extends Component{

    componentDidMount(){
        this.props.fetchOrder();
    }
    render(){
        let order = <Spinner/>;
        if(this.props.loading===false){
            order = this.props.orders.map((ele,i)=>{
                return <Order key={ele.id} ind={ele.indegridents} price={ele.totalPrice}/>;
            });
        }
        if(this.props.err){
            order = <h1>Failed To Fetch Your Orders</h1>
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
        err: state.fetchOrder.err
    };
}

const mapDispatchToProps = dispatch=>{
    return{
        fetchOrder: ()=>{dispatch(actionCreators.FETCHING__ORDER())}
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Orders); 