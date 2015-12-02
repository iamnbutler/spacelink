// Set up controls before docready
$('.btn').click(function(){
	return false;
});

$(document).ready(function(){  

var interval = 6000; // Grid move interval (in ms)

// TODO: Think about adding data explorer (be able to load any page of the data)
d3.tsv("data/full.tsv", function(error, data) { // Get data from TSV using D3

	// Initial Variables
	// TODO: Calculate cols + margin with window size
	var chartRows 			= 200,
		chartRow 			= 1,											// Current row
		chartCols			= 180,
		chartCol			= 1,											// Current col
		pointW				= 4,											// Point height in px
		pointH				= 10,											// Point width in px
		vMargin 			= 4,											// Vertical margin between points
		hMargin 			= 4;											// Horizontal margin between points
		chartWidth 		= chartCols * pointW,			// Total chart width
		chartHeight 	= chartRows * pointH;			// Total chart height
		nodeType 			= 0; 											// 0 = 200, 1 = 302, 2 = 304, 3 = 404

	// Set up chart
	var chart = d3.select(".chart")
		.attr("width", chartWidth)
		.attr("height", chartHeight);

	function col() {
		// Check the column number, add add a row if col > cols
		if (chartCol < chartCols) {
			chartCol++;
		} else {
			// Reset column and start next row
			chartCol = 1;
			chartRow++;
		}
	}

	// Chart data points
	var point = chart.selectAll("g")
		.data(data).enter().append("rect")
			.attr("id", function(d,i) { return 'r' + i })
			.attr("width", pointW)
			.attr("height", pointH)
			.each(function(d,i) {
				// Assign node type
				var response = data[i].response;

				if (response == 302) { nodeType = 1; } 
				else if (response == 304) { nodeType = 2; } 
				else if (response == 404) { nodeType = 3; }

				// Assign node bytes
				nodeBytes = (Math.max(data[i].bytes, 10000) / 100000) - 0.1; // Constrain data to 10k bytes (10kb) and convert to 0 - 1 range 
				
				// Set point attrs
				$('#r' + i)
					.attr("class", 'point nodeType' + nodeType)
					.attr("x", function(d,i) { return ((chartCol * pointW) + (chartCol * hMargin)) })
					.attr("y", function(d,i) { return ((chartRow * pointH) + (chartRow * vMargin)) })
					.attr("stroke-opacity", nodeBytes)
					.attr("fill-opacity", nodeBytes);
				
				// This takes a lot of memory to run, so only uncomment when needed or running final
				if (nodeBytes == 0) {
					// Delete any nodes that wouldn't be seen anyways
					// This makes it so the browser doesn't get bogged down animating invisible elements
					$('#r' + i).remove();
				}

				// Set up next col/row
				col();

			}); // End .each
}); // End d3.tsv

// Load for 2 seconds then stop
setInterval(function(){
	$('#loading').remove();
}, 1400);

function chartInterval(){
	// Set up timer to move chart
	setInterval(function () {
		var posY = parseInt($('.chart').offset().top);
		if (posY <= -1400) {
			// reset chart if it moves too far
			posY = 0;
		} else if (posY >= 10) {
			posY = 0;
		}
		posY = posY - 36;
	    // Move the chart up every x seconds
	    $('.chart').offset({ top: posY });
	}, interval);
}

// Run Timer
chartInterval();

// Store id to clear interval
var chartI = chartInterval();

$('.toggle-btn').click(function(){
	$('.sidebar').toggle();
	$('.close-btn').toggle();
	$('.info-btn').toggle();
});

$('.up-btn').click(function(){
	var posY = parseInt($('.chart').offset().top);
	if (posY <= -1400) {
		// reset chart if it moves too far
		posY = 0;
	} else if (posY >= 10) {
		posY = 0;
	}
	$('.chart').offset({ top: posY - 100 });
});

$('.down-btn').click(function(){
	var posY = parseInt($('.chart').offset().top);
	if (posY <= -1400) {
		// reset chart if it moves too far
		posY = 0;
	} else if (posY >= 10) {
		posY = 0;
	}
	$('.chart').offset({ top: posY + 100 });
});

}); // End doc.ready