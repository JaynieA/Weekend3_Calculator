var Operation = function(x, y, type) {
  this.x = x;
  this.y = y;
  this.type = type;
}; // end Operation

var displayResult = function(number){
  $('#result').html('<p class="text-center result">= '+number+'</p>');
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

var reset = function() {
  console.log('in reset');
  //clear input fields
  $('input').val('');
  //add more logic
  //to reset the whole experience here
}; // end reset

$(document).ready(function() {

  //event listeners
  $('#submit').on('click', function() {
    console.log('submit clicked');
    var x = $('#numOneIn').val();
    var y = $('#numTwoIn').val();
    var type = $('#typeIn').val();
    var operation = new Operation(x, y, type);
    postOperation(operation);
    //clear inputs
    $('input').val('');
  }); // end #submit onclick

  $('#clear').on('click', function() {
    console.log('clear clicked');
    reset();
  }); // end #clear onclick
}); // end doc ready
