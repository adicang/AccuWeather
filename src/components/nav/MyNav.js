import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import temperatureUnit from '../../stateManager/actions/temperatureUnit';

import {  Header, Checkbox } from 'semantic-ui-react';
import { Navbar, Nav } from 'react-bootstrap';
import './MyNav.css';
import icon from '../../assets/favicon.png';


class MyNav extends Component {

   constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange() {
        this.props.tempToggle()
    }


    render() {
        return (

                <Navbar expand="lg" variant="light">
                    <Navbar.Brand href="/">
                        <Header as="h1">
                            <img src={icon} alt="app-icon" />
                            <Header.Content className="title">
                                Weather app
                        </Header.Content>
                        </Header>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <p>
                                <Checkbox
                                    onChange={this.handleChange}
                                    toggle
                                />
                                <br/>
                                {"°C"} | {"°F"}
                            </p>
                        </Nav>
                        <Nav className="ml-auto">
                            <Link to="/">
                                <h2 className="nav-item">Home</h2>
                            </Link>
                        </Nav>
                        <Nav className="item-two">
                            <Link to="/favorites">
                                <h2 className="nav-item">Favorites</h2>
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>


        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            tempToggle: temperatureUnit
        }, dispatch);
}

export default connect(null, matchDispatchToProps)(MyNav);


