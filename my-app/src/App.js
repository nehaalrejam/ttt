import React, { Component } from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      apiAShow:false
    }
  }

  render() {
    return (
      <div style={{padding: 20}}>
        <TextBoxForm value="C" />
      </div>
    )
  }
}


class TableApp extends Component {

  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      requestFailed: false
    }

        var data = JSON.stringify({count: props.value.value3 ? props.value.value3 : 5, toRemoveStopWords: props.value.value1 ? props.value.value1 : false});

        fetch("http://localhost:8080/getCount", 
        {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: data
        })
        .then(response => {
          if (!response.ok) {
            throw Error("Network request failed")
          }

          return response
        })
        .then(d => d.json())
        .then(d => {
          this.setState({
            githubData: d
          })
        }, () => {
          this.setState({
            requestFailed: true
          })
        })
      
  }

  render() {

    let columns = [];

   columns = [{
     Header: 'Word',
     accessor: 'type' // String-based value accessors!
   }, {
     Header: 'Count',
     accessor: 'name' // String-based value accessors!
   } ]

   if(this.state.githubData){

       var data = []

      var obj = {};

      for (var i =0; i< this.state.githubData.length; i++){
        obj = {};

            obj.type = this.state.githubData[i].type;
          obj.name = this.state.githubData[i].name;

        data.push(obj);
      }

       return (
          <div>
            <ReactTable data={data} columns={columns} />
          </div>
       )
   }else{
     return (
        <div>
          "Loading..."
        </div>
     )
   }

  }
}

class ButtonComponent extends Component {
  constructor(){
    super();
    this.state = {
      showTable:false
    }
  }
  renderTable(showTable){
    if(showTable){
      return(<TableApp value={this.state} />)
    }
  }
  render() {
    return (
      <div>
      <button onClick={() => this.setState({showTable:true})} type="button">{this.props.value}</button><br/><br/>
      {this.renderTable(this.state.showTable)}
      <br/>
      </div>
    );
  }
}


class TextBoxForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {value1: '', value3:"", showTable:false};
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange1(event) {
    this.setState({value1: event.target.checked});
  }

  handleChange3(event) {
    this.setState({value3: event.target.value});
  }

  handleSubmit(event) {
    this.setState({showTable:true});
    event.preventDefault();
  }

  renderTable(showTable){
    if(showTable){
      return(<TableApp value={this.state} />)
    }
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Enter Number:
          <input type="text" placeholder="Exp: 5" value={this.state.value} onChange={this.handleChange3} />
          <br />
          <br />
          To Remove Stop Words:
          <input type="checkbox" value={this.state.value} onChange={this.handleChange1} />
          <br/>
          <br />
        </label>
        <input type="submit" value="Submit" />
        <br />
        <br />
        <br />
        <br />
      </form>
      {this.renderTable(this.state.showTable)}

      </div>
    );

  }
}

export default App;