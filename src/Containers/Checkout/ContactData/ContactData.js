import React,{Component} from 'react';
import Button from '../../../Components/Button/Button';

import classes from './ContactData.css';

import axios from 'axios';
import Spinner from '../../../Components/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';

class ContactData extends Component{
    state = {
        formDetails:{
            Name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                elementValue: "",
                conditions:{
                    required: true
                },
                isValid: false,
                haveChangedOnce: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail'
                },
                elementValue: "",
                conditions:{
                    required: true,
                    email: true
                },
                isValid: false,
                haveChangedOnce: false
            },
            Address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Full Address/Street Name'
                },
                elementValue: "",
                conditions:{
                    required: true
                },
                isValid: false,
                haveChangedOnce: false
            },
            Phone_No:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Phone Number'
                },
                elementValue: "",
                conditions:{
                    required: true,
                    isnumbers: 8
                },
                isValid: false,
                haveChangedOnce: false
            },
            Zip_Code: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                elementValue: "",
                conditions:{
                    required: true,
                    isnumbers: 4
                },
                isValid: false,
                haveChangedOnce: false
            },
            deliveryMode: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value:"fastest",displayValue: "Fastest"},
                        {value: "normal" , displayValue: 'Normal'}
                    ]
                },
                elementValue: "fastest"
            }
        },
        buying: false,
        validationCounts: -1,
        validCounts: 0
    }

    togglebuying = () =>{
        const currentCondition = this.state.buying;
        this.setState({buying: !(currentCondition)});
    };


    placeOrderHandler=(e)=>{
        e.preventDefault();
        this.togglebuying();
        let time = new Date();
        let uniqid = "order@" + time.toLocaleString();
        let details = {};
        for(let key in this.state.formDetails){
            details[key] = this.state.formDetails[key].elementValue;
        };
        let totalPrice = this.props.totalPrice+"$";
        let material = {
            ...this.props.indegridents
        };
        let id = uniqid;
        const order = {
            id: id,
            indegridents: {
                ...material
            },
            totalPrice: totalPrice,
            Customer: {
                ...details
            } 
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
    
    inputChangeHandler = (e,id) =>{
        let form = {...this.state.formDetails};
        form[id] = {
            ...this.state.formDetails[id]
        };
        let intialValidation = form[id].isValid;
        let isvalid =false;
        let intialValidCount = this.state.validCounts;
        if(form[id].conditions){
            if(form[id].conditions.required){
                if((e.target.value).trim()!=='')isvalid=true;
                else isvalid=false;
            }
            if(form[id].conditions.email){
                let regex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                if(isvalid && regex.test(e.target.value))isvalid=true;
                else isvalid = false;
            }
            if(form[id].conditions.isnumbers){
                let regex = /^\d+$/;
                if(isvalid && regex.test(e.target.value) && e.target.value.length>form[id].conditions.isnumbers)isvalid=true;
                else isvalid = false;
            }
        }
        if(isvalid!==intialValidation && form[id].conditions){
            if(intialValidation)intialValidCount--;
            else intialValidCount++;
        }
        form[id].haveChangedOnce = true;
        form[id].isValid = isvalid;
        form[id].elementValue = e.target.value;
        this.setState({formDetails: form});
        this.setState({validCounts: intialValidCount})
    }

    componentDidMount(){
        let required = 0;
        for(let key in this.state.formDetails){
            if(this.state.formDetails[key].conditions){
                required++;
            }
        }
        this.setState({validationCounts: required});
    };

    render(){
        const allInputElements = [];
        for(let key in this.state.formDetails){
            allInputElements.push({
                id: key,
                config: this.state.formDetails[key]
            })
        }
        let form = (<form>
            {allInputElements.map(ele=>{
                return <Input haveChangedOnce={ele.config.haveChangedOnce} isValid={ele.config.isValid} conditions={ele.config.conditions} changed={(e)=>{this.inputChangeHandler(e,ele.id);}}  key={ele.id} elementType={ele.config.elementType} elementConfig={ele.config.elementConfig} value={ele.config.elementValue}  />
            })}
            <Button type='Success' isdisable={(this.state.validCounts!==this.state.validationCounts)} click={(e)=>{this.placeOrderHandler(e)}}>ORDER</Button>
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