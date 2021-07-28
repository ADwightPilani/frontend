import React from 'react';
//import ReactDOM from 'react-dom';
//import logo from './logo.svg';
import './Company.css';


class Sector extends React.Component {
    constructor(props) {
        super(props);
        //console.log("Date() format: "+new Date());
        //let today = new Date(),
        //console.log("Date() format: "+today);
        //get time from date
        //timex = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        this.state = {
            name: ''
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
                "sectorName": this.state.name
                //"totalNumberOfShares":this.state.totalNumberOfShares
            })


        };
        console.log(myInit1.body);
        let authurl = 'http://localhost:8080/addsector';
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
            name: ''
        });
    }

    render() {
        return (<>
            <div class="a">
                <h2 >Add New Sector</h2>
            </div> <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

            }}>
                <form style={{ fontSize: '15px' }} onSubmit={this.submit}>
                    <label>
                        Sector name</label>
                    <input
                        name="name"
                        value={this.state.name}
                        onChange={this.handleInputChange} />
                    <br /><br />

                    <label>
                    </label>
                    <button type="submit">Add </button>
                </form></div></>
        );
    }
}
export default Sector;
