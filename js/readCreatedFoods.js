$(document).ready(function() {
    const DATABASE_URI = 'http://localhost:3000/foods'
    
        const menuList = $('.food-container')
        let admin =localStorage.getItem('admin')
        admin = JSON.parse(admin)
        
        $.ajax({
          method: 'GET',
          url: DATABASE_URI,
          success: function(foods) {               
                         
              foods.forEach(function(food){
                  if(admin.id == 1){
                    menuList.append(`
                    <div class="menu" id='${food.id}'>
                        <div>
                            <img src="${food.image}" alt="food-image" class='food-image' />
                            <div class='food-footer'>
                                <p class='food-name'>${food.name}  ${food.price} Naira</p>
                                <div class='action-container'>
                                    <button class='edit-food'>Edit Item</button>
                                    <button class='delete-food' data-foodid=${food.id}>Delete Item</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `)
                  }
                  else{
                      if(food.admin_id == admin.id){
                    menuList.append(`
                    <div class="menu" id='${food.id}'>
                        <div>
                            <img src="${food.image}" alt="food-image" class='food-image' />
                            <div class='food-footer'>
                                <p class='food-name'>${food.name}  ${food.price} Naira</p>
                                <div class='action-container'>
                                    <button class='edit-food'>Edit Item</button>
                                    <button class='delete-food' data-foodid=${food.id}>Delete Item</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `)
                  }
                  }
              })  
              
              
              $('.delete-food').click(function(event){
                let foodId = event.target.dataset.foodid

                $.ajax({
                    type: 'DELETE',
                    url: `${DATABASE_URI}/${foodId}`,
                    success: function() {
                        $(`#${foodId}`).remove()
                    }
                })
              })

                $('.edit-food').click(function(event){
                    // let foodId = event.target.dataset.foodid
                    let foodId = $(event.target).closest($('.menu')).attr('id'); 
                event.preventDefault();
               
               menuList.append(`<form id="request">
               Upload Image: <input type="text" id="meal-image" placeholder="Upload Image" > <br><br><br>
               Food Name: <input type="text" id="meal-name" placeholder="Food Name" ><br><br><br>
               Price: <input type="text" id="price" placeholder="Price" > <br><br><br>
                <button type="submit" class='edit-food2'>Edit</button></form>`)

                

                $('.edit-food2').click(function(event){
                let mealImage = $('#meal-image').val();
                let mealName = $('#meal-name').val();
                let mealPrice = $('#price').val();

                if (!mealImage || !mealName || !mealPrice) {
                $('.regMessage').html('Kindly fill in all fields');
                }
                else{
                    console.log(mealName);
                let food = {image:mealImage, name: mealName, price: mealPrice}
                    event.preventDefault();
                    alert(mealImage)
                    alert("Omolade")
                    

                
            $.ajax({
                
                        type: 'PATCH',
                        url: `${DATABASE_URI}/${foodId}`,
                        data: food,
                        success: function() {
                            $(`#${foodId}`).html("edited successfully")
                            
                        }
                    })
                }
                })
            })
              
          },
        });
    });        
            
        