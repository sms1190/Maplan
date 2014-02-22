/**
 * Created by demo on 22/02/14.
 */
var markers = [];
var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();
var map;
var mapID;
var userID;
var myDataPath = 'https://coolmap.firebaseIO.com/';
var myDataRef;

function initialize() {
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-33.8902, 151.1759),
        new google.maps.LatLng(-33.8474, 151.2631));
    map.fitBounds(defaultBounds);

    var frombox = document.getElementById('from');
    var fromsearchBox = new google.maps.places.SearchBox(frombox);
    var tobox=document.getElementById('to');
    var tosearchbox=new google.maps.places.SearchBox(tobox);

    google.maps.event.addListener(fromsearchBox, 'places_changed', function () {
        var places = fromsearchBox.getPlaces();

        for (var i = 0,marker; marker = markers[i]; i++) {
            marker.setMap(null);
        }

        //markers = [];
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, place; place = places[i]; i++) {
            var image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            var marker = new google.maps.Marker({
                map: map,
                icon: image,
                title: place.name,
                position: place.geometry.location
            });

            console.log(marker);
            markers.push(marker);

            bounds.extend(place.geometry.location);
        }

        map.fitBounds(bounds);
    });

    google.maps.event.addListener(tosearchbox, 'places_changed', function () {
        var places = tosearchbox.getPlaces();

        for (var i = 0, marker; marker = markers[i]; i++) {
            marker.setMap(null);
        }

        //markers = [];
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, place; place = places[i]; i++) {
            var image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            var marker = new google.maps.Marker({
                map: map,
                icon: image,
                title: place.name,
                position: place.geometry.location
            });

            console.log(marker);
            markers.push(marker);

            bounds.extend(place.geometry.location);
        }

        map.fitBounds(bounds);
    });

    /*google.maps.event.addListener(map, 'bounds_changed', function () {
        var bounds = map.getBounds();
        searchBox.setBounds(bounds);
    });*/

    google.maps.event.addListener(directionsDisplay, 'directions_changed', function () {
        computeTotalDistance(directionsDisplay.directions);
    });
}

google.maps.event.addDomListener(window, 'load', initialize);

$(function () {



    $("#submit").click(function(){
       var from=$("#from").val();
        var to=$("#to").val();
         createNewFirebase(to,from);
    });
    $("#addBtn").click(function () {
        var place = $("#target").val();
        if (place != "") {
            var placeHTML = "<tr><td class='placeName'>" + place + "</td><td><i class='icon-remove icon-white'></i></td></tr>";
            $("#myPlaces").append(placeHTML);
            setPathPoints();
            sycnFB();
        }
        else {
            console.log("No location searched");
        }
    });

    $("#donwloadPlan").click(function () {
        var doc = new jsPDF();
        doc.text(20, 10, document.getElementById('total').innerHTML);
        var places = $("td.placeName:nth-child(1)", "#myPlaces");
        for (var i = 0; i < places.length; i++) {
            doc.text(20, 20 + (i * 10), (i + 1).toString());
            doc.text(30, 20 + (i * 10), $(places[i]).text());
        }

        //doc.text(20, 20, 'Hello world!');
        //doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
        //doc.addPage();
        //doc.text(20, 20, 'Do you like that?');
        doc.save('Test.pdf');
    });

    // fix this function
    $("body").on("click", "i.icon-remove", function () {
        var toRemove = $(this).closest("td").siblings().text();
        for (var i = 0; i < markers.length; i++) {
            if (toRemove.indexOf(markers[i].title) != -1) {
                markers[i].visible = false;
            }
        }
        $(this).closest("tr").remove();
        setPathPoints();
        sycnFB();
    });
});

function setPathPoints() {
    var start = "";
    var end = "";
    var waypts = [];

    var places = $("td.placeName:nth-child(1)", "#myPlaces");
    start = $(places[0]).text();
    end = $(places[places.length - 1]).text();
    for (var i = 1; i < places.length - 1; i++) {
        waypts.push({
            location: $(places[i]).text(),
            stopover: true
        });
    }
    console.log(waypts);

    var request = {
        origin: markers[0].title,
        destination: markers[markers.length - 1].title,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    }

    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            directionsDisplay.setMap(map);
        }
        else {
            console.log(status);
        }
    });

}


function computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }
    total = total / 1000.
    document.getElementById('total').innerHTML = total + ' km';
}

/** Firebase Code **/
function sycnFB() {
    var user = new Firebase('https://coolmap.firebaseIO.com/' + "map/" + mapID + "/users/" + userID);
}



function createNewFirebase(to,from) {
    $.cookie("user","mohit");
    mapID = (new Date().getTime()).toString(30);
    console.log(mapID);
    userid=$.cookie("user");
    users = {};
    myDataRef = new Firebase(myDataPath + "map/" + mapID);

    //myDataRef.set("to",to);
    //myDataRef.set("from",from);
    //myDataRef.set("owner",userid);
    //myDataRef.set("users",[]);
    myDataRef.set({"to":to,"from":from,"owner":userid,"users":[]});

    insertDataForUser(userid);

}

function insertDataForUser(id){
    console.log('userid  ' + id);
    var uss;
    var userRef = new Firebase( myDataPath + "users/" + id + "/");
    userRef.once('value', function(dsn){
        if(dsn.val() == null){
            addUsersRef=new Firebase(myDataPath + "users/" + id);
            addUsersRef.update( { "mapids" : [mapID] });
        }
        else{
            uss = dsn.val();
            uss['mapids'].push(mapID);
            userRef.update(uss);
        }
    });

}