/** 
 * Description: index file for initializing the graph and computing test inputs
 * @param: null
 * @return: null
 * author: NG_JavaScript
**/

//importing modules
const graphs = require('./logic/graph').Graph;
const cyclicPaths = require('./logic/cyclicPaths');
const route = require('./logic/route').Route;
//Initializing a new graph
const map = new graphs();
//creating the graph with nodes and edges with their distances
map.addNode('A');
map.addNode('B');
map.addNode('C');
map.addNode('D');
map.addNode('E');
map.addEdge('A', 'B', 5);
map.addEdge('B', 'C', 4);
map.addEdge('C', 'D', 8);
map.addEdge('D', 'C', 8);
map.addEdge('D', 'E', 6);
map.addEdge('A', 'D', 5);
map.addEdge('C', 'E', 2);
map.addEdge('E', 'B', 3);
map.addEdge('A', 'E', 7);
// Initializing route
const distance = new route(map);
//Test Input
console.log(distance.computeDistance(map, "A-B-C"));
console.log(distance.computeDistance(map, "A-D"));
console.log(distance.computeDistance(map, "A-D-C"));
console.log(distance.computeDistance(map, "A-E-B-C-D"));
console.log(distance.computeDistance(map, "A-E-D"));
console.log(distance.maximalTrip(3, "C", "C"))
console.log(distance.countTrips(map, "A", "C", 4));
console.log(distance.shortestDistance(map, "A", "C"));
console.log(distance.shortestDistance(map, "B", "B"));
console.log(cyclicPaths.cyclicPaths(map, "C", "C", 30));

