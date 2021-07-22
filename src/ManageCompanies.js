import React from 'react';
import './ManageCompanies.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// function test(){
//   let arr=[[1,2,3],[4,5,6],[7,8,9]];
//   const component = arr.map((arr1)=><mngCompany name={arr1[0]} exchange={arr1[1]} stockprice={arr1[2]}/>);
//   return (<div className="list">{component}</div>);
// }

class ManageCompanies extends React.Component{
  
  constructor(props) {
    super(props);
    //console.log("Date() format: "+new Date());
    //let today = new Date(),
    //console.log("Date() format: "+today);
    //get time from date
    //timex = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    this.state = {
      dataArray:[]
      //totalNumberOfShares:0
    };
  }
  componentDidMount() {
    // Simple GET request using fetch
    fetch('https://api.npms.io/v2/search?q=react')
        .then(response => response.json())
        .then(data => this.setState({ dataArray: data }));
  }
    render(){
      console.log("hii"+this.state.dataArray);
      const elements = ['one', 'two', 'three'];
      var elements1 = [["Reliance","NSE"],["Wipro","BSE"],["TCS","NYSE"]];

      const items = []
    
      for (const [index, value] of elements1.entries()) {
        // items.push(<li key={index}>{value}</li>)
        items.push(
          <Card style={{ width: '55rem' }}>
            <Card.Body>
              <Card.Text>
                Company: {value[0]} &emsp;&emsp;Stock Exchange:{value[1]}
              </Card.Text>
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
          </Card>
        )
      }
    
      return (
        <div>
          {items}
        </div>
      )
    }
}
export default ManageCompanies;