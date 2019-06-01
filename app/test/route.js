// importing modules
const assert = require('chai').assert;
const graphs = require('../logic/graph').Graph;
const route = require('../logic/route').Route;
const cyclicPaths = require('../logic/cyclicPaths');

describe('Routes', () => {
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
    //Initializing a new route
    const distance = new route(map);
    it('should give the shortest distance between two stations', () => {
        let shortestDistanceA_C = distance.shortestDistance(map, 'A', 'C');
        assert.equal(shortestDistanceA_C, 9);
    });

    it('should give the maximal trips with n stops', () => {
        let maximalTripC_C = distance.maximalTrip(3, 'C', 'C'); // n=3
        assert.equal(maximalTripC_C, 2);
    });

    it('should give the shortest distance between two same stations', () => {
        let shortestDistanceB_B = distance.shortestDistance(map, 'B', 'B');
        assert.equal(shortestDistanceB_B, 9);
    });

    it('should give the count of trips with k walks between two cities', () => {
        let walksA_C = distance.countTrips(map, 'A', 'C', 4); //k=4
        assert.equal(walksA_C, 3);
    });

    it('should compute the distance of a route,if exists, else display proper message', () => {
        let dist = distance.computeDistance(map, "A-E-D");
        assert.equal(dist, "NO SUCH ROUTE");
    });

    it('should compute the distance of a route,if exists, else display proper message', () => {
        let dist = distance.computeDistance(map, "A-E-B-C-D");
        assert.equal(dist, 22);
    });
    
    it('should give the shortest route between two stations', () => {
        shortestRouteA_C = distance.shortestRoute(distance.graph, 'A', 'C');
        assert.equal(shortestRouteA_C, 'A-B-C');
    });

    it('should give the different route between two stations under a given limit', () => {
        diffRoutes = cyclicPaths.cyclicPaths(map, "C", "C", 30)
        assert.equal(diffRoutes, 7);
    });
  });