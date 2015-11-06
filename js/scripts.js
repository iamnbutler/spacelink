$(document).ready(function(){  

// TODO: Size chart based on window size

// Set up chart
var chart = $("#chart");

// Set up nodes

var nodes			= [[2,1,0,1], [2,4,0,0.4],  [3,3,0,0.2],  [3,4,1,1],  [3,6,0,0.5],  [4,1,0,0.8],  [4,2,0,1] ],
	node            = [0,0,0,0], // nodeRow, nodeCol, nodeType, nodeTime
	nodeSize		= 5; // in percent (5 = 5%)

for (var i, i = 0; i < nodes.length; i++) { 
	var $newNode = $('<div class="node node-' + i + '"></div>'),
		nodeRow	 = parseInt(nodes[i][0]) * nodeSize,
		nodeCol	 = parseInt(nodes[i][1]) * nodeSize,
		nodeType = nodes[i][2],
		nodeTime = nodes[i][3];

	chart.append($newNode); // Append a new node
	var thisNode = chart.children('div').last(); // Save node as a variable
	thisNode.css({ 
				top: nodeRow + '%', left: nodeCol + '%', // Position Node
				width: nodeSize + '%', height: nodeSize + '%', // Set node size
				opacity: nodeTime }) // Set node time 
			.addClass('nodeType' + nodeType); // Set node type
}

});

$(document).resize(function(){ 
	// TODO: Update on window resize
});