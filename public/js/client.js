var logs = false;

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
    if (operation.type === undefined) {
      getInputNumbers(operation, 'x', numberClicked);
      // $('#display').html(operation.x);
    } else {
      getInputNumbers(operation, 'y', numberClicked);
      // $('#display').html(operation.y);
    } // end else
    if (logs) console.log('.btn-num Clicked:',operation);

  }); // end .btn-num onclick
  $('.btn-type').on('click', function() {
    operation.type = $(this).text();
    // if (logs) console.log('opeartion after .btn-type', operation);
  }); // end .btn-type onclick
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
  $('#display').html('');
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
