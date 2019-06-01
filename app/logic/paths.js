/** 
 * Description: function computes the all routes between two nodes
 * @param:  {type:Array} graph: edge Array
 *          {type: String} nodeFrom
 *          {type: String} nodeTo
 *          {type: Array} path: temp Array
 * @return: {type:Array}, paths:all paths of from node to node
 * author: NG_JavaScript
**/

module.exports.allPaths = function ({graph = [], from, to}, path = []) {
    // store the neighbors of node
    const neighbors = remember(nodes.bind(null, graph));
    return explore(from, to);
    // function to explore the linked Node of each node
    function explore(currentNode, to, paths = []) {
        path.push(currentNode);
        for (let neighbor of neighbors(currentNode)) {
            // check if found a path from start node to end node 
            if (neighbor === to) {
                // copy values
                // store the path
                let res = path.slice(); 
                res.push(to);
                paths.push(res);
                continue;
            }
            // do not re-explore edges
            if (!hasEdgeBeenFollowedInPath({
                    edge: {
                        from: currentNode,
                        to: neighbor
                    },
                    path
                })) {                    
                explore(neighbor, to, paths);
            }
        }
        // sub-graph fully explored  
        path.pop();           
        return paths;
    }
}

/**
* Description: Get all nodes linked to from node.
* @param:  {type: Object} edge
*          {type: Array} path
* @return: {type: Array} indices, Array of indices that has been followed
*/
function nodes(graph, node) {
    // returning the nodes if the node in the graph has an edge with from node
    return graph.reduce((p, c) => {
        (c[0] === node) && p.push(c[1]);
        return p;
    }, []);
}

/**
* Description: check an edge been followed in the given path
* @param:  {type: Object} edge
*          {type: Array} path
* @return: {type: Array} indices, Array of indices that has been followed
*/
function hasEdgeBeenFollowedInPath({ edge, path }) {
    // storing indices that matches from nodes in the patha
    var indices = allIndices(path, edge.from);
    // returning the indices  if any found
    return indices.some(i => path[i + 1] === edge.to);
}

/**
* Description: Utility to get all indices of values matching val in arr.
* @param:  {type: Array} arr
*          {type: Number} val
* @return: {type: Array} indices
*/
function allIndices(arr, val) {
    //Declaring variables
    // resultant array
    var indices = [],
    //for loop variable
        i;
    for (i = 0; i < arr.length; i++) {
        //checking if the values is in the array
        if (arr[i] === val) {
            //storing the value
            indices.push(i);
        }
    }
    // returning the resultant array
    return indices;
}

/**
* Description: Avoids recalculating linked nodes.
* @param:  {type: Array} arr
*          {type: Number} val
* @return: {type: Array} indices
*/
function remember(fn) {
    //Declaring variables
    const cache = new Map();
    // returning function that checks if the values are already chached 
    return function() {
        var key = JSON.stringify(arguments);
        var cached = cache.get(key);
        if (cached) {
            return cached;
        }
        cached = fn.apply(this, arguments)
        cache.set(key, cached);
        return cached;;
    };
}

