import React, {Component} from 'react';

import Modal from './../../Components/UI/Modal/Modal';
import BuildControls from './../../Components/Burger/BuildControls/BuildControls';
import Burger from './../../Components/Burger/Burger';

import Aux from './../../High Order Components/Auxillary';

const INDEGRIDENTS__PRICE = {
    bacon:0.7,
    salad:0.5,
    cheese:0.4,
    meat:1.2
}

class BurgerBuilder extends Component{
    state = {
        indegridents: {
            bacon:0,
            salad:0,
            cheese:0,
            meat:0
        },
        totalPrice: 1,
        purchasing: false
    };

    addIndegridentsHandler =(type)=> {
        let oldCount = this.state.indegridents[type];
        oldCount+=1;
        let oldState = {...this.state.indegridents};
        oldState[type] = oldCount;
        let oldPrice = this.state.totalPrice;
        oldPrice+=INDEGRIDENTS__PRICE[type];
        this.setState({indegridents:oldState,totalPrice:oldPrice});
    };

    removeIndegridentsHandler = (type) =>{
        let haveOne = true;
        let oldCount = this.state.indegridents[type];
        oldCount-=1;
        if(oldCount<0){oldCount=0;haveOne=false;};
        let oldState = {...this.state.indegridents};
        oldState[type] = oldCount;
        let oldPrice = this.state.totalPrice;
        if(haveOne)oldPrice-=INDEGRIDENTS__PRICE[type];
        this.setState({indegridents:oldState,totalPrice:oldPrice});
    }

    purchasingHandler = ()=>{
        const currentCondition = this.state.purchasing;
        this.setState({purchasing: !(currentCondition)});
    };

    render(){
        const disabledKeys = {
            ...this.state.indegridents
        }
        for(let key in disabledKeys){
            disabledKeys[key] = disabledKeys[key]<=0;
        }
        return(
            <Aux>
                <Modal 
                    indegridents={this.state.indegridents}
                    purchasingCondition={this.state.purchasing}
                    togglePurchasing={this.purchasingHandler}
                    price = {(this.state.totalPrice).toFixed(2)}
                    />
                <Burger indegridents={this.state.indegridents}/>
                <BuildControls
                    price = {(this.state.totalPrice).toFixed(2)}
                    addIndegridents={this.addIndegridentsHandler}
                    removeIndegridents={this.removeIndegridentsHandler}
                    disabledKeys = {disabledKeys}
                    tooglePurchase = {this.purchasingHandler}
                    isNotPurchaseable = {(this.state.totalPrice)<=1.01}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;