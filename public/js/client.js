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

$(document).ready(function() {
  var operation = new Operation();
  console.log('operation object on load:', operation);

  var reset = function() {
    console.log('in reset');
    //clear result displayed on DOM
    $('#result').html('');
    //clear values of operation
    operation.x = undefined;
    operation.y = undefined;
    operation.type = undefined;
    //TODO: RESET THE RESULT
    console.log('operation after reset:', operation);
  }; // end reset
  //event listeners
  $('.btn-num').on('click', function() {
    console.log('number button clicked:', $(this).text());
    if (operation.type === undefined) {
      if (operation.x === undefined) {
        operation.x = $(this).text();
      } else {
        operation.x = operation.x + $(this).text();
      } // end else
    } else {
      if (operation.y === undefined) {
        operation.y = $(this).text();
      } else {
        operation.y = operation.y + $(this).text();
      } // end else
    } // end else
    console.log('operation after .btn-num',operation);
  }); // end .btn-num onclick
  $('.btn-type').on('click', function() {
    operation.type = $(this).text();
    console.log('opeartion after .btn-type', operation);
  }); // end .btn-type onclick
  $('#submit').on('click', function() {
    console.log('submit clicked');
    postOperation(operation);
    //clear input and select fields
    $('input').val('');
    $('select').children().first().prop('selected', true);
  }); // end #submit onclick
  $('#clear').on('click', function() {
    console.log('clear clicked');
    reset();
  }); // end #clear onclick
}); // end doc ready
