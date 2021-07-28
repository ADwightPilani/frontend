import React, { useState } from 'react';
import './ManageIPO.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class ManageSector extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            dataArray: [],
            name: ''
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
        console.log("ye hai " + event.target.value);
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
        fetch('https://advaittest.herokuapp.com/getAllSectors',myInit1)
            .then(response => response.json())
            .then(data => { console.log("data :" + data[0]); this.setState({ dataArray: data }) });

    }

    render() {
        console.log("hii" + this.state.dataArray[0]);
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
                            Sector Name: {value[1]} &emsp;&emsp;
                        </Card.Text>

                    </Card.Body>
                </Card>
            )
        }}catch(TypeError){

        }

        return (<>
            <div class="a">
                <h1 >List of Sectors</h1>
            </div>
            <div>
                {items}
            </div>
        </>
        )
    }
}
export default ManageSector;