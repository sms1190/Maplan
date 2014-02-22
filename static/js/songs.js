res = '';
$(function () {
    $("#draw").click(function(){
        jQuery.ajax({
            type: "POST",
            url: "/song/getsongs",
            success: function(data){
                res = data;
                drawChart();
                 console.log(data)
            }
        });
    });
});


function drawChart(){
    $('#charty').highcharts({
        title: {
        	text: 'Step line types, with null values in the series'
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        series: [{
            data: [1,2,3,4,null,6,7,null,9]
        }]

    });
}