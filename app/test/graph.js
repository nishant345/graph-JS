// importing modules
const assert = require('chai').assert;
const Graph = require('../logic/graph').Graph;

describe('Graph', () => {
  //Initializing a new graph
  const map = new Graph();
  it('Graph should have nodes if exists', () => {
    //adding nodes
    map.addNode('A');
    map.addNode('B');
    map.addNode('C');
    map.addNode('D');
    map.addNode('E');
    assert.equal(map.hasNode('A'), true);
    assert.equal(map.hasNode('B'), true);
    assert.equal(map.hasNode('C'), true);
    assert.equal(map.hasNode('D'), true);
    assert.equal(map.hasNode('E'), true);
    assert.equal(map.hasNode('F'), false);

    map.removeNode('C');
    map.removeNode('E');
    assert.equal(map.hasNode('C'), false);
    assert.equal(map.hasNode('E'), false);

    map.addNode('C');
    map.addNode('E');
  });

  it('should have a edge between two nodes if exists', () => {
    // adding edges
    map.addEdge('A', 'B', 5);
    map.addEdge('B', 'C', 4);
    map.addEdge('C', 'D', 8);
    map.addEdge('D', 'C', 8);
    map.addEdge('D', 'E', 6);
    map.addEdge('A', 'D', 5);
    map.addEdge('C', 'E', 2);
    map.addEdge('E', 'B', 3);
    map.addEdge('A', 'E', 7);
    assert.equal(map.hasEdge('A', 'B'), true);
    assert.equal(map.hasEdge('B', 'C'), true);
    assert.equal(map.hasEdge('C', 'D'), true);
    assert.equal(map.hasEdge('D', 'C'), true);
    assert.equal(map.hasEdge('D', 'E'), true);
    assert.equal(map.hasEdge('A', 'D'), true);
    assert.equal(map.hasEdge('C', 'E'), true);
    assert.equal(map.hasEdge('E', 'B'), true);
    assert.equal(map.hasEdge('A', 'E'), true);
    assert.equal(map.hasEdge('C', 'B'), false);
    assert.equal(map.hasEdge('E', 'D'), false);
    assert.equal(map.hasEdge('C', 'A'), false);

    map.removeEdge('A', 'B');
    map.removeEdge('D', 'E');
    assert.equal(map.hasEdge('A', 'B'), false);
    assert.equal(map.hasEdge('D', 'E'), false);

    map.addEdge('A', 'B', 5);
    map.addEdge('D', 'E', 6);
  });

  it('should give the distance between two nodes if exixts', () => {
      let distanceA_B = map.getWeight('A', 'B');
      let distanceC_D = map.getWeight('C', 'D');
      let distanceB_A = map.getWeight('B', 'A');
      assert.equal(distanceA_B, 5);
      assert.equal(distanceC_D, 8);
      assert.equal(distanceB_A, undefined);
  });
});