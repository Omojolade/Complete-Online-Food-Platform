$(document).ready(function() {
    //Login Function
    
    $('#addfood').click(function(event) {
        event.preventDefault();
        
        const mealImage = $('#meal-image').val();
        const mealName = $('#meal-name').val();
        const mealPrice = $('#price').val();

        let admin = localStorage.getItem('admin');
        admin = JSON.parse(admin);
        if (!mealImage || !mealName || !mealPrice) {
          $('.regMessage').html('Kindly fill in all fields');
          return;
        }
        

      const food = {image: mealImage, name: mealName, price: mealPrice, admin_id: admin.id}
        
        //Check if the user is in the database 
        $.ajax({
          method: 'POST',
          url: `http://localhost:3000/foods`,
          data: food,
          success: function() {
              //redirect to menu page if the login is successfull
              window.location ='adminmenu.html';          
          },
        });
      });
    });