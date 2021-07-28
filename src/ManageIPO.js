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
            index:'',
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
        console.log("ye hai " + event.target.value);
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
        let authurl = 'http://localhost:8080/editIpo';
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
        fetch('http://localhost:8080/getAllIPO', myInit1)
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
                            totalNumberOfShares</label>
                        <input
                            name="totalNumberOfShares"
                            type="number"
                            value={this.state.turnover}
                            onChange={this.handleInputChange} />
                        <br /><br />

                        <label>
                            pricePerShare</label>
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

                        {/* <label>
      Number of Shares</label>
          <input
            name="totalNumberOfShares"
            type="number"
            value={this.state.totalNumberOfShares}
            onChange={this.handleInputChange} />
        
        
        <br /> */}<label></label>
                        <button type="submit" >Save now {this.state.id}</button>

                        &emsp;
                        <button onClick={() => this.handleClick()}>
                            Cancel
                            {/* {this.state.id = value[0]} */}
                        </button>
                    </form></div>

            </>;
        }
        const items = [];
        try {
            for (const [index, value] of elements1.entries()) {
                // items.push(<li key={index}>{value}</li>)
                // this.setState({id : value[0]});
                // this.state.id = value[0];
                items.push(
                    <Card >
                        <Card.Body>
                            <Card.Text>
                                Company Name: {value[2]} &emsp;&emsp;
                                Company Code: {value[1]} &emsp;&emsp;
                                Exchange: {value[6]}&emsp;&emsp;
                                No. of stocks: {value[7]} &emsp;&emsp;
                                Price of stock: {value[4]}&emsp;&emsp;
                                DateTime: {value[3]}&emsp;&emsp;
                                remarks: {value[5]}
                            </Card.Text>
                            {/* <Card.Link > */}
                            <Button onClick={() => this.handleClick(index)}>
                                Edit
                                {/* {this.state.id = value[0]} */}
                            </Button>
                            {/* </Card.Link> */}
                            {/* <Card.Link href="#">Another Link</Card.Link> */}

                        </Card.Body>
                    </Card>
                )
            }
        } catch (TypeError) {

        }

        return (<>
            <div class="a">
                <h1 >List of IPOs</h1>
            </div>
            <div>
                {items}
            </div>
        </>
        )
    }
}
export default ManageIPO;