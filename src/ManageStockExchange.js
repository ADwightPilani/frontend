import React, { useState } from 'react';
import './ManageIPO.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// function test(){
//   let arr=[[1,2,3],[4,5,6],[7,8,9]];
//   const component = arr.map((arr1)=><mngCompany name={arr1[0]} exchange={arr1[1]} stockprice={arr1[2]}/>);
//   return (<div className="list">{component}</div>);
// }
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
class ManageStockExchange extends React.Component {

    constructor(props) {
        super(props);
        //console.log("Date() format: "+new Date());
        //let today = new Date(),
        //console.log("Date() format: "+today);
        //get time from date
        //timex = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        this.state = {
            dataArray: [],
            name: '',
            brief: '',
            address: '',
            remarks: '',
            //totalNumberOfShares:0
        };

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
    componentDidMount() {
        // Simple GET request using fetch
        const myInit1 = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Vary': 'Origin'.replace,
				'Authorization':'Bearer '+sessionStorage.getItem("token"),
				'Accept': 'application/json'
			}
		};
        fetch('http://localhost:8080/getAllExchanges',myInit1)
            .then(response => response.json())
            .then(data => { console.log("data :" + data[0]); this.setState({ dataArray: data }) });

    }

    handleClick = (newid) => {
        this.setState(prevState => ({
            isEdit: !prevState.isEdit,
            id: newid
        }));
    }
    render() {
        // console.log("hii" + this.state.dataArray[0]);
        const elements = ['one', 'two', 'three', 'four'];
        var elements1 = this.state.dataArray;
        const items = [];
        try{for (const [index, value] of elements1.entries()) {
            // items.push(<li key={index}>{value}</li>)
            // this.setState({id : value[0]});
            // this.state.id = value[0];
            items.push(
                <Card >
                    <Card.Body>
                        <Card.Text>
                            Name: {value[3]} &emsp;&emsp;
                            Brief: {value[2]}&emsp;&emsp;
                            Address: {value[1]} &emsp;&emsp;
                            Remarks: {value[4]}&emsp;&emsp;
                        </Card.Text>

                    </Card.Body>
                </Card>
            )
        }}catch(TypeError){

        }

        return (<>
            <div class="a">
                <h1 >List of Exchanges</h1>
            </div>
            <div>
                {items}
            </div>
        </>
        )
    }
}
export default ManageStockExchange;