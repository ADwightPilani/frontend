import React, { useState } from 'react';
import './ManageIPO.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class ViewIPO extends React.Component {

    constructor(props) {
        super(props); //timex = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        this.state = {
            dataArray: [],
            pricePerShare: '',
            totalNumberOfShares: '',
            companyname: '',
            stockexchangename: '',
            date: '',
            time: '',
            remarks: '',
            id: '',
            index: '',
            isEdit: false
        };
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

    render() {
        console.log("hii" + this.state.dataArray[0]);
        const elements = ['one', 'two', 'three', 'four'];
        var elements1 = this.state.dataArray;

        const items = [];
        try {
            for (const [index, value] of elements1.entries()) {
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

                            <Button onClick={() => this.handleClick(index)}>
                                Edit
                            </Button>

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
export default ViewIPO;