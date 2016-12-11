//TODO: Generate html with js loop
//TODO: pull lines 44-48 & 63-67 into a function
//TODO: Deal with NULL: if user enters '. / 6' , make it into: '0.0 / 6' and vice versa
//TODO: don't change display or allow submit on click if all property's aren't filled: aka '3 =, submit'
//TODO: allow reamining number after operation to count towards next operation unless user presses clear
//TODO: if user presses an operater first, populate x value with 0
//TODO: have clear button toggle between A and AC when appropriate

var logs = true;
var prevResult;
var Operation =  function(x, y, type){
  this.x = undefined;
  this.y = undefined;
  this.type= undefined;
};
var operationObj = new Operation();
console.log(operationObj);

var displayNumbers = function(number){
  if (logs) console.log('in displayNumbers');
  if (number === undefined) {
    console.log('CAUSED AN ERROR');
    //display error message if no numbers have been entered when = is clicked
    $('.display').text('error');
  } else {
    $('.display').text(number);
  } // end else
}; // end displayNumbers

var getNumbersIn = function(property, number) {
  if (logs) console.log('in getNumbersIn');
  if (operationObj[property] === undefined) {
    operationObj[property] = number;
    displayNumbers(operationObj[property]);
  } else {
    operationObj[property] = operationObj[property] + number;
    displayNumbers(operationObj[property]);
  } // end else
}; // end getNumbersIn

var init = function() {
  if (logs) console.log('in init');
  $('.btn-num').on('click', numClick);
  $('.btn-type').on('click', operatorClick);
  $('#submit').on('click', validateInput);
  $('#clear').on('click', reset);
}; // end init

var numClick = function() {
  numberClicked = $(event.target).text();
  if (operationObj.type === undefined) {
    getNumbersIn('x', numberClicked);
  } else {
    getNumbersIn('y', numberClicked);
  } // end else
  if (logs) console.log('in numClick:',operationObj);
}; // end numClick

var operatorClick = function() {
  //TODO: prevent function from running if first number hasnt been entered yet
  operationObj.type = $(event.target).text();
  //replace special html characters with recognized operators
  //TODO: use data attributes instead
  if (operationObj.type === '÷') {
    operationObj.type = '/';
  } else if ( operationObj.type === '×') {
    operationObj.type = 'x';
  }
  if (logs) console.log('in operatorClick', operationObj);
}; // end operatorClick

var validateOperator = function() {
  //If operator is undefined: don't post operation, display X
  switch (operationObj.type) {
    case undefined:
      displayNumbers(operationObj.x);
      return true;
    default: return false;
  } // end switch
}; // end validateOperator

var validateX = function() {
  // If X is undefined: set it to the result of previous operation
  switch (operationObj.x) {
    case undefined:
      //Set prevResult to zero if no operations have been posted yet
      if (prevResult === undefined) { rolloverX = 0; }
      operationObj.x = prevResult;
      return true;
    default: return false;
  } // end switch
}; // end validateX

var validateY = function() {
  //If Y is undefined: set it to value of X
  console.log('in validateY');
  switch (operationObj.y) {
    case undefined:
      console.log('y is undefined');
      operationObj.y = operationObj.x;
      return true;
    default: return false;
  } // end switch
}; // end validateY

var validateInput = function(){
  console.log('in validateInput');
  if (validateOperator()) {
    console.log('validated type');
  } else {
    if (validateX()) {
      console.log('validated x');
    } else if (validateY()) {
        console.log('validated Y');
    } // end else/if
    postOperation();
  } // end else
}; // end validateInput

var postOperation = function() {

  if (logs) console.log('in postOperation. posting: ', operationObj);
  //display error if all properties are not defined
  //TODO: make validateInput function::::only do error if operator not defined, otherwise populate field with 0
  //TODO: match up display/getNumberIn to this functionality
  $.ajax({
    type: 'POST',
    url: setPostUrl(),
    data: operationObj,
    success: function(response) {
      if (logs) console.log('ajax post success. Response:', response);
      displayNumbers(response.result);
      //store result for rollover functionality
      prevResult = response.result;
    }, // end success
    error: function() {
      if (logs) console.log('ajax error on post');
    } // end error
  }); // end ajax post
  ////TODO: do the following through the reset function
  operationObj = new Operation();
}; // end postOperation

var reset = function(type) {
  if (logs) console.log('in reset');
  //clear result displayed on DOM
  $('.display').text('0');
  //clear values of operation
  operationObj = new Operation();
  //TODO: RESET THE RESULT????
  if (logs) console.log('operation after reset:', operationObj);
}; // end reset

var setPostUrl = function() {
  if (logs) console.log('in setPostUrl');
  var url;
  //set url for ajax post
  switch (operationObj.type) {
    case '/':
        url = '/division';
      break;
    case '+':
        url = '/addition';
      break;
    case '-':
        url = '/subtraction';
      break;
    case 'x':
        url = '/multiplication';
      break;
    default:
        url = '/';
  }
  return url;
}; // end setPostUrl

$(document).ready(function() {
  init();
}); // end doc ready
