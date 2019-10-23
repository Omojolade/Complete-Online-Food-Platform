$(document).ready(function () {
    
    $('#searchBtn').click(function () {
       
        event.preventDefault();
        const foodname = $('#searchval').val();


        $.ajax({
            method: "GET",
            url: "http://localhost:3000/foods",
            success: function (foods) {
                let search = "";

                foods.forEach(function (food) {
                    if (food.name == foodname) {
                        search += "<br>" + "<br>" + "<center>" + 
                        "<br>" + '<img src="' + food.image + 
                        '" width="25%" height="200x"/>' +
                         "<h1>" + food.name + "</h1>" + 
                         "<br>" + '<p>' + food.price + '</p>'

                        $('#viewSearch').html(search);
                    }
                })

            }
        })
    })
});