import React, { useState } from 'react';
import './ManageCompanies.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'

class StockPrices extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
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
    fetch('http://localhost:8080/getallstocks', myInit1)
      .then(response => response.json())
      .then(
        data => {
        //   console.log("data :" + data[0]);
          this.setState({ data: data })
        }
      );

  }

  render() {
    const items = [];
    
    for(var i=0; i<this.state.data.length;i++){
        if (this.state.data[i].length >= 5) {
            items.push(<tr>
              <td>{this.state.data[i][0]}</td>
              <td>{this.state.data[i][1]}</td>
              <td>{this.state.data[i][2]}</td>
              <td>{this.state.data[i][3]}</td>
              <td>{this.state.data[i][4]}</td>
            </tr>);
          }
    }
    // for (const [index, value] of this.data.entries()) {
    //   if (value.length >= 5) {
    //     console.log("value :" + value);
    //     items.push(<tr>
    //       <td>{value[0]}</td>
    //       <td>{value[1]}</td>
    //       <td>{value[2]}</td>
    //       <td>{value[3]}</td>
    //       <td>{value[4]}</td>
    //     </tr>);
    //   }

    // }
    if (items.length > 1)
      return (
        <div className="table-responsive">
          <Table striped bordered hover size="sm">
            
            <h3>Stock Data</h3>

            <tbody>
            <tr>
                <td>Company Name</td>
                <td>Company Code</td>
                <td>Date</td>
                <td>Stock Price</td>
                <td>Stock Exchange</td>
            </tr>
              {items}
            </tbody>

          </Table>
        </div>
      );
      else return null;
  }
}
export default StockPrices;