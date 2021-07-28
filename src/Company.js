
import React, { useEffect, useState, useRef } from "react";
//import ReactDOM from 'react-dom';
//import logo from './logo.svg';
import './Company.css';
import Form from 'react-bootstrap/Form';

class Company extends React.Component {
    constructor(props) {
        super(props);
        //console.log("Date() format: "+new Date());
        //let today = new Date(),
        //console.log("Date() format: "+today);
        //get time from date
        //timex = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        this.state = {
            name: '',
            turnover: '',
            ceo: '',
            sectorname: 'insurance',
            boardOfDirectors: '',
            companyBrief: '',
            sectorlist: []
            //totalNumberOfShares:0
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
        // console.log("ye hai "+event.target.value);
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
                "name": this.state.name,
                "turnover": this.state.turnover,
                "ceo": this.state.ceo,
                "sectorname": this.state.sectorname,
                "boardOfDirectors": this.state.boardOfDirectors,
                "companyBrief": this.state.companyBrief
                //"totalNumberOfShares":this.state.totalNumberOfShares
            })


        };
        console.log(myInit1.body);
        let authurl = 'https://advaittest.herokuapp.com/company';
        //this may fail as many records in user are laredy tharer
        //console.log("Date() format: ");
        //console.log("yeh "+this.state.date);
        //console.log('newdate'+myInit1.body.date);
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
            turnover: '',
            ceo: '',
            sectorname: 'insurance',
            boardOfDirectors: '',
            companyBrief: '',
            //totalNumberOfShares:0
        });
    }

    render() {
        return (<>
            <br/><br/>
            <div class="a">
                <h2 >Add New Company</h2>
                <br/><br/>
            </div> <div style={{
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
                        Turnover</label>
                    <input
                        name="turnover"
                        type="number"
                        value={this.state.turnover}
                        onChange={this.handleInputChange} />
                    <br /><br />

                    <label>
                        CEO</label>
                    <input
                        name="ceo"
                        value={this.state.ceo}
                        onChange={this.handleInputChange} />
                    <br /><br />

                    <label>
                        Board Of Directors</label>
                    <input
                        name="boardOfDirectors"
                        value={this.state.boardOfDirectors}
                        onChange={this.handleInputChange} />
                    <br /><br />

                    <label>Sector</label>
                    <select name="sectorname" value={this.state.sectorname} onChange={this.handleChange}>
                        <option value="insurance">Insurance</option>
                        <option value="banking">Banking</option>
                        <option value="automobile">Automobile</option>
                        <option value="textile">Textile</option>
                        <option value="aviation">Aviation</option>
                        <option value="petrochemical">Petrochemical</option>
                    </select>
                    <br /><br />

                    <label>
                        Company Brief</label>
                    <input
                        name="companyBrief"
                        value={this.state.companyBrief}
                        onChange={this.handleInputChange} />
                    <br /><br />

                    {/* <label>
      Number of Shares</label>
          <input
            name="totalNumberOfShares"
            type="number"
            value={this.state.totalNumberOfShares}
            onChange={this.handleInputChange} />
        
        
        <br /> */}
                    <label>
                    </label>
                    <button type="submit">Save now </button>
                </form></div></>
        );
    }
}
export default Company;
