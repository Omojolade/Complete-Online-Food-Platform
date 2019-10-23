$(document).ready(function() {
    let user=localStorage.getItem('user')
    user=JSON.parse(user)
    let user_id=user.id
  
    $(".view-orders").click(function(event){
      event.preventDefault();
      window.location.assign('order.html');
    });
        
          const menuList = $('.food-container')
          $.ajax({
            method: 'GET',
            url: `http://localhost:3000/foods`,
            success: function(foods) {               
                          
                foods.forEach(function(food){
                      menuList.append(`
                      <div class="menu" id='${food.id}'>
                          <div class="zoom">
                                  <img src="${food.image}" alt="food-image" class='food-image' />
                              <p class="a" id='${food.name}'>${food.name}</p>
                              <p class="b" id='${food.price}'>${food.price} Naira</p>
                              <button class="orderSubmitBtn">Order</button>
                          </div>
                      </div>
                      `)
  
                     
                }) 
                // alert(`${food.name}`)
                $('.orderSubmitBtn').click(function(event) {
                  let foodId= $(event.target).closest($('.menu')).attr('id'); 
                  event.preventDefault();
                  
                  
                  menuList.append(`<form method ="POST" action="localhost:3000/orders" id="request">
                  Quantity: <input type="text"  id="quantity" placeholder="Quantity" >
                  Food: <input type="text"  id="food" placeholder="Food eg rice and chicken" >
                  Price: <input type="text"  id="price" placeholder="Price" >
  
              <button class="orderSubmitBtn2">Place order</button>
          </form>`)
  
          foods.forEach(function(food){
            if(foodId==food.id){
              $('#food').val(food.name);
              $('#price').val(food.price);
            }
          })
                   
                  
  
          $('.orderSubmitBtn2').click(function(event){
              event.preventDefault();
        
             
                  let food = $('#food').val();
                  let price = $('#price').val();
                  let quantity = $('#quantity').val();
                  // let user_id= user.id;
                  
                  
            
                  
                  //Check if user input is empty
                  if (!quantity || !food || !price) {
                    $('.regMessage').html('Kindly fill in all fields');
                  }
                  //Post an order
                  $.ajax({
                    method: 'POST',
                    url: 'http://localhost:3000/orders',
                    data: {food,
                    price,
                    quantity,
                    user_id,
                    },
                    
                    beforeSend: function() {
                      $('.regMessage').html('Loading....');
            
                    },
                    success: function(response) {
                      alert("omolade")
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
  
          })
                  
                 
                });
                
                
                
            },
          });
        
      
  
      
         
      });