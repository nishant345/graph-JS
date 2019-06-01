/** 
 * Description: function computes the all different routes between two nodes under a certain distance 
 * @param:  {type:Array} graph: instance of graph class
 *          {type: String} nodeFrom
 *          {type: String} nodeTo
 *          {type: Number} limit
 * @return: {type:Array}, paths:all paths of from node to node
 * author: NG_JavaScript
**/

//importing modules
const route = require('./route').Route;
const utility = require('./utility').Utility;

module.exports.cyclicPaths = function(g, nodeFrom, nodeTo, limit){
    // store the cycles under a limit
    var allCyclicPaths = [];
    // initializing the Utility module
    let util = new utility();
    // making a adjavcency matrix
    adjacencyMatrix = util.makeAdjacencyMatrix(g);
    // function to find the cyclic path from two nodes
    var cycles = findCycles(adjacencyMatrix, nodeFrom, nodeTo);
    // sort the cycle legth(ascending oreder)
    cycles = cycles.sort((a, b) => a.length - b.length);
    // store the cycles
    cycles.forEach(cycle => {
        cycle = cycle.join('-');
        allCyclicPaths.push(cycle);
    });
    // find cycles under a limit
    var cyclicPaths = findCyclicPaths(cycles, g, limit);
    //store those cycles
    cyclicPaths.forEach(path => {
        allCyclicPaths.push(path);
    });
    //return all cycles under a limit
    return allCyclicPaths.length;
}
/**
 * Description: find the path of cycles between two nodes
 * @param:  {type:Array} graph: instance of graph class
 *          {type: String} nodeFrom
 *          {type: String} nodeTo
 * @return: {type: Array} allCycles
 */
function findCycles(g, start, end) {
    // store all cycles
    var allCycles = [];
    // Initializing the recursion
    var fringe = [{'node': start, 'arr': []}];
    while (fringe.length > 0) {
        var obj = fringe.pop();
        var path = obj.arr;
        var state = obj.node;
        // check for a cycle
        // store the cycles
        if (path.length > 0 && state === end) {
            path.unshift(start);
            allCycles.push(path);
            continue;
        }
        // check for adjacent nodes
        for (var i=0; i<g[state].length; i++) {
            if(path.length > 0 && path.includes(g[state][i])){
                continue;
            }
            //recursion to check for other cycles
            fringe.push({'node': g[state][i], 'arr': path.concat([g[state][i]]) });
        }
    }
    // return all cycles
    return allCycles;
}
/**
 * Description: find the cyclic path under a limit
 * @param:  {type:Array} graph: instance of graph class
 *          {type: String} nodeFrom
 *          {type: String} nodeTo
 * @return: {type: Array} allCycles
 */
function findCyclicPaths(c, g, limit){
    var allCyclicPaths = [];
    for(var j=0; j<c.length; j++){
        let n = c[j].concat(c[j].slice(1, c[j].length));
        calculateCost(n);
        let y = n.concat(c[j].slice(1, c[j].length))
        calculateCost(y);
    }
    for(var j=0; j<c.length -1; j++){
        let n = c[j].concat(c[j+1].slice(1, c[j+1].length));
        calculateCost(n);
        let y = n.concat(c[j+1].slice(1, c[j+1].length))
        calculateCost(y);
    }

    for(var i=0; i<c.length-1; i++){
        var n = c[i].slice(1, c[i].length);
        for (var j=c[i+1].length-1; j>=0; j--){
            n.unshift(c[i+1][j]);
        }
        calculateCost(n);
    }
    // check if a cyclic path is under the limit
    function calculateCost(n){
        var b = n.join('-');
        let dist = new route(g);
        cost = dist.computeDistance(g, b);
        if(cost < limit){
            allCyclicPaths.push(b);
        }
    }
    // filter same cycles
    allCyclicPaths = allCyclicPaths.filter((v, i, a) => a.indexOf(v) === i);
    return allCyclicPaths;
}