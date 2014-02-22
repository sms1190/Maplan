/**
 * Created by vaibhav on 22/01/14.
 */
$(function(){
    $("div#top").focus();

    if(isCanvasSupported()){
        $("button#download").bind("click", downloadImage);
    }
    else{
        $("button#download").hide()
    }

    $("button#cancelBtn").click(function(){
        window.history.go(-1);
    });

    $("button#next").click(function(){
        arr = window.location.pathname.split('/');
        id = arr[arr.length -1];
        id = parseInt(id) + 1;
        if(isNaN(id) || arr.length == 2){
            id = 2
            window.location = window.location.origin + "/aloknath/" + id;
        }
        window.location = window.location.origin + "/aloknath/" + id;
    })

    $("button#previous").click(function(){
        arr = window.location.pathname.split('/');
        id = arr[arr.length -1];
        id = parseInt(id) - 1;
        if( id == 0 || id < 0 || isNaN(id) ){
            window.location = window.location.origin + "/aloknath/" + 1;
        }
        window.location = window.location.origin + "/aloknath/" + id;
    })


    $("button#create").click(function(){
        window.location = window.location.origin + "/" + window.location.pathname.split('/')[1] + "/create";
        console.log()
    })

    $("#saveBtn").click(function(){
       jQuery.ajax({
           type: "POST",
           url: "/aloknath/save",
           data: {
               t: $("div#top").text(),
               b: $("div#bottom").text()
           },
           dataType: "json",
           success: function(data){
                if(data['status'] == 'ok'){
                    console.log(data)
                    window.location = window.location.origin + "/" + window.location.pathname.split('/')[1] + "/" + data['id'];
                 }
                else{
                    alert("unable to save now. Try again!")
                }
           }

       })
    });
});

function isCanvasSupported(){
  var elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d'));
}

function downloadImage(e){
    //e.preventDefault();
    console.log('start');
    var canvas = document.getElementById('canvas-image');
    var context = canvas.getContext('2d');
    var img = document.getElementById('mainImage');
    context.drawImage(img, 0, 0, 1100, 710);
    context.font = "50px 'Times New Roman'";
    context.fillStyle = 'white';
    var toptext = $("div.toptag").text();
    var start = 0; var end = 35; var currentPos = 80;
    if(toptext.length > 37){
        while ( end < toptext.length){
            context.fillText(toptext.substring(start, end), 150, currentPos);
            start = start + 35;
            end = end + 35;
            currentPos += 50;
        }
        context.fillText(toptext.substring(start, toptext.length), 150, currentPos);
    }
    else{
        context.fillText($("div.toptag").text(), 150, 80);
    }
    var bottomtext = $("div.bottomtag").text();
    start = 0; end = 35; currentPos= 610;
    if(bottomtext.length > 37){
        while ( end < bottomtext.length){
            context.fillText(bottomtext.substring(start, end), 150, currentPos);
            start = start + 35;
            end = end + 35;
            currentPos += 50;
        }
        context.fillText(bottomtext.substring(start, bottomtext.length), 150, currentPos);
    }
    else{
        context.fillText($("div.bottomtag").text(), 360, 610);
    }
    //console.log(context.getImageData(0,0,img.width, img.height));
    //window.location.href = context.getImageData();
    //$("div.base-image").hide();
    $("#download").attr('href', canvas.toDataURL())

}