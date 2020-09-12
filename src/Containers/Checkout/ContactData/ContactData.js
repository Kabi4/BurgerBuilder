import React,{Component} from 'react';
import Button from '../../../Components/Button/Button';

import classes from './ContactData.css';

import axios from 'axios';
import Spinner from '../../../Components/Spinner/Spinner';

class ContactData extends Component{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            PostalCode: ''
        },
        buying: false
    }

    togglebuying = () =>{
        const currentCondition = this.state.buying;
        this.setState({buying: !(currentCondition)});
    };

    gernateUniqueID = () =>{
        var uniqid = require('uniqid');
        return uniqid;
    };

    placeOrderHandler=(e)=>{
        e.preventDefault();
        this.togglebuying();
        var uniqid = this.gernateUniqueID();
        const order = {
            id: uniqid,
            indegridents: {
                ...this.props.indegridents
            },
            totalPrice: this.props.totalPrice,
            Customer: {
                Name: "XXXXXX",
                Address: "XXXXX",
                Phone_No:"XXXX",
                Zip_Code: "XXXX",
                email: "XXXX"
            },
            deliveryMode: "Fastest" 
        }
        axios.post('https://my-burger-builder-8fe87.firebaseio.com/order.json',order)
        .then((Response)=>{
            this.togglebuying();
            this.props.history.push('/');
        })
        .catch(err=>{
            this.togglebuying();
            alert("Order Not Placed Try Again!")
        })
    }
    
    render(){
        let form = (<form>
            <input className={classes.Input} type="text" name='name' placeholder="Your Name"/>
            <input className={classes.Input} type="email" name='email' placeholder="Your Email"/>
            <input className={classes.Input} type="text" name='Street' placeholder="Street Name"/>
            <input className={classes.Input} type="text" name='Postal' placeholder="Postal Code"/>
            <Button type='Success' click={(e)=>{this.placeOrderHandler(e)}}>ORDER</Button>
        </form>);
        if(this.state.buying){
            form = (<Spinner/>);
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data:</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;