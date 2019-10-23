$(document).ready(function() {
    //Admin Login Function
    $('.loginSubmitBtn').click(function(event) {
        event.preventDefault();
        const passwordLogin = $('#passwordLogin').val();
        const emailLogin = $('#emailLogin').val();
        if (!passwordLogin || !emailLogin) {
          $('.regMessage').html('Kindly fill in all fields');
          return;
        }
        //Check if the admin is in the database
        $.ajax({
          method: 'GET',
          url: `http://localhost:3000/admins?email=${emailLogin}&password=${passwordLogin}`,
          data: {
            email: emailLogin,
            password: passwordLogin,
          },
          beforeSend: function() {
            $('.regMessage').html('Loading....');
          },
          success: function(response) {
            if(response.length){
            const admin = response[0]
              $('.regMessage').html('Login sucessful');
              $('.checkLogin').html('You are logged in');
              localStorage.setItem('admin', JSON.stringify(admin));
              //redirect to menu page if the login is successfull
              window.location ='admin.html'; 
            }
            else{
              $('.regMessage').html('Username or password Incorrect');
            }         
          },
        });
      });
    });