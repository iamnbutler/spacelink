$(document).ready(function(){  

// TODO: Think about adding data explorer (be able to load any page of the data)
d3.tsv("data/full.tsv", function(error, data) { // Get data from TSV using D3

	// Initial Variables
	// TODO: Calculate cols + margin with window size
	var chartRows 	= 140,
		chartRow 			= 1,											// Current row
		chartCols			= 260,
		chartCol			= 1,											// Current col
		pointW				= 4,											// Point height in px
		pointH				= 16,											// Point width in px
		vMargin 			= 2,											// Vertical margin between points
		hMargin 			= 2;											// Horizontal margin between points
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
					.attr("opacity", nodeBytes);
				
				// Set up next col/row
				col();

			}); // End .each
}); // End d3.tsv

}); // End doc.ready