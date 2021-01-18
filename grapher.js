var the_last_data = [[0,0]];
var RESOLUTION = 512;
function draw_last_data()
{

    var maxx=0;
    for (var i=0;i<the_last_data.length;i++)
        if (the_last_data[i][0]>maxx)
            maxx=the_last_data[i][0];

    var maxy=0;
    for (var i=0;i<the_last_data.length;i++)
        if (the_last_data[i][1]>maxy)
        maxy=the_last_data[i][1];

    var minx=0;
    for (var i=0;i<the_last_data.length;i++)
        if (the_last_data[i][0]<minx)
        minx=the_last_data[i][0];
            
    var miny=0;
    for (var i=0;i<the_last_data.length;i++)
        if (the_last_data[i][1]<miny)
        miny=the_last_data[i][1];

    data = []
    for (var i=0;i<the_last_data.length;i++){
        data.push({x:RESOLUTION*(the_last_data[i][0]-minx)/(maxx-minx), y:RESOLUTION*(the_last_data[i][1]-miny)/(maxy-miny)});
    }

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "Simple Line Chart"
        },
        data: [{        
            type: "line",
              indexLabelFontSize: 16,
            dataPoints: data
        }]
    });
    chart.render();
}

function get_data(){
    $.get( "http://127.0.0.1:5000/generate", 
    function( data ) {
    the_last_data = JSON.parse(data) ;
    draw_last_data();
    });
}

window.onload = function () {
draw_last_data();
}
