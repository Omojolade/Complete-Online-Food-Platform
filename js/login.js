$(document).ready(function() {
//Login Function
$('.loginSubmitBtn').click(function(event) {
    event.preventDefault();
    const passwordLogin = $('#passwordLogin').val();
    const emailLogin = $('#emailLogin').val();
    if (!passwordLogin || !emailLogin) {
      $('.regMessage').html('Kindly fill in all fields');
      
      return;
    }
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/users?email=${emailLogin}&password=${passwordLogin}`,
      data: {
        email: emailLogin,
        password: passwordLogin,
      },
      beforeSend: function() {
        $('.regMessage').html('Loading....');
      },
    
      success: function(response) {
       if(response.length){
          const user = response[0]
        
          $('.regMessage').html('Login sucessful');
          $('.checkLogin').html('You are logged in');
          localStorage.setItem('user', JSON.stringify(user));
          //redirect to menu page if the login is successfull
          window.location ='menu.html';  }
          else {
            $('.regMessage').html('Incorrect email/password');
          }        
      },
    });
  });
});