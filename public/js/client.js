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
  //clear input and select fields
  $('input').val('');
  $('select').children().first().prop('selected', true);
  //clear result displayed on DOM
  $('#result').html('');
  //add more logic
  //to reset the whole experience here
}; // end reset

$(document).ready(function() {
  var operation = new Operation();
  console.log('operation object on load:', operation);

  //event listeners
  $('.btn-x').on('click', function() {
    if (operation.x === undefined) {
      operation.x = $(this).text();
    } else {
      operation.x = operation.x + $(this).text();
    }
    console.log('operation after .btn-x',operation);
  });

  $('.btn-type').on('click', function() {
    operation.type = $(this).text();
    console.log('opeartion after .btn-type', operation);
  });

  $('.btn-y').on('click', function() {
    if (operation.y === undefined) {
      operation.y = $(this).text();
    } else {
      operation.y = operation.y + $(this).text();
    }
    console.log('operation after .btn-y', operation);
  });



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
