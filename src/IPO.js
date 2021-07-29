import React, { useEffect, useState, useRef } from "react";
import './IPO.css';
import ReactDOM from 'react-dom';
import SearchCompanies from './SearchCompanies.js';
function convertDate(date, time) {
    //var d = new Date();
    var yy = parseInt(date.substr(0, 4)),
        mn = parseInt(date.substr(5, 7)),
        dd = parseInt(date.substr(8, 10)),
        hh = parseInt(time.substr(0, 2)),
        mm = parseInt(time.substr(3, 5));
    var d = new Date(yy, mn - 1, dd, hh, mm);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
    //console.log("offset "+d.getTimezoneOffset())
    return d;
    //return [date.getFullYear(), mnth, day].join("-");
}

class IPO extends React.Component {
    constructor(props) {
        super(props);
        //console.log("Date() format: "+new Date());
        //let today = new Date(),
        //console.log("Date() format: "+today);
        //get time from date
        //timex = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        this.state = {
            pricePerShare: '',
            totalNumberOfShares: '',
            companyname: '',
            stockexchangename: '',
            // openDateTime:'',
            date: '',
            time: '',
            remarks: '',
            companycode:''
            //totalNumberOfShares:0
        };
        this.submit = this.submit.bind(this);

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
        //console.log("ye hai "+event.target.value);
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
                "pricePerShare": this.state.pricePerShare,
                "totalNumberOfShares": this.state.totalNumberOfShares,
                "companyname": this.state.companyname,
                "companycode":this.state.companycode,
                "stockexchangename": this.state.stockexchangename,
                "openDateTime": convertDate(this.state.date, this.state.time),
                "remarks": this.state.remarks
                //"totalNumberOfShares":this.state.totalNumberOfShares
            })


        };
        console.log(myInit1.body);
        let authurl = 'https://advaittest.herokuapp.com/addipo';
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
            pricePerShare: '',
            totalNumberOfShares: '',
            companyname: '',
            stockexchangename: '',
            // openDateTime:'',
            date: '',
            time: '',
            companycode:'',
            remarks: ''
        });
    }

    render() {
        return (<>
            <div class="a">
                <h2 >Add New IPO</h2>
                <br/><br/>
            </div> <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

            }}>
                <form style={{ fontSize: '15px' }} onSubmit={this.submit}>
                    <label>
                        Company Name</label>
                    <input
                        name="companyname"
                        value={this.state.companyname}
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
                        Total No. Of Shares</label>
                    <input
                        name="totalNumberOfShares"
                        type="number"
                        value={this.state.turnover}
                        onChange={this.handleInputChange} />
                    <br /><br />

                    <label>
                        Price Per Share</label>
                    <input
                        name="pricePerShare"
                        type="number"
                        value={this.state.pricePerShare}
                        onChange={this.handleInputChange} />
                    <br /><br />

                    <label>
                        Stock Exchange Name</label>
                    <input
                        name="stockexchangename"
                        value={this.state.boardOfDirectors}
                        onChange={this.handleInputChange} />
                    <br /><br />

                    <label>
                        Date</label>
                    <input
                        name="date"
                        type="date"
                        value={this.state.date}
                        onChange={this.handleInputChange} />

                    <br /><br />
                    <label>
                        Time</label>
                    <input
                        name="time"
                        type="time"
                        value={this.state.time}
                        onChange={this.handleInputChange} />

                    <br /><br />

                    <label>
                        remarks</label>
                    <input
                        name="remarks"
                        value={this.state.remarks}
                        onChange={this.handleInputChange} />
                    <br /><br />

                    <label></label>
                    <button type="submit">Save </button>
                </form></div></>
        );
    }
}
export default IPO;
