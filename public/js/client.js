$(document).ready(function() {

  $.ajax({
    type: 'POST',
    url: '/',
    data: {animal: "dog"},
    success: function(response) {
      console.log('ajax post success. Response:', response);
    },
    error: function() {
      console.log('ajax error on post');
    }
  }); // end ajax post

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

}); // end doc ready
