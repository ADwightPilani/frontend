
import React, { useEffect, useState, useRef } from "react";
//import ReactDOM from 'react-dom';
//import logo from './logo.svg';
import './Company.css';
import Form from 'react-bootstrap/Form';

class CompStockMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            exchangename: '',
            companycode: ''
        };
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    handleChange = (event) => {
        this.setState({ sectorname: event.target.value });
    }

    submit(e) {
        e.preventDefault();
        const myInit1 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Vary': 'Origin'.replace,
                'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "companyname": this.state.name,
                "exchangename": this.state.exchangename,
                "companycode": this.state.companycode
            })


        };
        console.log(myInit1.body);
        let authurl = 'https://advaittest.herokuapp.com/mapcompanycode';
        fetch(authurl, myInit1)
            .then((response) => {
                console.log("data sent");
                return response.text();
            })
            .then(function (myJson) {
                console.log(myJson);
            });
        this.setState({
            name: '',
            exchangename: '',
            companycode: ''
        });
    }

    render() {
        return (<>
            <div class="a">
                <h2 >Add New Company Stock Exchange Mapping</h2>
            </div>
            <br/><br/> 
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

            }}>
                <form style={{ fontSize: '15px' }} onSubmit={this.submit}>
                    <label>
                        Company name</label>
                    <input
                        name="name"
                        value={this.state.name}
                        onChange={this.handleInputChange} />
                    <br /><br />

                    <label>
                        Exchange name</label>
                    <input
                        name="exchangename"
                        value={this.state.exchangename}
                        onChange={this.handleInputChange} />
                    <br /><br />

                    <label>
                        Company Code</label>
                    <input
                        name="companycode"
                        value={this.state.companycode}
                        onChange={this.handleInputChange} />
                    <br /><br />

                    <label>
                    </label>
                    <button type="submit">Save now </button>
                </form></div></>
        );
    }
}
export default CompStockMap;
