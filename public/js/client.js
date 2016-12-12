var logs = false;
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
  $('.btn').on('click', function(){
    $('#clear').text('C');
  }); // end .btn click
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
  //display all clear on DOM
  $('#clear').text('AC');
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
  if (logs) console.log('in validateInput');
  //If user presses "=" before any other input, prevent postOperation and display 0
  if (operationObj.x === undefined && operationObj.y === undefined && operationObj.type === undefined) {
    displayNumbers(0);
  } else {
    //If no operator is clicked, prevent postOperation and display X
    if (operationObj.type === undefined) {
      displayNumbers(operationObj.x);
    } else {
      //Validate X and Y, and post the Operation
      validateX();
      validateY();
      postOperation();
    } // end else
  }// end else
}; // end validateInput

var validateX = function() {
  if (logs) console.log('in validateX');
  // If X is undefined: set it to the result of previous operation
  switch (operationObj.x) {
    case undefined:
      //Set prevResult to zero if no operations have been posted yet
      if (prevResult === undefined) { prevResult = 0; }
      operationObj.x = prevResult;
      break;
    case '.':
      operationObj.x = 0.0;
      break;
    default: //do nothing
      break;
  } // end switch
}; // end validateX

var validateY = function() {
  if (logs) console.log('in validateY');
  //If Y is undefined: set it to value of X
  switch (operationObj.y) {
    case undefined:
      operationObj.y = operationObj.x;
      break;
    case '.':
      operationObj.y = 0.0;
      break;
    default: //do nothing
      break;
  } // end switch
}; // end validateY

$(document).ready(function() {
  init();
}); // end doc ready
