/* xlsx.js (C) 2013-present  SheetJS -- http://sheetjs.com */
/* Notes:
   - usage: `ReactDOM.render( <SheetJSApp />, document.getElementById('app') );`
   - xlsx.full.min.js is loaded in the head of the HTML page
   - this script should be referenced with type="text/babel"
   - babel.js in-browser transpiler should be loaded before this script
*/
import React from "react";
import XLSX from "xlsx";
import './Data.css';

import Table from 'react-bootstrap/Table'


function convertDate(date, time) {
  //var d = new Date();
  var yy = parseInt(date.substr(6, 10)),
    mn = parseInt(date.substr(3, 5)),
    dd = parseInt(date.substr(0, 2)),
    hh = parseInt(time.substr(0, 2)),
    mm = parseInt(time.substr(3, 5)),
    ss = parseInt(time.substr(6, 8));
  var d = new Date(yy, mn - 1, dd, hh, mm, ss);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  console.log(d);
  //console.log("yy "+yy+" mn "+mn+" dd "+dd+" hh "+hh+" mm "+mm+" "+" ss "+ss);
  return d;
  //return [date.getFullYear(), mnth, day].join("-");
}

function saveCompany(e) {

  //console.log(e);
  //e.preventDefault();
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
      "exchangename": e[1].trim(),
      "companycode": e[0].trim(),
      "date": convertDate(e[3], e[4].trim()),
      "time": e[4].trim(),
      "shareprice": e[2].trim(),
      "totalNumberOfShares": e[5].trim()
    })
  };

  //console.log(myInit1.body);
  let authurl = 'https://advaittest.herokuapp.com/addstockprices';
  fetch(authurl, myInit1)
    .then((response) => {
      console.log("data sent");
      return response.text();
    })
    .then(function (myJson) {
      console.log(myJson);
    });
}

export default class SheetJSApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [] /* Array of Arrays e.g. [["a","b"],[1,2]] */,
      cols: [] /* Array of column objects e.g. { name: "C", K: 2 } */
    };
    this.handleFile = this.handleFile.bind(this);
    this.exportFile = this.exportFile.bind(this);
  }



  handleFile(file /*:File*/) {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = e => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array", cellText: false, cellDates: true });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      console.log(rABS, wb);
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, dateNF: 'dd-mm-yyyy' });
      //saveCompany(data[1]);
      for (var i = 1; i < data.length; i++) {
        if (data[i].length === 6) {
          saveCompany(data[i]);
        }
      }

      console.log("this data needs to be passed to rest endpoint to save prices data[0]" + data[0]);
      /* Update state */
      this.setState({ data: data, cols: make_cols(ws["!ref"]) });
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);


  }
  exportFile() {
    /* convert state to workbook */
    const ws = XLSX.utils.aoa_to_sheet(this.state.data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, "sheetjs.xlsx");
  }
  render() {
    return (
      <div class="a">
        <DragDropFile handleFile={this.handleFile}>
          <div className="row">
            <div className="col-xs-12">
              <DataInput handleFile={this.handleFile} />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-xs-12"><label></label>
              <button
                disabled={!this.state.data.length}
                className="btn btn-success"
                onClick={this.exportFile}
              >
                Export
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <OutTable data={this.state.data} cols={this.state.cols} />
            </div>
          </div>
        </DragDropFile>
      </div>
    );
  }
}

/* -------------------------------------------------------------------------- */

/*
  Simple HTML5 file drag-and-drop wrapper
  usage: <DragDropFile handleFile={handleFile}>...</DragDropFile>
    handleFile(file:File):void;
*/
class DragDropFile extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }
  suppress(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }
  onDrop(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    const files = evt.dataTransfer.files;
    if (files && files[0]) this.props.handleFile(files[0]);
  }
  render() {
    return (
      <div
        onDrop={this.onDrop}
        onDragEnter={this.suppress}
        onDragOver={this.suppress}
      >
        {this.props.children}
      </div>
    );
  }
}

/*
  Simple HTML5 file input wrapper
  usage: <DataInput handleFile={callback} />
    handleFile(file:File):void;
*/
class DataInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.props.handleFile(files[0]);
  }
  render() {
    return (
      <form className="form-inline">
        <div className="form-group">
          <label htmlFor="file">Select Excel file to upload:</label>
          <input
            type="file"
            className="form-control"
            id="file"
            accept={SheetJSFT}
            onChange={this.handleChange}
          />
        </div>
      </form>
    );
  }
}

/*
  Simple HTML Table
  usage: <OutTable data={data} cols={cols} />
    data:Array<Array<any> >;
    cols:Array<{name:string, key:number|string}>;
*/
class OutTable extends React.Component {

  render() {
    const items = [];
    for (const [index, value] of this.props.data.entries()) {
      if (value.length >= 6) {
        console.log("value :" + value);
        items.push(<tr>
          <td>{value[0]}</td>
          <td>{value[1]}</td>
          <td>{value[2]}</td>
          <td>{value[3]}</td>
          <td>{value[4]}</td>
          <td>{value[5]}</td>
        </tr>);
      }

    }
    if (items.length > 1)
      return (
        <div className="table-responsive">
          <Table striped bordered hover size="sm">

            <h3>Data Uploaded</h3>

            <tbody>
              {items}
            </tbody>

          </Table>
        </div>
      );
      else return null;
  }
}

/* list of supported file types */
const SheetJSFT = [
  "xlsx",
  "xlsb",
  "xlsm",
  "xls",
  "xml",
  "csv",
  "txt",
  "ods",
  "fods",
  "uos",
  "sylk",
  "dif",
  "dbf",
  "prn",
  "qpw",
  "123",
  "wb*",
  "wq*",
  "html",
  "htm"
]
  .map(function (x) {
    return "." + x;
  })
  .join(",");

/* generate an array of column objects */
const make_cols = refstr => {
  let o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i };
  return o;
};
