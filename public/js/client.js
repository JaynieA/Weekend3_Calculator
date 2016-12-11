var logs = true;

var Operation = function(x, y, type) {
  this.x = x;
  this.y = y;
  this.type = type;
}; // end Operation

var displayResult = function(number){
  if (logs) console.log('in displayResult');
  if (number === undefined) {
    //display message if no numbers have been entered when = is clicked
    $('#display').html('<p class="display">error</p>');
  } else {
    $('#display').html('<p class="display">' + number + '</p>');
  } // end else
}; // end displayResult

var getInputNumbers = function(object, property, number) {
  if (logs) console.log('in createInputNumber');
  if (object[property] === undefined) {
    object[property] = number;
    // $('#display').html('<p class="text-center display">' + object[property] + '</p>');
    displayResult(object[property]);
  } else {
    object[property] = object[property] + number;
    displayResult(object[property]);
  } // end else
}; // end createInputNumber

var init = function() {
  if (logs) console.log('in init');
  //create operation object
  var operation = new Operation();
  //event listeners
  $('.btn-num').on('click', function() {
    numberClicked = $(this).text();
    //TODO: pull lines 39-46 & 55-62 into a function
    //TODO: Deal with NULL: if user enters '. / 6' , make it into: '0.0 / 6' and vice versa
    //TODO: don't change display or allow submit on click if all property's aren't filled: aka '3 =, submit'
    //TODO: allow reamining number after operation to count towards next operation unless user presses clear
    //TODO: if user presses an operater first, populate x value with 0
    //TODO: have clear button toggle between A and AC when appropriate
    //TODO: Add a tau button!
    if (operation.type === undefined) {
      getInputNumbers(operation, 'x', numberClicked);
    } else {
      getInputNumbers(operation, 'y', numberClicked);
    } // end else
    if (logs) console.log('.btn-num Clicked:',operation);

  }); // end .btn-num onclick
  $('.btn-type').on('click', function() {
    operation.type = $(this).text();
    // if (logs) console.log('opeartion after .btn-type', operation);
  }); // end .btn-type onclick
  $('.btn-decimal').on('click', function() {
    if (operation.type === undefined) {
      getInputNumbers(operation, 'x', '.');
    } else {
      getInputNumbers(operation, 'y', '.');
    } // end else
    if (logs) console.log('.btn-decimal Clicked:',operation);
  });
  $('#submit').on('click', function(){
    submit(operation);
  });
  $('#clear').on('click', function() {
    reset(operation);
  }); // end #clear onclick
}; // end init

var postOperation = function(object) {
  $.ajax({
    type: 'POST',
    url: '/',
    data: object,
    success: function(response) {
      if (logs) console.log('ajax post success. Response:', response);
      displayResult(response.result);
    },
    error: function() {
      if (logs) console.log('ajax error on post');
    }
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
