import React, { Component } from 'react';
import './App.css';

function Display(props){
  var text = props.displayText;
  // text = ['5','+','3'];
  const displayText = <div className = "displayText">{text}</div>;
  return<div className="display">{displayText}</div>;
}

function MiddleRow(props) {
  var buttons = props.buttons;
  var digitHandler = props.digitHandler;
  var operatorHandler = props.operatorHandler;
  return <div className="middle"><button className="digit" onClick={ () => { digitHandler( buttons[0]) } }>{buttons[0]}</button><button className="digit" onClick={ () => { digitHandler( buttons[1]) } }>{buttons[1]}</button><button className="digit" onClick={ () => { digitHandler( buttons[2]) } }>{buttons[2]}</button><button className="operator" onClick = { () => { operatorHandler(buttons[3]) } }>{buttons[3]}</button></div>;
}

function TopRow(props){
  var clearHandler = props.clearHandler;
  var operatorHandler = props.operatorHandler;
  return <div className="top"><button id="clear" onClick={clearHandler}>clear</button><button className="operator" onClick = { () => { operatorHandler('÷')} } >÷</button></div>;
}

function BottomRow(props){
  var buttons = props.buttons;
  var digitHandler = props.digitHandler;
  var operatorHandler = props.operatorHandler;
  return <div className="bottom"><button className="digit" onClick={ () => { digitHandler( buttons[0]) } }>{buttons[0]}</button><button className="digit" onClick={ () => { digitHandler( buttons[1]) } }>{buttons[1]}</button><button className="digit" onClick={ () => { digitHandler( buttons[2]) } }>{buttons[2]}</button><button className="operator" onClick = { () => {operatorHandler(buttons[3])} }>{buttons[3]}</button></div>;
}

class App extends Component {

  constructor(props){
    super(props);
    this.state =  { displayText: ['3','4'] } ;
  }

  clearHandler(){
    this.setState(state => ({
      displayText:[]
    }));
  }

  digitHandler(digit){
    this.setState(state => ({
      displayText: state.displayText + digit
    }));
  }

  operatorHandler(operator){
    if ( operator =='=')
      operator = [];
    this.setState(state => ({
      displayText:this.parseInput(state.displayText) + operator
    }));
  }

  operate(op1,op2,operator){
    op1 = this.getOperand(op1);
    op2 = this.getOperand(op2);
    var result = 0;
    if ( operator == '-')
      result = op1 - op2;
    if ( operator == '+')
      result = op1 + op2;
    if ( operator == '÷')
      result = op1/op2;
    return result.toString();
  }

  getOperand(str){
    if(isNaN(str)){
      console.log("Fuck got an error in the string!!! returning the default");
      return 1;
    }
    return parseInt(str,10);
  }

  parseInput(displayText){
    var output=0;
    var operand = "";
    var operator = "";
    var op1 = "";
    for(let characterIndex in displayText){
      var ch = displayText[characterIndex];
      if(ch == '+' || ch =='-' || ch =='÷' || ch =='='){
        op1 = operand;
        operand = "";
        operator = ch;
      } else {
        operand = operand + ch;
      }
    }
    if (operator =="")
      return this.operate(operand,"0",'+');
    return this.operate(op1,operand,operator);
  }

  render() {
    return (
      <div className="App">
        <Display displayText={this.state.displayText} />
        <TopRow clearHandler={this.clearHandler.bind(this)} operatorHandler={this.operatorHandler.bind(this)}/>
        <MiddleRow digitHandler={this.digitHandler.bind(this)} operatorHandler={this.operatorHandler.bind(this)} buttons={[7,8,9,'-']} />
        <MiddleRow digitHandler={this.digitHandler.bind(this)} operatorHandler={this.operatorHandler.bind(this)} buttons={[4,5,6,'+']} />
        <BottomRow digitHandler={this.digitHandler.bind(this)} operatorHandler={this.operatorHandler.bind(this)} buttons={[1,2,3,'=']} />
      </div>
    );
  }
}

export default App;
