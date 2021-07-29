import React, { useState } from 'react';
import './ManageIPO.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

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
class ManageIPO extends React.Component {

    constructor(props) {
        super(props); //timex = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        this.state = {
            dataArray: [],
            pricePerShare: '',
            totalNumberOfShares: '',
            companyname: '',
            stockexchangename: '',
            // openDateTime:'',
            date: '',
            time: '',
            remarks: '',
            id: '',
            index: '',
            isEdit: false
            //totalNumberOfShares:0
        };
        this.handleClick = this.handleClick.bind(this);
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
        // console.log("ye hai " + event.target.value);
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
                "companyname": this.state.dataArray[this.state.index][2],
                "openDateTime": convertDate(this.state.date, this.state.time),
                "remarks": this.state.remarks
                //"totalNumberOfShares":this.state.totalNumberOfShares
            })


        };
        alert(myInit1.body);
        let authurl = 'https://advaittest.herokuapp.com/editIpo';
        //this may fail as many records in user are laredy tharer
        //console.log("Date() format: ");
        //console.log("yeh id = "+myInit1.body.id);
        //console.log('newdate'+myInit1.body.date);
        fetch(authurl, myInit1)
            .then((response) => {
                console.log("data sent");
                return response.text();
            })
            .then(function (myJson) {
                console.log(myJson);
            });

        this.handleChange(e);

        this.setState({
            pricePerShare: '',
            totalNumberOfShares: '',
            companyname: '',
            stockexchangename: '',
            // openDateTime:'',
            date: '',
            time: '',
            remarks: '',
            id: '',
        });

        this.setState(prevState => ({
            isEdit: !prevState.isEdit
        }));;
    }
    componentDidMount() {
        // Simple GET request using fetch
        const myInit1 = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Vary': 'Origin'.replace,
                'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
                'Accept': 'application/json'
            }
        };
        fetch('https://advaittest.herokuapp.com/getAllIPO', myInit1)
            .then(response => response.json())
            .then(data => { console.log("data :" + data[0]); this.setState({ dataArray: data }) });

    }

    handleClick = (newid) => {
        this.setState(prevState => ({
            isEdit: !prevState.isEdit,
            index: newid
        }));
    }
    render() {
        console.log("hii" + this.state.dataArray[0]);
        const elements = ['one', 'two', 'three', 'four'];
        var elements1 = this.state.dataArray;
        if (this.state.isEdit) {
            return <>
                <div class="box9" style={{
                    // display: 'flex',
                    alignItems: 'center',
                    // justifyContent: 'center',

                }}>
                    <div class="a">
                        <h2 >Edit IPO</h2>
                    </div> <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}>
                        <form style={{ fontSize: '15px' }} onSubmit={this.submit}>
                            <label>
                                Company name</label>
                            {elements1[this.state.index][2]}
                            <br /><br />

                            <label>
                                Company Code</label>
                            {elements1[this.state.index][1]}
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
                            {elements1[this.state.index][6]}
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
                            <button type="submit" >Save now {this.state.id}</button>

                            &emsp;
                            <button onClick={() => this.handleClick()}>
                                Cancel
                                {/* {this.state.id = value[0]} */}
                            </button>
                        </form></div>
                </div>
            </>;
        }
        const items = [];
        try {
            for (const [index, value] of elements1.entries()) {
                items.push(
                    <div class="box10" style={{
                        // display: 'flex',
                        alignItems: 'center',
                        // justifyContent: 'center',

                    }}>
                        <h6 class="card-title">
                            Company Name: &emsp;{value[2]} <br /><br />
                            Company Code: &emsp;{value[1]}<br /><br />
                            Exchange: &emsp;{value[6]}<br /><br />
                            No. of stocks: &emsp;{value[7]} <br /><br />
                            Price of stock: &emsp;{value[4]}<br /><br />
                            DateTime: &emsp;{value[3]}<br /><br />
                            remarks: &emsp;{value[5]}<br /><br />
                        </h6>
                        {/* <Card.Link > */}
                        <label></label>
                        <Button onClick={() => this.handleClick(index)}>
                            Edit
                        </Button>

                    </div>
                )
            }
        } catch (TypeError) {

        }

        return (<>
            <div class="a">
                <h1 >List of IPOs</h1>
            </div>
            <div className="grid">
                {items}
            </div>
        </>
        )
    }
}
export default ManageIPO;