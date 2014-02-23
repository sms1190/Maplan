/**
 * Created by demo on 22/02/14.
 */

$(function(){
    token = window.location.hash.split('#')[1].split('&')[0].split('=')[1];
    data = getUserInfo(token);
    $.ajax({
        type: "POST",
        url: window.location.origin + '/savetoken',
        data: {q: token, name: data[0], email: data[1]},
        success: function(){
            window.location.href = window.location.origin;
        }
    })
})

function getUserInfo(token) {
    var req0 = new XMLHttpRequest();
    req0.open('GET', 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + token, true);
    req0.send(null);

    var req = new XMLHttpRequest();
    req.open('GET', 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + token, false);
    req.send(null);
    var a = req.response;
    if (req.status != 401) {
        var b = jQuery.parseJSON(a);
        return [b.name, b.email];
    }
}