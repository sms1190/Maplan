$(document).ready(function () {

       $("#mainSearchBox").focusout(function(){
           $("div.page-search-results").hide('slow');
       });

       $("#mainSearchBox").focus(function(){
           $("div.page-search-results").show();
       });

       $('#mainSearchBox').keyup(function () {
            if($(this).val().length >= 3){
                jQuery.ajax({
                    type: "POST",
                    url: "/dota2/search",
                    data: {q: $(this).val()},
                    dataType: "json",
                    success: function(data) {
                        $("div.page-search-results").empty();
                        if(data['status'] == 'ok'){
                            startUL = $("<ul></ul>");
                            dataLI = ""
                            for(var i =0; i<data['data'].length; i++){
                                dataLI += "<li><a href='/dota2/" + data['data'][i]['link'] + "'>" + data['data'][i]['name'] +"</li>";
                               //console.log(data['data'][i]['link'])
                            }

                            startUL.append(dataLI);
                            $("div.page-search-results").append(startUL);
                            $("div.page-search-results").fadeIn('slow');
                        }
                        else{
                            console.log(data)
                            console.log('faliure');
                        }
                    }
                })
            }
       });
});
