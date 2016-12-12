//TODO: refactor validateInput
//TODO: have clear button toggle between A and AC when appropriate
//TODO: get rid of console.logs and logs variable

var logs = true;
var prevResult;

var Operation =  function(x, y, type){
  this.x = undefined;
  this.y = undefined;
  this.type= undefined;
}; // end Operation
var operationObj = new Operation();

var displayNumbers = function(number){
  if (logs) console.log('in displayNumbers', number);
  //add a leading zero if number begins with decimal point
  if (number[0] === '.') {
    number = 0+number;
  } // end if
  $('.display').text(number);
}; // end displayNumbers

var getNumbersIn = function(property, number) {
  if (logs) console.log('in getNumbersIn');
  //concatenate numbers entered to form complete values
  if (operationObj[property] === undefined) {
    operationObj[property] = number;
    displayNumbers(operationObj[property]);
  } else {
    operationObj[property] = operationObj[property] + number;
    displayNumbers(operationObj[property]);
  } // end else
}; // end getNumbersIn

var init = function() {
  $('.btn-num').on('click', numClick);
  $('.btn-type').on('click', operatorClick);
  $('#submit').on('click', validateInput);
  $('#clear').on('click', reset);
}; // end init

var numClick = function() {
  numberClicked = $(event.target).text();
  //assign numbers entered before operatorClick X property, else assign to Y
  if (operationObj.type === undefined) {
    getNumbersIn('x', numberClicked);
  } else {
    getNumbersIn('y', numberClicked);
  } // end else
  if (logs) console.log('in numClick:',operationObj);
}; // end numClick

var operatorClick = function() {
  operationObj.type = $(event.target).data('type');
  if (logs) console.log('in operatorClick', operationObj);
}; // end operatorClick

var postOperation = function() {
  if (logs) console.log('in postOperation. posting: ', operationObj);
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
  //clear properties in object
  operationObj = new Operation();
}; // end postOperation

var reset = function(type) {
  if (logs) console.log('in reset');
  //clear operationObj values and prevResult, display zero on DOM
  displayNumbers(0);
  prevResult = 0;
  operationObj = new Operation();
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
  } // end switch
  return url;
}; // end setPostUrl

var validateInput = function(){
  console.log('in validateInput');
  //If user presses "=" before any other input, prevent postOperation and display 0
  if (operationObj.x === undefined && operationObj.y === undefined && operationObj.type === undefined) {
    displayNumbers(0);
  } else if (validateOperator()) {
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
      if (prevResult === undefined) {
        prevResult = 0;
      }
      operationObj.x = prevResult;
      return true;
    case '.':
      operationObj.x = 0.0;
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
    case '.':
      operationObj.y = 0.0;
      return true;
    default: return false;
  } // end switch
}; // end validateY

$(document).ready(function() {
  init();
}); // end doc ready
