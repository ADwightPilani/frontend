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

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    //console.log("Date() format: "+new Date());
    //let today = new Date(),
    //console.log("Date() format: "+today);
    //get time from date
    //timex = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    this.state = {
      username: '',
      password: '',
      email: '',
      role: 'user'
      //totalNumberOfShares:0
    };
    this.submit = this.submit.bind(this);

    this.handleChange = this.handleChange.bind(this);
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
  handleChange = (event) => {
    // console.log("ye hai "+event.target.value);
    this.setState({ role: event.target.value });
  }
  submit(e) {
    e.preventDefault();
    const myInit1 = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Vary': 'Origin'.replace,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "username": this.state.username,
        "password": this.state.password,
        "email": this.state.email,
        "role": "user"
        //"totalNumberOfShares":this.state.totalNumberOfShares
      })


    };
    console.log(myInit1.body);
    let authurl = 'http://localhost:8080/register';
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
      username: '',
      password: '',
      email: ''
    });
  }

  render() {
    return (<>
      <br />
      <div class="a">
        <h2 >Register new user!</h2>
        <br /><br />
      </div> <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

      }}>
        <form style={{ fontSize: '15px' }} onSubmit={this.submit}>
          <label>
            Username</label>
          <input
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange} />

          <br /><br />
          <label>
            Password</label>
          <input
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange} />
          <br /><br />

          <label>
            Email Address</label>
          <input
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange} />

          <br /><br />
          {/* <label>Role</label>
                    <select name="role" value={this.state.role} onChange={this.handleChange}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <br /><br /> */}
          <br /><br />

          <label>
          </label>
          <button type="submit">Sign Up! </button>
        </form></div></>
    );
  }
}
export default SignUp;
