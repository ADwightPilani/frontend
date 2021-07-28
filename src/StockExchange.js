import React from 'react';
//import ReactDOM from 'react-dom';
//import logo from './logo.svg';
import './Company.css';
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

class StockExchange extends React.Component {
    constructor(props) {
        super(props);
        //console.log("Date() format: "+new Date());
        //let today = new Date(),
        //console.log("Date() format: "+today);
        //get time from date
        //timex = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        this.state = {
            name: '',
            brief: '',
            address: '',
            remarks: ''
            //totalNumberOfShares:0
        };
        this.submit = this.submit.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange=(event)=> {
        const target = event.target;

        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleChange=(event)=>{
        console.log("ye hai "+event.target.value);
        this.setState({sectorname:event.target.value});
    }
    submit(e) {
        e.preventDefault();
        const myInit1 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Vary': 'Origin'.replace,
                'Authorization':'Bearer '+sessionStorage.getItem("token"),
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "name": this.state.name,
                "brief": this.state.brief,
                "address": this.state.address,
                "remarks": this.state.remarks
                //"totalNumberOfShares":this.state.totalNumberOfShares
            })


        };
        console.log(myInit1.body);
        let authurl = 'http://localhost:8080/createexchange';
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
            brief: '',
            address: '',
            remarks: '',
        });
    }

    render() {
        return (<>
            <div class="a">
                <h2 >Add New Exchange</h2>
            </div> <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

            }}>
                <form style={{ fontSize: '15px' }} onSubmit={this.submit}>
                    <label>
                        Exchange name</label>
                    <input
                        name="name"
                        value={this.state.name}
                        onChange={this.handleInputChange} />
                    <br /><br />
                    <label>
                        brief</label>
                    <input
                        name="brief"
                        value={this.state.brief}
                        onChange={this.handleInputChange} />
                    <br /><br />
                    <label>
                        Address</label>
                    <input
                        name="address"
                        value={this.state.address}
                        onChange={this.handleInputChange} />
                    <br /><br />
                    <label>
                        Remarks</label>
                    <input
                        name="remarks"
                        value={this.state.remarks}
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
export default StockExchange;
