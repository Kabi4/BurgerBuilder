import React, { Component } from 'react';

import classes from './Toolbar.css';

import Logo from './../../Logo/Logo';
import NavigationList from './../NavigationList/NavigationList';
import Sidebar from './../../Sidebar/Sidebar';

class Toolbar extends Component{
    state = {
        showSideBar: false
    };

    toggleSidebar = ()=>{
        const current = this.state.showSideBar;
        this.setState({showSideBar: !(current)});
    };
    render(){
        return(
            <div className={classes.Toolbar}>
                <Sidebar show={this.state.showSideBar} click={this.toggleSidebar}/>
                <div onClick={this.toggleSidebar} className={classes.Menu}>MENU</div>
                <div style={{height:"80%"}}>
                    <Logo />
                </div>
                <nav className={classes.DisplayOnlyDesktop}>
                    <NavigationList/>
                </nav>
            </div>
        )
    }
}
export default Toolbar;