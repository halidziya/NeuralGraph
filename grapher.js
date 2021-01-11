var the_last_data = [];
var RESOLUTION = 1024;
function draw_last_data()
{
    var c = document.getElementById("drawing");

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

    for (var i=0;i<the_last_data.length-1;i++){
        var ctx = c.getContext("2d");
        console.log(RESOLUTION*(the_last_data[i][0]-minx)/(maxx-minx));
        ctx.moveTo(RESOLUTION*(the_last_data[i][0]-minx)/(maxx-minx), RESOLUTION*(the_last_data[i][1]-miny)/(maxy-miny));
        ctx.lineTo(RESOLUTION*(the_last_data[i+1][0]-minx)/(maxx-minx),RESOLUTION*(the_last_data[i+1][1]-miny)/(maxy-miny));
        ctx.stroke();
    }

}

function get_data(){
    $.get( "http://127.0.0.1:5000/generate", 
    function( data ) {
    the_last_data = JSON.parse(data) ;
    draw_last_data();
    });
}



