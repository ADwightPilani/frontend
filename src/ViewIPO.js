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
        fetch('https://advaittest.herokuapp.com/getAllIPO', myInit1)
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
                                Company Name: &emsp;&emsp;{value[2]} <br /><br />
                                Company Code: &emsp;&emsp;{value[1]}<br /><br />
                                Exchange: &emsp;&emsp;{value[6]}<br /><br />
                                No. of stocks: &emsp;&emsp;{value[7]} <br /><br />
                                Price of stock: &emsp;&emsp;{value[4]}<br /><br />
                                DateTime: &emsp;&emsp;{value[3]}<br /><br />
                                remarks: &emsp;&emsp;{value[5]}<br /><br />
                            </Card.Text>


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
            <div className="grid">
                {items}
            </div>
        </>
        )
    }
}
export default ViewIPO;