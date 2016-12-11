var logs = true;
//TODO: refactor everything:
    //TODO: change parameters of getUserInputNumbers to combine object and property ones -- NOPE, can't do
    //TODO: rename displayResult to displayNumbers
//TODO: Generate html with js loop
//TODO: pull lines 44-48 & 63-67 into a function
//TODO: Deal with NULL: if user enters '. / 6' , make it into: '0.0 / 6' and vice versa
//TODO: don't change display or allow submit on click if all property's aren't filled: aka '3 =, submit'
//TODO: allow reamining number after operation to count towards next operation unless user presses clear
//TODO: if user presses an operater first, populate x value with 0
//TODO: have clear button toggle between A and AC when appropriate
//TODO: Add a tau button!
var Operation = function(x, y, type) {
  this.x = x;
  this.y = y;
  this.type = type;
}; // end Operation

var displayResult = function(number){
  if (logs) console.log('in displayResult');
  if (number === undefined) {
    //display error message if no numbers have been entered when = is clicked
    $('.display').text('error');
  } else {
    $('.display').text(number);
  } // end else
}; // end displayResult

var getUserInputNumbers = function(object, property, number) {
  if (logs) console.log('in createInputNumber');
  if (object[property] === undefined) {
    object[property] = number;
    displayResult(object[property]);
  } else {
    object[property] = object[property] + number;
    displayResult(object[property]);
  } // end else
}; // end createInputNumber

var init = function() {
  if (logs) console.log('in init');
  //create operation object
  var operationObj = new Operation();
  //event listeners
  $('.btn-num').on('click', function() {
    numberClicked = $(this).text();
    if (operationObj.type === undefined) {
      getUserInputNumbers(operationObj, 'x', numberClicked);
    } else {
      getUserInputNumbers(operationObj, 'y', numberClicked);
    } // end else
    if (logs) console.log('.btn-num Clicked:',operationObj);
  }); // end .btn-num onclick
  $('.btn-type').on('click', function() {
    operationObj.type = $(this).text();
    //replace special html characters with recognized js operators
    if (operationObj.type === '÷') {
      operationObj.type = '/';
    } else if ( operationObj.type === '×') {
      operationObj.type = 'x';
    }
    if (logs) console.log('opeartion after .btn-type', operationObj);
  }); // end .btn-type onclick
  $('#submit').on('click', function(){
    submit(operationObj);
  });
  $('#clear').on('click', function() {
    reset(operationObj);
  }); // end #clear onclick
}; // end init

var setPostUrl = function(object) {
  var url;
  //change post url depending on operator type
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
  console.log('url after case switch:', url);
  return url;
};

var postOperation = function(object) {
  if (logs) console.log('in postOperation. object type:', object.type);
  // console.log(setPostUrl(object));
  // setPostUrl(object);

  $.ajax({
    type: 'POST',
    // url: '/',
    url: setPostUrl(object),
    data: object,
    success: function(response) {
      if (logs) console.log('ajax post success. Response:', response);
      displayResult(response.result);
    }, // end success
    error: function() {
      if (logs) console.log('ajax error on post');
    } // end error
  }); // end ajax post
}; // end postOperation

var reset = function(object) {
  if (logs) console.log('in reset');
  //clear result displayed on DOM
  $('#display').html('<p class="display">0</p>');
  //clear values of operation
  object.x = undefined;
  object.y = undefined;
  object.type = undefined;
  //TODO: RESET THE RESULT
  if (logs) console.log('operation after reset:', object);
}; // end reset

var submit = function(object) {
  if (logs) console.log('in submit');
  postOperation(object);
  //clear input and select fields
  $('input').val('');
  $('select').children().first().prop('selected', true);
}; // end submit

$(document).ready(function() {
  init();
}); // end doc ready
