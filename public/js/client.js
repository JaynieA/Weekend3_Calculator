var Operation = function(x, y, type) {
  this.x = x;
  this.y = y;
  this.type = type;
}; // end Operation

var postOperation = function(object) {
  $.ajax({
    type: 'POST',
    url: '/',
    data: object,
    success: function(response) {
      console.log('ajax post success. Response:', response);
    },
    error: function() {
      console.log('ajax error on post');
    }
  }); // end ajax post
}; // end postOperation

$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: '/get',
    success: function(response) {
      console.log('ajax get success. Response:', response);
    },
    error: function() {
      console.log('ajax error on get');
    }
  }); // end ajax get

  //event listeners
  $('#submit').on('click', function() {
    console.log('submit clicked');
    var x = $('#numOneIn').val();
    var y = $('#numTwoIn').val();
    var type = $('#typeIn').val();
    var operation = new Operation(x, y, type);
    postOperation(operation);
  }); // end #submit onclick

  $('#clear').on('click', function() {
    console.log('clear clicked');
    //clear input fields
    $('input').val('');
    //add more logic
    //to reset the whole experience here
  }); // end #clear onclick
}); // end doc ready
