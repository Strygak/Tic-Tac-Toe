function setForm() {

    $("#loginForm").animate({ left: "23%" });

    $("#login").on("click", function() {
        $("#registerForm").animate({ left: "-60%" }, 500);
        $("#loginForm").animate({ left: "22%" }, 500);
        $("#loginButton1").on("click", function() {
          $("#loginForm").animate({ left: "100%" }, 500);
        });
    });

    $("#back").on("click", function() {
        $("#loginForm").animate({ left: "-60%" }, 500);
        $("#registerForm").animate({ left: "22%" }, 500);
    });

    $("#loginForm").on("submit", function() {

      $.ajax({
          type: "POST",
          url: "/login",
          data: form.serialize(),
          dataType: "json",
          contentType: "application/json; charset=utf-8",
          succes: function (data) { console.log(data); },
          failure: function (data) { console.log(data); } 
      });
      
    });

    $("#registerForm").submit(function(event) {

        $.ajax({
          type: "POST",
          url: "/register",
          data: form.serialize(),
          dataType: "json",
          contentType: "application/json; charset=utf-8",
          succes: function (data) {},
          failure: function (data) { console.log(data); } 
        });
        
        $("#registerForm").animate({ left: "100%" }, 500);
    });
}

setForm();