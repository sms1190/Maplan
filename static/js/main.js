
var map = new Object();
map["back"] = 'home';
map["home"] = 'home';
map['about'] = 'about';
map['contact'] = 'contact';
map['help'] = 'help';
map['dota2'] = 'dota2';

(function ($) {
    $.fn.onEnter = function (func) {
        this.bind('keypress', function (e) {
            if (e.keyCode == 13) func.apply(this, [e]);
        });
        return this;
    };
})(jQuery);

$(function () {
    $("input#commandBar").focus().onEnter(function () {
	var page = $(this).val().toLowerCase();
        navigate(page);
	$("#commandBar").val("");	
    });
});


function navigate(where) {
    console.log(where);
    if(map[where] === undefined){
    	$.get("static/pages/invalid.txt", function (data) {
     	   $("#mainContent").append(data);
        });
    }
    else if(map[where] == 'dota2'){
        console.log('here');
        window.location += 'dota2';
    }

    else{
	$.ajax({
	   url: "static/pages/" + map[where] + ".txt",
	   async: false,
    	   success:  function (data, status, xhr) {
	        $("#mainContent").append(data);
	        map["back"] = map[where];
	   },
           error: function(xhr, status, error){
		if(status === 'error') {
		   navigate('invalid');
		}
	   }	
    });
}
}
