$(document).ready(function(){  

// TODO: Think about adding data explorer (be able to load any page of the data)
d3.tsv("data/nasa_19950801.tsv", function(error, data) { // Get data from TSV using D3

	// Set up chart
	var chart = $("#chart");

	// Set up nodes

	var nodeSize = 2; // in percent (5 = 5%)

	var nodeRow = 0,
		nodeCol = 0;

	for (var i, i = 0; i < 1681; i++) {

		// TODO: build this comparison number w variable
		if (nodeCol > 41 ) {
			nodeRow++;
			nodeCol = 0;
		}

		var response = data[i].response,
			nodeType = 0; // 0 = 200, 1 = 302, 2 = 304, 3 = 404

		if (response == 302) {
			nodeType = 1;
		} else if (response == 304) {
			nodeType = 2;
		} else if (response == 404) {
			nodeType = 3;
		}

		var $newNode = $('<div id="node-' + i + '" class="node"></div>'),
			row		 = nodeRow * nodeSize,
			col		 = nodeCol * nodeSize,
			nodeBytes = (Math.max(data[i].bytes, 10000) / 100000) - 0.1; // Constrain data to 10k bytes (10kb) and convert to 0 - 1 range

		chart.append($newNode); // Append a new node
		var thisNode = $('#node-' + i); // Save node as a variable !! Must come after element is appended !!
		thisNode.css({ 
			top: row + '%', left: col + '%', // Position Node
			width: nodeSize + '%', height: nodeSize + '%', // Set node size
			opacity: nodeBytes // Set node time 
			}) 
			.addClass('nodeType' + nodeType); // Set node type

		nodeCol++;
	};
}); // End d3.tsv

}); // End doc.ready