import React, { Component } from 'react';
import './Company.css';

import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { Redirect } from 'react-router'
import { Typeahead } from 'react-bootstrap-typeahead';
import Form from 'react-bootstrap/Form';
import { Grid, Row, Col } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { DateTime } from 'react-datetime-bootstrap';
import { borderColor } from '@material-ui/system';
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);
let chartConfigs;
let samecompchartConfigs = {
	type: 'column2d',// The chart type
	width: '700', // Width of the chart
	height: '400', // Height of the chart
	dataFormat: 'json', // Data type
	dataSource: {
		// Chart Configuration

		"chart": {
			"caption": "Stock Comparison for Avg stock price in different periods",
			"subCaption": "",
			"xAxisName": "Periods",
			"yAxisName": "Avg Stock Prices (In INR)",
			"numberPrefix": "₹",
			"theme": "fusion"
		},
		"data": [
		]
	}
};


let compchartConfigs = {
	type: 'mscolumn2d',// The chart type
	width: '700', // Width of the chart
	height: '400', // Height of the chart
	dataFormat: 'json', // Data type
	dataSource: {
		"chart": {
			"caption": "Stock Price Comparison",
			"subcaption": "",
			"xaxisname": "Date",
			"yaxisname": "Avg. Stock Price",
			"formatnumberscale": "1",
			"plottooltext":
				"<b>$seriesName</b> stock averaged at <b>$dataValue</b> on $label",
			"theme": "fusion",
			"drawcrossline": "1"
		},
		"categories": [
			{
				"category": [
				]
			}
		],
		"dataset": [
			{
				"seriesname": "",
				"data": []
			}
			,
			{
				"seriesname": "",
				"data": []
			}
		]
		// ,
		// "trendlines": [
		// 	{
		// 		"line": [
		// 			{
		// 				"startvalue": "12250",
		// 				"color": "#0075c2",
		// 				"displayvalue": "",
		// 				"valueOnRight": "1",
		// 				"thickness": "1",
		// 				"showBelow": "1",
		// 				"tooltext": ""
		// 			},
		// 			{
		// 				"startvalue": "25950",
		// 				"color": "#1aaf5d",
		// 				"displayvalue": "",
		// 				"valueOnRight": "1",
		// 				"thickness": "1",
		// 				"showBelow": "1",
		// 				"tooltext": ""
		// 			}
		// 		]
		// 	}
		// ]
	},
};

class ComparisonCharts extends Component {

	constructor(props) {

		super(props);
		this.state = {
			logout:false,
			chartConfigs,
			company11: '',
			company12: '',
			company21: '',
			sector: '',
			startDate1: '',
			endDate1: '',
			startDate21: '',
			endDate21: '',
			startDate22: '',
			endDate22: '',
			startDate31: '',
			endDate31: '',
			startDate32: '',
			endDate32: '',
			companylist: [],
			sectorlist: [],
			chartno:1,
			sector41:'',
			sector42:'',
			startDate4:'',
			endDate4:''
		};

		this.comparecompanies = this.comparecompanies.bind(this);
		this.handleChange11 = this.handleChange11.bind(this);
		this.handleChange12 = this.handleChange12.bind(this);
		this.handleChange21 = this.handleChange21.bind(this);
		this.handleChange41 = this.handleChange41.bind(this);
		this.handleChange42 = this.handleChange42.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.logout = this.logout.bind(this);
	}
	logout = () =>{
		// alert("logout from compcharts");
    	sessionStorage.removeItem("token");
    	sessionStorage.removeItem("user");
		this.setState({
			logout:false
		})
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
		fetch('http://localhost:8080/getAllCompanies',myInit1)
			.then(response => response.json())
			.then(
				data => {
					console.log("company data :" + data[0]);
					this.setState({ companylist: data })
				}
			);

		fetch('http://localhost:8080/getAllSectors',myInit1)
			.then(response => response.json())
			.then(
				data => {
					console.log("sector data :" + data[0]);
					this.setState({ sectorlist: data })
				}
			);

	}

	handleInputChange = (event) => {
		const target = event.target;

		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		// alert(JSON.stringify(event, null, 4));
		this.setState({
			[name]: value
		});
	}

	handleChange11 = (event) => {
		try{
			this.setState({
				company11: event[0].label
			});
		}catch(e){
			console.log("backspace");
			this.setState({
				company11: ''
			});
		}
	}

