import React, {Component} from 'react';

import Modal from './../../Components/UI/Modal/Modal';
import BuildControls from './../../Components/Burger/BuildControls/BuildControls';
import Burger from './../../Components/Burger/Burger';
import Spinner from './../../Components/Spinner/Spinner';
//import axios from 'axios';
import {connect} from 'react-redux';

import * as actionsCreators from '../../store/actions/index';

import Aux from './../../High Order Components/Auxillary';

class BurgerBuilder extends Component{
    state = {
        purchasing: false,
        buying: false
    };

    purchasingHandler = ()=>{
        if(this.props.authen){const currentCondition = this.state.purchasing;
        this.setState({purchasing: !(currentCondition)});}else{   this.props.history.push({
            pathname: '/auths'
        });
    }
    };

    togglebuying = () =>{
            const currentCondition = this.state.buying;
            this.setState({buying: !(currentCondition)});
    };

    buingHandler = () =>{
        this.props.history.push({
            pathname: '/checkout'
        });
    };

    componentDidMount(){
        //console.log(this.props)
    };

    render(){
        const disabledKeys = {
            ...this.props.ing
        }
        for(let key in disabledKeys){
            disabledKeys[key] = disabledKeys[key]<=0;
        }
        let Modals = <Modal 
            buyingHandler = {this.buingHandler}
            indegridents={this.props.ing}
            purchasingCondition={this.state.purchasing}
            buyingCondition = {this.state.buying}
            togglePurchasing={this.purchasingHandler}
            price = {(this.props.price).toFixed(2)}
            />;
        if(this.state.buying){
            Modals = <Modal buyingCondition = {this.state.buying}><Spinner/></Modal>
        }
        return(
            <Aux>
                {Modals}
                <Burger indegridents={this.props.ing}/>
                <BuildControls
                    price = {(this.props.price).toFixed(2)}
                    addIndegridents={this.props.addIndegridents}
                    removeIndegridents={this.props.removeIndegridents}
                    disabledKeys = {disabledKeys}
                    tooglePurchase = {this.purchasingHandler}
                    isNotPurchaseable = {(this.props.price)<=1.01}
                />
            </Aux>
        );
    }
}

const mapStateToProps = (state)=>{
    return{
        ing: state.burgerBuilder.indegridents,
        price: state.burgerBuilder.totalPrice,
        authen: state.auth.token
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        addIndegridents: (ingName)=>{dispatch(actionsCreators.addIndegridents(ingName))},
        removeIndegridents: (ingName)=>{dispatch(actionsCreators.removeIndegridents(ingName))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder);






















































// addIndegridentsHandler =(type)=> {
//     let oldCount = this.state.indegridents[type];
//     oldCount+=1;
//     let oldState = {...this.state.indegridents};
//     oldState[type] = oldCount;
//     let oldPrice = this.state.totalPrice;
//     oldPrice+=INDEGRIDENTS__PRICE[type];
//     this.setState({indegridents:oldState,totalPrice:oldPrice});
// };

// removeIndegridentsHandler = (type) =>{
//     let haveOne = true;
//     let oldCount = this.state.indegridents[type];
//     oldCount-=1;
//     if(oldCount<0){oldCount=0;haveOne=false;};
//     let oldState = {...this.state.indegridents};
//     oldState[type] = oldCount;
//     let oldPrice = this.state.totalPrice;
//     if(haveOne)oldPrice-=INDEGRIDENTS__PRICE[type];
//     this.setState({indegridents:oldState,totalPrice:oldPrice});
// }
//const INDEGRIDENTS__PRICE = {
//     bacon:0.7,
//     salad:0.5,
//     cheese:0.4,
//     meat:1.2
// }
// const getIndegrient = [];
//         for(let i in this.props.ing){
//             getIndegrient.push(encodeURIComponent(i)+'='+encodeURIComponent(this.props.ing[i]));
//         };
//         getIndegrient.push('price='+this.props.price);
//         const getIndegrientString = getIndegrient.join('&');