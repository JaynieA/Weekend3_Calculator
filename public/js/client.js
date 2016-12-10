var Operation = function(x, y, type) {
  this.x = x;
  this.y = y;
  this.type = type;
}; // end Operation

var displayResult = function(number){
  console.log('in displayResult');
  if (number === undefined) {
    //display message if no numbers have been entered when = is clicked
    $('#result').html('<p class="text-center result">Calculator cannot calculate.</p>');
  } else {
    $('#result').html('<p class="text-center result">= ' + number + '</p>');
  } // end else
}; // end displayResult

var getInputNumbers = function(object, property, number) {
  console.log('in createInputNumber');
  if (object[property] === undefined) {
    object[property] = number;
  } else {
    object[property] = object[property] + number;
  } // end else
}; // end createInputNumber

var init = function() {
  console.log('in init');
  //create operation object
  var operation = new Operation();
  //event listeners
  $('.btn-num').on('click', function() {
    numberClicked = $(this).text();
    if (operation.type === undefined) {
      getInputNumbers(operation, 'x', numberClicked);
    } else {
      getInputNumbers(operation, 'y', numberClicked);
    } // end else
    console.log('.btn-num Clicked:',operation);
  }); // end .btn-num onclick
  $('.btn-type').on('click', function() {
    operation.type = $(this).text();
    console.log('opeartion after .btn-type', operation);
  }); // end .btn-type onclick
  $('#submit').on('click', function() {
    postOperation(operation);
    //clear input and select fields
    $('input').val('');
    $('select').children().first().prop('selected', true);
  }); // end #submit onclick
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
      console.log('ajax post success. Response:', response);
      displayResult(response.result);
    },
    error: function() {
      console.log('ajax error on post');
    }
  }); // end ajax post
}; // end postOperation

var reset = function(object) {
  console.log('in reset');
  //clear result displayed on DOM
  $('#result').html('');
  //clear values of operation
  object.x = undefined;
  object.y = undefined;
  object.type = undefined;
  //TODO: RESET THE RESULT
  console.log('operation after reset:', object);
}; // end reset

$(document).ready(function() {
  init();
}); // end doc ready
