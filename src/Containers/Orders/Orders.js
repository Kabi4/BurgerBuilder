import React,{Component} from 'react';
import Order from '../../Components/Checkout Components/Order/Order';

import axios from 'axios';
import Spinner from '../../Components/Spinner/Spinner';

class Orders extends Component{
    state = {
        orders: [],
        loading: true
    }

    componentDidMount(){
        axios.get('https://my-burger-builder-8fe87.firebaseio.com/order.json')
        .then((Response)=>{
            this.setState({loading:false})
            let fetchOrders = [];
            for(let key in Response.data){
                fetchOrders.push({
                    ...Response.data[key],
                    id: key
                });
            }
            this.setState({orders: fetchOrders});
        })
        .catch((err)=>{
            this.setState({loading:false})
            alert("Can't Retrive The data Please reload.");
        })
    }
    render(){
        let order = <Spinner/>;
        if(this.state.loading===false){
            order = this.state.orders.map((ele,i)=>{
                return <Order key={ele.id} ind={ele.indegridents} price={ele.totalPrice}/>;
            });
        }
        return(
            <div style={{padding: "50px 0 0 0"}}>
                {order}
            </div>
        );
    }
}

export default Orders; 