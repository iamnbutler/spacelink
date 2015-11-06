$(document).ready(function(){  

d3.tsv("data/nasa_19950801.tsv", function(error, data) { // Get data from TSV using D3

	// Set up chart
	var chart = $("#chart");

	// Set up nodes

	var nodeSize		= 2; // in percent (5 = 5%)

	// for (var i, i = 0; i < nodes.length; i++) {
	// 	var $newNode = $('<div id="node-' + i + '" class="node"></div>'),
	// 		nodeRow	 = parseInt(nodes[i][0]) * nodeSize,
	// 		nodeCol	 = parseInt(nodes[i][1]) * nodeSize,
	// 		nodeType = nodes[i][2],
	// 		nodeTime = nodes[i][3];

	// 	// TODO: build this comparison number w variable
	// 	if (nodeCol > 41 ) {
	// 		nodeRow++;
	// 	}

	// 	chart.append($newNode); // Append a new node
	// 	var thisNode = $('#node-' + i); // Save node as a variable
	// 	thisNode.css({ 
	// 				top: nodeRow + '%', left: nodeCol + '%', // Position Node
	// 				width: nodeSize + '%', height: nodeSize + '%', // Set node size
	// 				opacity: nodeTime }) // Set node time 
	// 			.addClass('nodeType' + nodeType); // Set node type
	// }

	var nodeRow = 0,
		nodeCol = 0;

	for (var i, i = 0; i < 1681; i++) {

		// TODO: build this comparison number w variable
		if (nodeCol > 41 ) {
			nodeRow++;
			nodeCol = 0;
		}

		var $newNode = $('<div id="node-' + i + '" class="node"></div>'),
			row		 = nodeRow * nodeSize,
			col		 = nodeCol * nodeSize,
			// TODO: get request data and convert it to nodeType
			// nodeType = nodes[i][2],
			nodeBytes = (Math.max(data[i].bytes, 10000) / 1000000); // Constrain data to 10k bytes (10kb) and convert to 0 - 1 range

		chart.append($newNode); // Append a new node
		var thisNode = $('#node-' + i); // Save node as a variable !! Must come after element is appended !!
		thisNode.css({ 
			top: row + '%', left: col + '%', // Position Node
			width: nodeSize + '%', height: nodeSize + '%', // Set node size
			opacity: nodeBytes // Set node time 
			}) 
		//	.addClass('nodeType' + nodeType); // Set node type

		nodeCol++;
	};
}); // End d3.tsv

}); // End doc.ready

$(document).resize(function(){ 
	// TODO: Update on window resize
});