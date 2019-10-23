$(document).ready(function() {
  let user = localStorage.getItem('user')
      user = JSON.parse(user)
      const orderList = $('.blueTable')

     
  $.ajax({
    method: 'GET',
    url: `http://localhost:3000/orders?user_id=${user.id}`,
    success: function (orders) {
        orders.forEach(function (order) {
            orderList.append(`<tr>
                              <td>${order.user_id}</td>
                              <td>${order.food}</td>
                              <td>${order.quantity}</td>
                              <td>${order.price}</td>
                              </tr>`)
        })
    }//end of sucess function
});

    //Order Function
    $('.orderSubmitBtn').click(function(event) {
      event.preventDefault();
      const quantity = $('#quantity').val();
      const food = $('#food').val();
      const price = $('#price').val();
      

      
      //Check if user input is empty
      if (!quantity || !food || !price) {
        $('.regMessage').html('Kindly fill in all fields');
        return;
      }
      //Post an order
      $.ajax({
        method: 'POST',
        url: `http://localhost:3000/orders`,
        data: {
          quantity: quantity,
          food: food,
          price: price,
          user_id: user.id
        },
        
        beforeSend: function() {
          $('.regMessage').html('Loading....');

        },
        success: function(response) {
            console.log(response, 'response')
          if (response) {
            $('.regMessage').html('Order Placed Successfully');

            //redirect to orderhistory page if the order placed is successfull
          } else {
            $('.regMessage').html('Orders not placed ');
          }
          location.reload();
        },
      });
     
    });

    
  });