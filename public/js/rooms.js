$("#exit").on("submit", function() {
	$.ajax({
		type: "GET",
		url: "/logout",
		succes: function (data) { console.log(data); },
	    failure: function (data) { console.log(data); } 
	});
});

$("#room1").on("submit", function() {
	$.ajax({
		type: "GET",
		url: "/room1",
		succes: function (data) { console.log(data); },
	    failure: function (data) { console.log(data); } 
	});
});


$("#room2").on("submit", function() {
	$.ajax({
		type: "GET",
		url: "/room2",
		succes: function (data) { console.log(data); },
	    failure: function (data) { console.log(data); } 
	});
});

$("#room3").on("submit", function() {
	$.ajax({
		type: "GET",
		url: "/room3",
		succes: function (data) { console.log(data); },
	    failure: function (data) { console.log(data); } 
	});
});

$("#room4").on("submit", function() {
	$.ajax({
		type: "GET",
		url: "/room4",
		succes: function (data) { console.log(data); },
	    failure: function (data) { console.log(data); } 
	});
});

$("#room5").on("submit", function() {
	$.ajax({
		type: "GET",
		url: "/room5",
		succes: function (data) { console.log(data); },
	    failure: function (data) { console.log(data); } 
	});
});

$("#room6").on("submit", function() {
	$.ajax({
		type: "GET",
		url: "/room6",
		succes: function (data) { console.log(data); },
	    failure: function (data) { console.log(data); } 
	});
});