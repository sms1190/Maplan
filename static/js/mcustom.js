//$(window).load(function () {
//    //$("li").mouseover(function () {
//    //    console.log('heie');
//    //});

$(function(){
   //alert('hel');
   $("body").click(function(){
      alert('hello');
   });
});


$(function(){
   $("li").hover(function () {
       console.log('ji');
       $('a', $(this)).stop().animate({ 'marginLeft': '0px' }, 200);
   }, function () {
       console.log('ji');
       $('a', $(this)).stop().animate({ 'marginLeft': '-85px' }, 200);
   });
});


$(function () {
    var cube = $('#cube');
    $.jmpress("initStep", function (step, eventData) {
        eventData.stepData.up = eventData.data.up;
        eventData.stepData.down = eventData.data.down;
    });
    $.jmpress("register", "up", function () {
        var stepData = cube.jmpress("active").data("stepData");
        if (stepData.up)
            cube.jmpress("select", stepData.up);
    });
    $.jmpress("register", "down", function () {
        var stepData = cube.jmpress("active").data("stepData");
        if (stepData.down)
            cube.jmpress("select", stepData.down);
    });
    cube.jmpress({
        viewPort: {
            width: 1800,
            height: 1800
        },
        keyboard: {
            keys: {
                38: "up",
                40: "down"
            }
        }
    });
    cube.jmpress("route", ["#left", "#front"]);
    cube.jmpress("route", ["#top", "#right"], true);
    cube.jmpress("route", ["#top", "#left"], true, true);
    cube.jmpress("route", ["#bottom", "#left"], true, true);
    cube.jmpress("route", ["#bottom", "#right"], true);


    $("body").on("click", function () {
        console.log("cool");
    });
});