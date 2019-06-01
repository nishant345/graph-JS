/** 
 * Description: This class is for helper functions
 * className: Utility
 * @param: null
 * attributes: makeGraphArray {type: function}
 * @return: Utility Class
 * author: NG_JavaScript
**/

class Utility{
    /**
     * Description: constructor of the class 
     * @param: null
     */
    constructor(){}
    
    /**
     * Description: Representing graph through a 2D array: an array of routes between two cities.  
     * @param: {type: Object} instance of Graph class, 
     * @return: {type: Array} array of edges, 
     */
    makeGraphArray(graph){
        //storing the resultant array of edges
        let outputArray = []; 
        for(var key in graph.adjacencyList){
            // temporary array for storing a single edge
            let tempArray = []; 
            graph.adjacencyList[key].forEach(node => {
                //storing the first node of the edge
                tempArray.push(key); 
                //storing the second node of the edge
                tempArray.push(node.node); 
                //storing the edge to resultant array
                outputArray.push(tempArray); 
                //emptying the edge array
                tempArray = []; 
            });
        }
        // returning the resultant array
        return outputArray; 
    }
     
    /**
     * Description: extracts the adjacency matrix from graph 
     * @param: {type: Object} instance of Graph class, 
     * @return: {type: Object} adjacency matrix, 
     */
    makeAdjacencyMatrix(g){
        // store the result matrix
        let res = {};
        for (var key in g.adjacencyList){
            let node = g.adjacencyList[key];
            let temp = [];
            for(var i=0; i<node.length; i++){
                //storing the adjacent nodes 
                temp.push(node[i].node);
            }
            res[key] = temp;
        }
        //return adjacency matrix
        return res;
    }
}
//exporting the class
module.exports = {
    Utility
};