import React, { useState } from 'react';
import './ManageCompanies.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class ViewCompanies extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
      name: '',
      turnover: '',
      ceo: '',
      sectorname: 'insurance',
      boardOfDirectors: '',
      companyBrief: '',
      id: '',
      index: '',
      isEdit: false
      //totalNumberOfShares:0
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
    fetch('http://localhost:8080/getAllCompanies', myInit1)
      .then(response => response.json())
      .then(
        data => {
          console.log("data :" + data[0]);
          this.setState({ dataArray: data })
        }
      );

  }

  render() {
    console.log("hii" + this.state.dataArray[0]);
    var elements1 = this.state.dataArray;
    var currIndex = this.state.index;
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
              Company Name: &emsp;{value[4]} <br /><br />
              Turnover: &emsp;{value[6]}<br /><br />
              CEO: &emsp;{value[2]} <br /><br />
              Sector:&emsp; {value[5]}<br /><br />
              Board of Directors: &emsp;{value[1]}<br /><br />
              Brief: &emsp;{value[3]} <br /><br />
            </h6>
            {/* <Card.Link > */}
            <label></label>
          </div>
        )
      }
    } catch (TypeError) {

    }

    return (<>
      <div class="a">
        <h1 >List of Companies</h1>
      </div>
      <div className="grid">
        {items}
      </div>
    </>
    )
  }
}
export default ViewCompanies;