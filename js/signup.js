$(document).ready(function() {

  //Registration Function
  $('.regSubmitBtn').click(function(event) {
    event.preventDefault();
    const yourname = $('#yourname').val();
    const password = $('#password').val();
    const email = $('#email').val();
    //Check if user input is empty
    if (!yourname || !password || !email) {
      $('.regMessage').html('Kindly fill in all fields');
      return;
    }
    //Make get request to check if the user already exist
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/users?email=${email}`,
      data: {
        email,
      },
      beforeSend: function() {
        $('.regMessage').html('Loading....');
      },
      success: function(response) {
        if (response.length) {
          $('.regMessage').html('User already exist');
        } else {
          //Submit the user data if the user does not exist
          $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/users',
            data: {
              yourname,
              email,
              password,
            },
            beforeSend: function() {
              $('.regMessage').html('Loading....');
            },
            success: function() {
              $('.regMessage').html('Registration Successfull');
              window.location = "login.html";
            },
          });
        }
      },
    });
  });
});