	handleChange12 = (event) => {
		try{
			this.setState({
				company12: event[0].label
			});
		}catch(e){
			console.log("backspace");
			this.setState({
				company12: ''
			});
		}
	}

	handleChange21 = (event) => {
		try{
			this.setState({
				company21: event[0].label
			});
		}catch(e){
			console.log("backspace");
			this.setState({
				company21: ''
			});
		}
	}

	handleChange = (event) => {
		try{
			this.setState({
				sector: event[0].label
			});
		}catch(e){
			console.log("backspace");
			this.setState({
				sector: ''
			});
		}
	}

	handleChange41 = (event) => {
		try{
			this.setState({
				sector41: event[0].label
			});
		}catch(e){
			console.log("backspace");
			this.setState({
				sector41: ''
			});
		}
	}
	handleChange42 = (event) => {
		try{
			this.setState({
				sector42: event[0].label
			});
		}catch(e){
			console.log("backspace");
			this.setState({
				sector42: ''
			});
		}
	}
	comparecompanies = (e) => {
		this.setState(
			{chartno:1}
		);
		console.log("company11 " + this.state.company11 + " company12 " + this.state.company12 + " startdate " + this.state.startDate1 + " enddate " + this.state.endDate1);
		e.preventDefault();
		const myInit1 = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Vary': 'Origin'.replace,
				'Authorization':'Bearer '+sessionStorage.getItem("token"),
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				"companyName": this.state.company11,
				"sdate": this.state.startDate1,
				"edate": this.state.endDate1,
				//"totalNumberOfShares":this.state.totalNumberOfShares
			})
		};
		// let searchval = this.refs.searchInput.value;//get node value or text value
		// console.log(searchval);
		let data = [];
		let endpoint = 'http://localhost:8080/getspfcb';
		//you need to give end slash ony if you call from rest endpint
		var prevDs = Object.assign({}, compchartConfigs.dataSource);
		fetch(endpoint, myInit1)
			.then(response => {
				return response.json();
			})
			.then(response => {
				// console.log("resp: "+response[0].id);//real print of array

				// alert(JSON.stringify(prevDs, null, 4));
				// console.log(chartConfigs);
				prevDs.dataset[0].seriesname = this.state.company11;
				response.forEach((value, key) => {
					prevDs.categories[0].category[key] =
						{ 'label': response[key][1] };
					prevDs.dataset[0].data[key] = {
						// 'label': response[key][1],
						'value': response[key][0]
					};
					this.setState({
						dataSource: prevDs,
					});
					// console.log('data' + JSON.stringify(data));
				});
				// console.log('this.' + data);
				// console.log('chart' + JSON.stringify(chartConfigs));
			});
		// alert(JSON.stringify(prevDs, null, 4));

		const myInit2 = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Vary': 'Origin'.replace,
				'Authorization':'Bearer '+sessionStorage.getItem("token"),
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				"companyName": this.state.company12,
				"sdate": this.state.startDate1,
				"edate": this.state.endDate1,
				//"totalNumberOfShares":this.state.totalNumberOfShares
			})
		};

		// let searchval = this.refs.searchInput.value;//get node value or text value
		// console.log(searchval);
		let data2 = [];
		//let endpoint = 'http://localhost:8080/getspfcb';
		//you need to give end slash ony if you call from rest endpint
		fetch(endpoint, myInit2)
			.then(response => {
				return response.json();
			})
			.then(response => {
				// console.log("resp: "+response[0].id);//real print of array
				// var prevDs = Object.assign({}, compchartConfigs.dataSource);
				// alert(JSON.stringify(prevDs, null, 4));
				// console.log(chartConfigs);
				prevDs.dataset[1].seriesname = this.state.company12;
				response.forEach((value, key) => {
					prevDs.dataset[1].data[key] = {
						// 'label': response[key][1],
						'value': response[key][0]
					};
					this.setState({
						dataSource: prevDs,
					});
					// console.log('data' + JSON.stringify(data));
				});
				// console.log('this.' + data);
				// console.log('chart' + JSON.stringify(chartConfigs));
			});
		// alert(JSON.stringify(prevDs, null, 4));
		// chartConfigs = compchartConfigs;
	}
	comparesectors = (e) => {
		this.setState(
			{chartno:1}
		);
		// console.log("company11 " + this.state.company11 + " company12 " + this.state.company12 + " startdate " + this.state.startDate1 + " enddate " + this.state.endDate1);
		e.preventDefault();
		const myInit1 = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Vary': 'Origin'.replace,
				'Authorization':'Bearer '+sessionStorage.getItem("token"),
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				"sectorname": this.state.sector41,
				"sdate": this.state.startDate4,
				"edate": this.state.endDate4,
				//"totalNumberOfShares":this.state.totalNumberOfShares
			})
		};
		// alert("sectorname: "+this.state.sector41+" sdate "+this.state.startDate4+" edate "+this.state.endDate4);
		// let searchval = this.refs.searchInput.value;//get node value or text value
		// console.log(searchval);
		let data = [];
		let endpoint = 'https://advaittest.herokuapp.com/getspfsb';
		//you need to give end slash ony if you call from rest endpint
		var prevDs = Object.assign({}, compchartConfigs.dataSource);
		fetch(endpoint, myInit1)
			.then(response => {
				return response.json();
			})
			.then(response => {
				// console.log("resp: "+response[0].id);//real print of array

				// alert(JSON.stringify(prevDs, null, 4));
				// console.log(chartConfigs);
				prevDs.dataset[0].seriesname = this.state.sector41;
				response.forEach((value, key) => {
					prevDs.categories[0].category[key] =
						{ 'label': response[key][1] };
					prevDs.dataset[0].data[key] = {
						// 'label': response[key][1],
						'value': response[key][0]
					};
					this.setState({
						dataSource: prevDs,
					});
					// console.log('data' + JSON.stringify(data));
				});
				// console.log('this.' + data);
				// console.log('chart' + JSON.stringify(chartConfigs));
			});
		// alert(JSON.stringify(prevDs, null, 4));

		const myInit2 = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Vary': 'Origin'.replace,
				'Authorization':'Bearer '+sessionStorage.getItem("token"),
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				"companyName": this.state.sector42,
				"sdate": this.state.startDate4,
				"edate": this.state.endDate4,
				//"totalNumberOfShares":this.state.totalNumberOfShares
			})
		};

		// let searchval = this.refs.searchInput.value;//get node value or text value
		// console.log(searchval);
		let data2 = [];
		//let endpoint = 'http://localhost:8080/getspfcb';
		//you need to give end slash ony if you call from rest endpint
		fetch(endpoint, myInit2)
			.then(response => {
				return response.json();
			})
			.then(response => {
				// console.log("resp: "+response[0].id);//real print of array
				// var prevDs = Object.assign({}, compchartConfigs.dataSource);
				// alert(JSON.stringify(prevDs, null, 4));
				// console.log(chartConfigs);
				prevDs.dataset[1].seriesname = this.state.sector42;
				response.forEach((value, key) => {
					prevDs.dataset[1].data[key] = {
						// 'label': response[key][1],
						'value': response[key][0]
					};
					this.setState({
						dataSource: prevDs,
					});
					// console.log('data' + JSON.stringify(data));
				});
				// console.log('this.' + data);
				// console.log('chart' + JSON.stringify(chartConfigs));
			});
		// alert(JSON.stringify(prevDs, null, 4));
		// chartConfigs = compchartConfigs;
	}
	compareperiods = (e) =>{
		
		// console.log("company11 " + this.state.company11 + " company12 " + this.state.company12 + " startdate " + this.state.startDate1 + " enddate " + this.state.endDate1);
		
		
		e.preventDefault();
		this.setState({
			chartno:2
		})
		const myInit1 = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Vary': 'Origin'.replace,
				'Authorization':'Bearer '+sessionStorage.getItem("token"),
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				"companyName": this.state.company21,
				"sdate": this.state.startDate21,
				"edate": this.state.endDate21,
				//"totalNumberOfShares":this.state.totalNumberOfShares
			})
		};
		// let searchval = this.refs.searchInput.value;//get node value or text value
		// console.log(searchval);
		let data = [];
		let endpoint = 'http://localhost:8080/getavg';
		//you need to give end slash ony if you call from rest endpint
		var prevDs = Object.assign({}, samecompchartConfigs.dataSource);
		fetch(endpoint, myInit1)
			.then(response => {
				return response.json();
			})
			.then(response => {
				// console.log("resp: "+response[0].id);//real print of array
				// prevDs.data[0]=;
				response.forEach((value, key) => {
					prevDs.data[key] = {
						'label': this.state.startDate21+" to "+this.state.endDate21,
						'value': response[key][0]
					};
					this.setState({
						dataSource: prevDs,
					});
					// console.log('data' + JSON.stringify(data));
				});
				// alert(JSON.stringify(prevDs, null, 4));
				// console.log(chartConfigs);
					// consol
				// console.log('this.' + data);
				// console.log('chart' + JSON.stringify(chartConfigs));
			});
		// alert(JSON.stringify(prevDs, null, 4));

		const myInit2 = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Vary': 'Origin'.replace,
				'Authorization':'Bearer '+sessionStorage.getItem("token"),
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				"companyName": this.state.company21,
				"sdate": this.state.startDate22,
				"edate": this.state.endDate22,
				//"totalNumberOfShares":this.state.totalNumberOfShares
			})
		};

		// let searchval = this.refs.searchInput.value;//get node value or text value
		// console.log(searchval);
		let data2 = [];
		//let endpoint = 'http://localhost:8080/getspfcb';
		//you need to give end slash ony if you call from rest endpint
		fetch(endpoint, myInit2)
			.then(response => {
				return response.json();
			})
			.then(response => {
				// console.log("resp: "+response[0].id);//real print of array
				// var prevDs = Object.assign({}, compchartConfigs.dataSource);
				//  alert(JSON.stringify(response, null, 4));
				console.log("response 2nd :"+response);
				
				response.forEach((value, key) => {
					prevDs.data[key+1] = {
						'label': this.state.startDate22+" to "+this.state.endDate22,
						'value': response[key][0]
					};
					this.setState({
						dataSource: prevDs,
					});
					// console.log('data' + JSON.stringify(data));
				});
				// console.log('this.' + data);
				// console.log('chart' + JSON.stringify(chartConfigs));
			});
			// alert(JSON.stringify(prevDs, null, 4));
			console.log("chartno "+this.state.chartno);
		// alert(JSON.stringify(prevDs, null, 4));
		// chartConfigs = compchartConfigs;
	}
	compareperiodsforsector = (e) =>{
		
		// console.log("company11 " + this.state.company11 + " company12 " + this.state.company12 + " startdate " + this.state.startDate1 + " enddate " + this.state.endDate1);
		
		
		e.preventDefault();
		this.setState({
			chartno:3
		})
		const myInit1 = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Vary': 'Origin'.replace,
				'Authorization':'Bearer '+sessionStorage.getItem("token"),
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				"sectorname": this.state.sector,
				"sdate": this.state.startDate31,
				"edate": this.state.endDate31,
				//"totalNumberOfShares":this.state.totalNumberOfShares
			})
		};
		// let searchval = this.refs.searchInput.value;//get node value or text value
		// console.log(searchval);
		let data = [];
		let endpoint = 'http://localhost:8080/getavgsec';
		//you need to give end slash ony if you call from rest endpint
		var prevDs = Object.assign({}, samecompchartConfigs.dataSource);
		fetch(endpoint, myInit1)
			.then(response => {
				return response.json();
			})
			.then(response => {
				// console.log("resp: "+response[0].id);//real print of array
				// prevDs.data[0]=;
				response.forEach((value, key) => {
					prevDs.data[key] = {
						'label': this.state.startDate31+" to "+this.state.endDate31,
						'value': response[key][0]
					};
					this.setState({
						dataSource: prevDs,
					});
					// console.log('data' + JSON.stringify(data));
				});
				// alert(JSON.stringify(prevDs, null, 4));
				// console.log(chartConfigs);
					// consol
				// console.log('this.' + data);
				// console.log('chart' + JSON.stringify(chartConfigs));
			});
		// alert(JSON.stringify(prevDs, null, 4));

		const myInit2 = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Vary': 'Origin'.replace,
				'Authorization':'Bearer '+sessionStorage.getItem("token"),
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				"sectorname": this.state.sector,
				"sdate": this.state.startDate32,
				"edate": this.state.endDate32,
				//"totalNumberOfShares":this.state.totalNumberOfShares
			})
		};

		// let searchval = this.refs.searchInput.value;//get node value or text value
		// console.log(searchval);
		let data2 = [];
		//let endpoint = 'http://localhost:8080/getspfcb';
		//you need to give end slash ony if you call from rest endpint
		fetch(endpoint, myInit2)
			.then(response => {
				return response.json();
			})
			.then(response => {
				// console.log("resp: "+response[0].id);//real print of array
				// var prevDs = Object.assign({}, compchartConfigs.dataSource);
				//  alert(JSON.stringify(response, null, 4));
				console.log("response 2nd :"+response);
				
				response.forEach((value, key) => {
					prevDs.data[key+1] = {
						'label': this.state.startDate32+" to "+this.state.endDate32,
						'value': response[key][0]
					};
					this.setState({
						dataSource: prevDs,
					});
					// console.log('data' + JSON.stringify(data));
				});
				// console.log('this.' + data);
				// console.log('chart' + JSON.stringify(chartConfigs));
			});
			// alert(JSON.stringify(prevDs, null, 4));
			// console.log("chartno "+this.state.chartno);
		// alert(JSON.stringify(prevDs, null, 4));
		// chartConfigs = compchartConfigs;
	}

	render() {
		if(this.state.logout){

			this.setState({
				logout:false
			})
			return (<Redirect Login/>);
		}
		const data = [];
		var companyoptions = [];
		var sectoroptions = [];
		for (var i = 0; i < this.state.companylist.length; i++) {
			// console.log("adding " + this.state.companylist[i][0])
			companyoptions.push({ label: this.state.companylist[i][4] });
		}
		for (var i = 0; i < this.state.sectorlist.length; i++) {
			// console.log("adding " + this.state.sectorlist[i][0])
			sectoroptions.push({ label: this.state.sectorlist[i][1] });
		}
		let chart;
		if(this.state.chartno==1){
			chart=compchartConfigs;
		}else if(this.state.chartno==2){
			chart=samecompchartConfigs;
		}else if(this.state.chartno==3){
			chart=samecompchartConfigs;
		}else if(this.state.chartno==4){
			chart=compchartConfigs;
		}

		return (<>
			<div className="Chart" align="center">

				<ReactFC {...chart} />
			</div>
			<br/><br/>
			<Row>
				<Form.Label>Compare two companies (Pick two Companies to compare and a date range)</Form.Label>
			</Row>
			<Container fluid >
				<Row>
					<Col>
						<Typeahead
							id="basic-typeahead-single"
							name="company11"
							options={companyoptions}
							placeholder="Company 1"
							value={this.state.company11}
							onChange={this.handleChange11}
						// style={{width: 100}}
						/>
					</Col>
					<Col>
						<Typeahead
							id="basic-typeahead-single"
							name="company12"
							options={companyoptions}
							value={this.state.company12}
							onChange={this.handleChange12}
							placeholder="Company 2"
						// style={{width: 100}}
						/>
					</Col>
					From
					<Col>
						{/* <label>
        Date</label> */}
						<input
							name="startDate1"
							type="date"
							// placeholder="pick from date "
							// style={{height: 17} ,{borderColor: '#d0d4da'}, {shadow:'none'}}
							value={this.state.startDate1}
							onChange={this.handleInputChange}
						/>
					</Col>
					To
					<Col>
						{/* <label>
        Date</label> */}
						<input
							name="endDate1"
							type="date"
							// placeholder="pick from date "
							// style={{height: 17} ,{borderColor: '#d0d4da'}, {shadow:'none'}}
							value={this.state.endDate1}
							onChange={this.handleInputChange}
						/>
					</Col>
					<Col>
						<Button as="input" type="submit" value="Submit" onClick={this.comparecompanies} />
					</Col>
				</Row>
			</Container>

			<br/><br/><br/>
			<Row>
				<Form.Label>Compare two periods for a Company (Pick a Company and two date ranges)</Form.Label>
			</Row>
			<Container fluid >
				<Row>
					<Col>
						<Typeahead
							id="basic-typeahead-single"
							name="company21"
							options={companyoptions}
							placeholder="Company"
							value={this.state.company21}
							onChange={this.handleChange21}
						// style={{width: 100}}
						/>
					</Col>
					From
					<Col>
						{/* <label>
        Date</label> */}
						<input
							name="startDate21"
							type="date"
							// placeholder="pick from date "
							// style={{height: 17} ,{borderColor: '#d0d4da'}, {shadow:'none'}}
							value={this.state.startDate21}
							onChange={this.handleInputChange}
						/>
					</Col>
					To
					<Col>
						{/* <label>
        Date</label> */}
						<input
							name="endDate21"
							type="date"
							// placeholder="pick from date "
							// style={{height: 17} ,{borderColor: '#d0d4da'}, {shadow:'none'}}
							value={this.state.endDate21}
							onChange={this.handleInputChange}
						/>
					</Col>
					From
					<Col>
						{/* <label>
        Date</label> */}
						<input
							name="startDate22"
							type="date"
							// placeholder="pick from date "
							// style={{height: 17} ,{borderColor: '#d0d4da'}, {shadow:'none'}}
							value={this.state.startDate22}
							onChange={this.handleInputChange}
						/>
					</Col>
					To
					<Col>
						{/* <label>
        Date</label> */}
						<input
							name="endDate22"
							type="date"
							// placeholder="pick from date "
							// style={{height: 17} ,{borderColor: '#d0d4da'}, {shadow:'none'}}
							value={this.state.endDate22}
							onChange={this.handleInputChange}
						/>
					</Col>

					<Col>
						<Button as="input" type="submit" value="Submit" onClick={this.compareperiods} />
					</Col>
				</Row>
				{/* <button className="btn btn-default" type="button" onClick={this.dosearch} > Go</button> */}
			</Container>

			<br/><br/><br/>
			<Row>
				<Form.Label>Compare two periods for a Sector (Pick a sector and two date ranges)</Form.Label>
			</Row>
			<Container fluid >
				<Row>
					<Col>
						<Typeahead
							id="basic-typeahead-single"
							name="sector"
							options={sectoroptions}
							placeholder="Sector"
							value={this.state.sector}
							onChange={this.handleChange}
						/>
					</Col>
					From
					<Col>
						{/* <label>
        Date</label> */}
						<input
							name="startDate31"
							type="date"
							// placeholder="pick from date "
							// style={{height: 17} ,{borderColor: '#d0d4da'}, {shadow:'none'}}
							value={this.state.startDate31}
							onChange={this.handleInputChange}
						/>
					</Col>
					To
					<Col>
						{/* <label>
        Date</label> */}
						<input
							name="endDate31"
							type="date"
							// placeholder="pick from date "
							// style={{height: 17} ,{borderColor: '#d0d4da'}, {shadow:'none'}}
							value={this.state.endDate31}
							onChange={this.handleInputChange} 
						/>
					</Col>
					From
					<Col>
						{/* <label>
        Date</label> */}
						<input
							name="startDate32"
							type="date"
							// placeholder="pick from date "
							// style={{height: 17} ,{borderColor: '#d0d4da'}, {shadow:'none'}}
							value={this.state.startDate32}
							onChange={this.handleInputChange} 
						/>
					</Col>
					To
					<Col>
						{/* <label>
        Date</label> */}
						<input
							name="endDate32"
							type="date"
							// placeholder="pick from date "
							// style={{height: 17} ,{borderColor: '#d0d4da'}, {shadow:'none'}}
							value={this.state.endDate32}
							onChange={this.handleInputChange} 
						/>
					</Col>

					<Col>
						<Button as="input" type="submit" value="Submit" onClick={this.compareperiodsforsector} />
					</Col>
				</Row>
				{/* <button className="btn btn-default" type="button" onClick={this.dosearch} > Go</button> */}
			</Container>
			<br/><br/><br/>
			<Row>
				<Form.Label>Compare two sectors (Pick two Sectors to compare and a date range)</Form.Label>
			</Row>
			<Container fluid >
				<Row>
					<Col>
						<Typeahead
							id="basic-typeahead-single"
							name="sector41"
							options={sectoroptions}
							placeholder="Sector 1"
							value={this.state.sector41}
							onChange={this.handleChange41}
						/>
					</Col>

					<Col>
						<Typeahead
							id="basic-typeahead-single"
							name="sector42"
							options={sectoroptions}
							placeholder="Sector 2"
							value={this.state.sector42}
							onChange={this.handleChange42}
						/>
					</Col>
					From
					<Col>
						{/* <label>
        Date</label> */}
						<input
							name="startDate4"
							type="date"
							// placeholder="pick from date "
							// style={{height: 17} ,{borderColor: '#d0d4da'}, {shadow:'none'}}
							value={this.state.startDate4}
							onChange={this.handleInputChange}
						/>
					</Col>
					To
					<Col>
						{/* <label>
        Date</label> */}
						<input
							name="endDate4"
							type="date"
							// placeholder="pick from date "
							// style={{height: 17} ,{borderColor: '#d0d4da'}, {shadow:'none'}}
							value={this.state.endDate4}
							onChange={this.handleInputChange} 
						/>
					</Col>
					<Col>
						<Button as="input" type="submit" value="Submit" onClick={this.comparesectors} />
					</Col>
				</Row>
				{/* <button className="btn btn-default" type="button" onClick={this.dosearch} > Go</button> */}
			</Container>
			<br/><br/><br/><br/>
			{/* <Col>
						<Button as="input" type="submit" value="Submit" onClick={this.logout} />
			</Col> */}
		
		</>
		);
	}
}

export default ComparisonCharts;