import React from 'react';
import { Redirect } from 'react-router'
import ReactDOM from 'react-dom';
//import logo from './logo.svg';
import './Stock.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: false,
            incorrectCreds:false
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

    submit = (e) => {
        // alert("submitted login");
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
                "password": this.state.password
            })
        };
        console.log(myInit1.body);
        let authurl = 'https://advaittest.herokuapp.com/authenticate';
        if (!!localStorage.getItem("token"))
            localStorage.removeItem("token");
        try {
            fetch(authurl, myInit1)
                .then((response) => {
                    if(response.status!==200)
                    {
                        alert("incorrect credentials");
                       this.setState({
                           incorrectCreds:true
                        })
                    }
                    return response.json();
                })
                .then((myJson) => {
                    if(!this.state.incorrectCreds){
                        // alert("token as receieved: " + myJson.token);
                        sessionStorage.setItem("token", myJson.token);
                        sessionStorage.setItem("user", this.state.username);
                        // alert("isAuth " + !!sessionStorage.getItem("token"));
                        this.setState({
                            redirect: true
                        });
                        this.props.authenticated();
                    }else{
                        this.setState({
                            incorrectCreds:false
                         })
                    }
                        
                }).then();
        } catch (e) {
            alert("caught error");
        } finally {           // this.props.rerenderParentCallback();
        }
    }

    render() {
        console.log("rendering login");
        if (this.state.redirect) {
            return <Redirect to='/comparisonCharts' />;
        }
        return (<>
            <br />
            <div class="a">
                <h2 >Login for existing Users</h2>
                <br /><br />
            </div> <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

            }}>
                <form style={{ fontSize: '15px' }} onSubmit={this.submit}>
                    <label>Username</label>
                    <input
                        name="username"
                        value={this.state.username}
                        onChange={this.handleInputChange} />

                    <br /><br />
                    <label>Password</label>
                    <input
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange} />
                    <br /><br />

                    <label></label>
                    <button type="submit">Login </button>
                </form></div></>
        );
    }
}
export default Login;
