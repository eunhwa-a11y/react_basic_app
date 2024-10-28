import React, { Component } from 'react'

export default class Myheader extends Component {
  shouldComponentUpdate(newProps, newState){
    if(newProps.title === this.props.title){
      return false;
    }else{
      return false;
    }
  }
  render() {
    console.log('Myheader render');
    return (
      <header>
        <h1 className="logo" onClick = {()=>{
          this.props.onChangePage();
        }}>{this.props.title}</h1>
        <p>{this.props.desc}</p>
      </header>
    )
  }
}
