import React from 'react';
//import ReactDOM from 'react-dom';
//import logo from './logo.svg';
import './Stock.css';
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

class Stock extends React.Component {
  constructor(props) {
    super(props);
    //console.log("Date() format: "+new Date());
    //let today = new Date(),
    //console.log("Date() format: "+today);
    //get time from date
    //timex = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    this.state = {
      exchangename: '',
      companycode: '',
      date: '',
      time: '',
      // isGoing: true,
      shareprice: '',
      totalNumberOfShares: ''
    };
    this.submit = this.submit.bind(this);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
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
        "exchangename": this.state.exchangename,
        "companycode": this.state.companycode,
        "date": convertDate(this.state.date, this.state.time),
        "time": (this.state.time) + ":00",
        "shareprice": this.state.shareprice,
        "totalNumberOfShares": this.state.totalNumberOfShares
      })


    };
    console.log(myInit1.body);
    let authurl = 'https://advaittest.herokuapp.com/addstockprices';
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
      exchangename: '',
      companycode: '',
      date: '',
      time: '',
      // isGoing: true,
      shareprice: '',
      totalNumberOfShares: ''
    });
  }

  render() {
    return (<>
    <br/><br/>
      <div class="a">
        <h2 >Add New Stock</h2>
        <br/><br/>
      </div> <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

      }}>
        <form style={{ fontSize: '15px' }} onSubmit={this.submit}>
          <label>
            Exchange Name</label>
          <input
            name="exchangename"

            value={this.state.exchangename}
            onChange={this.handleInputChange} />

          <br /><br />
          <label>
            Company Code</label>
          <input
            name="companycode"
            value={this.state.companycode}

            onChange={this.handleInputChange} />


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
          {/* <label>
          Is going:</label>
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        <br /><br /> */}
          <label>
            Share Price</label>
          <input
            name="shareprice"
            type="number"
            value={this.state.shareprice}
            onChange={this.handleInputChange} />


          <br /><br />

          <label>
            Number of Shares</label>
          <input
            name="totalNumberOfShares"
            type="number"
            value={this.state.totalNumberOfShares}
            onChange={this.handleInputChange} />


          <br /><br/>
          <label>
          </label>
          <button type="submit">Save now </button>
        </form></div></>
    );
  }
}
export default Stock;
