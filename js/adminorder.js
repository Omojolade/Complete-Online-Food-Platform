$(document).ready(function() {
    const DATABASE_URI = 'http://localhost:3000/orders'
    const orderList = $('.blueTable')
    let userEmail;

    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/users',
        success: function(users) {
            $.ajax({
                method: 'GET',
                url: DATABASE_URI,
                success: function(orders) {        
                 
                                 
                   
                    orders.forEach(function(order){
                        for(let i = 0; i< users.length; i++){
                          if(order.user_id==users[i].id){
                              userEmail =users[i].email;
                          }
                      }
                     
                      orderList.append(`<tr>
                                      <td>${userEmail}</td>
                                      <td>${order.food}</td>
                                      <td>${order.quantity}</td>
                                      <td>${order.price}</td>
                                      </tr>`)
                    
                    })
                  }
              })         
        }

    })
})   