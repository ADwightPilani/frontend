import React, { useState } from 'react';
import './ManageCompanies.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class ManageCompanies extends React.Component {

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
    this.handleClick = this.handleClick.bind(this);
    this.submit = this.submit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
  submit = (e) => {
    console.log("in submit");
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
        "companyname":this.state.dataArray[this.state.index][4],
        "turnover":this.state.turnover,
        "ceo":this.state.ceo,
        "boardOfDirectors":this.state.boardOfDirectors,
        "brief":this.state.companyBrief
        //"totalNumberOfShares":this.state.totalNumberOfShares
      })
    };
    // alert(myInit1.body);
    let authurl = 'https://advaittest.herokuapp.com/editCompany';
    fetch(authurl, myInit1)
      .then((response) => {
        console.log("data sent");
        return response.text();
      })
      .then(function (myJson) {
        console.log(myJson);
      });

    this.setState({
      name: '',
      turnover: '',
      ceo: '',
      sectorname: 'insurance',
      boardOfDirectors: '',
      companyBrief: '',
      id: '',
    });
    this.setState(prevState => ({
      isEdit: !prevState.isEdit
    }));;
  }
  handleDelete = (e) => {
    e.preventDefault();
    console.log("in delete:");
    const myInit2 = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Vary': 'Origin'.replace,
        'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "id": this.state.id
        //"totalNumberOfShares":this.state.totalNumberOfShares
      })


    };
    console.log(myInit2.body);
    let authurl = 'http://localhost:8080/deleteCompany';
    //this may fail as many records in user are laredy tharer
    //console.log("Date() format: ");
    //console.log("yeh id = "+myInit1.body.id);
    //console.log('newdate'+myInit1.body.date);
    fetch(authurl, myInit2)
      .then((response) => {
        console.log("delete request sent");
        return response.text();
      })
      .then(function (myJson) {
        console.log(myJson);
      });
    this.setState(this.state);
    this.setState(prevState => ({
      isEdit: !prevState.isEdit
    }));
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

  handleClick = (newid) => {
    this.setState(prevState => ({
      isEdit: !prevState.isEdit,
      index: newid
    }));
  }
  render() {
    console.log("hii" + this.state.dataArray[0]);
    // var elements1 = [
    //   ['45','0board', '0ceo', '0brief', '0company name','banking','6','0seven'],
    //   ['66','1one', '1two', '1three', '1four','1five','1six','1seven']
    // ];
    var elements1 = this.state.dataArray;
    var currIndex = this.state.index;
    if (this.state.isEdit) {
      return <>
        <div class="box9" style={{
          // display: 'flex',
          alignItems: 'center',
          // justifyContent: 'center',

        }}>
          <div class="a">
            <h2 >Edit Company</h2>
          </div> <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

          }}>

            <form style={{ fontSize: '15px' }} onSubmit={this.submit}>
              <label>
                Company name</label>
              {elements1[this.state.index][4]}

              <br /><br />

              <label>
                Turnover</label>

              <input
                name="turnover"
                type="number"
                value={this.state.turnover}
                onChange={this.handleInputChange} />
              <br /><br />

              <label>
                ceo</label>
              <input
                name="ceo"
                value={this.state.ceo}
                onChange={this.handleInputChange} />
              <br /><br />

              <label>
                boardOfDirectors</label>
              <input
                name="boardOfDirectors"
                value={this.state.boardOfDirectors}
                onChange={this.handleInputChange} />
              <br /><br />

              <label>
                Sector</label>
              {elements1[this.state.index][5]}
              <br /><br />

              <label>
                companyBrief</label>
              <input
                name="companyBrief"
                value={this.state.companyBrief}
                onChange={this.handleInputChange} />
              <br /><br />
              <label></label>
              <button type="submit" >Save</button>

              &emsp;
              <button onClick={() => this.handleClick()}>
                Cancel
                {/* {this.state.id = value[0]} */}
              </button>
              &emsp;
              <button onClick={this.handleDelete}>
                Delete
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
              Company Name: &emsp;{value[4]} <br /><br />
              Turnover: &emsp;{value[6]}<br /><br />
              CEO: &emsp;{value[2]} <br /><br />
              Sector:&emsp; {value[5]}<br /><br />
              Board of Directors: &emsp;{value[1]}<br /><br />
              Brief: &emsp;{value[3]} <br /><br />
            </h6>
            {/* <Card.Link > */}
            <label></label>
            <Button onClick={() => this.handleClick(index)}>
              Edit
              {/* {this.state.id = value[0]} */}
            </Button>


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
export default ManageCompanies;