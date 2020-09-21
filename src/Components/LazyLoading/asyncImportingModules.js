/*
----Using Syntax----
const myModule = asyncLoading(()=>{return import('./../path/module')})
*/



import React, { Component } from 'react';

const asyncLoading = (importModules) =>{
    return class extends Component{
        state = {
            component: null
        }

        componentDidMount(){
            importModules()
            .then(res=>{
                this.setState({component: res.default});
            })
        }

        render(){
            const C = this.state.component;

            return C?<C {...this.props} />:null;
        }
    }
}

export default asyncLoading;