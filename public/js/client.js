//TODO: refactor everything:
//TODO: Generate html with js loop
//TODO: pull lines 44-48 & 63-67 into a function
//TODO: Deal with NULL: if user enters '. / 6' , make it into: '0.0 / 6' and vice versa
//TODO: don't change display or allow submit on click if all property's aren't filled: aka '3 =, submit'
//TODO: allow reamining number after operation to count towards next operation unless user presses clear
//TODO: if user presses an operater first, populate x value with 0
//TODO: have clear button toggle between A and AC when appropriate

var logs = true;

var Operation = function(x, y, type) {
  this.x = x;
  this.y = y;
  this.type = type;
}; // end Operation constuctor
var operationObj = new Operation();

var displayNumbers = function(number){
  if (logs) console.log('in displayNumbers');
  if (number === undefined) {
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
  $('#submit').on('click', postOperation);
  $('#clear').on('click', reset);
}; // end init

var numClick = function() {
  if (logs) console.log('in numClick');
  numberClicked = $(event.target).text();
  if (operationObj.type === undefined) {
    getNumbersIn('x', numberClicked);
  } else {
    getNumbersIn('y', numberClicked);
  } // end else
  if (logs) console.log('numClick:',operationObj);
}; // end numClick

var operatorClick = function() {
  //TODO: prevent function from running if first number hasnt been entered yet
  if (logs) console.log('in operatorClick');
  operationObj.type = $(event.target).text();
  //replace special html characters with recognized operators
  //TODO: use data attributes instead
  if (operationObj.type === '÷') {
    operationObj.type = '/';
  } else if ( operationObj.type === '×') {
    operationObj.type = 'x';
  }
  if (logs) console.log('operatorClick', operationObj);
}; // end operatorClick

var postOperation = function() {
  if (logs) console.log('in postOperation');
  $.ajax({
    type: 'POST',
    url: setPostUrl(operationObj),
    data: operationObj,
    success: function(response) {
      if (logs) console.log('ajax post success. Response:', response);
      displayNumbers(response.result);
    }, // end success
    error: function() {
      if (logs) console.log('ajax error on post');
    } // end error
  }); // end ajax post
}; // end postOperation

var reset = function() {
  if (logs) console.log('in reset');
  //clear result displayed on DOM
  $('#display').html('<p class="display">0</p>');
  //clear values of operation
  operationObj.x = undefined;
  operationObj.y = undefined;
  operationObj.type = undefined;
  //TODO: RESET THE RESULT
  if (logs) console.log('operation after reset:', operationObj);
}; // end reset

var setPostUrl = function(object) {
  if (logs) console.log('in setPostUrl');
  var url;
  //set url for ajax post
  switch (object.type) {
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
