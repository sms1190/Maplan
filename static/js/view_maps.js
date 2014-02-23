/**
 * Created by Mohit on 2/22/14.
 */
var userid= $.cookie("user");
var myDataPath = 'https://coolmap.firebaseIO.com';
var mydataref=new Firebase(myDataPath+"/users/"+userid+"/mapids/");
    mydataref.once("value",function(snapshot){
       var v=snapshot.val();
        console.log(v);
       display_maps(v);
    });

    function display_maps(maps){
        for(var i=0;i<maps.length;i++){
            var mapID=maps[i];
            console.log(mapID);
            var from={};
            var end={};
            var fromtitle="";
            var endtitle="";
            var tempref=new Firebase('https://coolmap.firebaseio.com/map/'+mapID+"/from/");

            tempref.once("value",function(snapshot){
                var fr=snapshot.val();
                console.log(fr);
                from={'lan':fr['lan'],'lat':fr['lat']};
                fromtitle=fr['title'];
            });
            var tempref=new Firebase('https://coolmap.firebaseio.com/map/'+mapID+"/to/");
            tempref.once("value",function(snapshot){
                var fr=snapshot.val();
                end={'lan':fr['lan'],'lat':fr['lat']};
                endtitle=fr['title'];
                var mapids=$("#maps");
                var subdiv=$("<div></div>");
                subdiv.addClass('col-md-4');
                subdiv.css('margin-top','20px');
                var t="From : "+ fromtitle+" To : "+endtitle;
                console.log(t);

                subdiv.append('<a href='+mapID+' title='+t+'><img src=\"../static/img/map.jpg\"  width=\"350px\" heigth=\"350px\"/></a>');
                mapids.append(subdiv);
            });


        }

    }