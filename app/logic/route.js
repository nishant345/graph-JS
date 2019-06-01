/** 
 * Description: This class is for computing the queries and retrieving the routes of the queries
 * className: Route
 * @param: {type: Object} instance of graph class generates an array of edges
 * attributes:  maximalTrip {type: function},
 *              shortestRoute {type: function},
 *              shortestDistance {type: function},
 *              countWalks {type: function},
 *              computeDistance {type: function}
 * @return: Route Class
 * author: NG_JavaScript
**/

//importing Utility module and paths functions
const paths = require('./paths');
const utility = require('./utility').Utility;


class Route{
    /**
     * Description: constructor of the class to generate an array of edges 
     * @param: {type: Object} instance of graph
     */
    constructor(map){
        // initializing the Utility module
        this.util = new utility();
        // converting the graph into array of edges and storing it
        this.graph = this.util.makeGraphArray(map);
    }
    /**
     * Description: count of maximal number of trips with n stops between two nodes
     * @param:  {type: Number} stops
     *          {type: String} nodeFrom
     *          {type: String} nodeTo 
     * @return: {type: Number} maximal trip count
     */
    maximalTrip(stops, nodeFrom, nodeTo){
        //storing the array of edges
        let graph = this.graph,
        // getting all paths from nodeFrom to nodeTo
            allPaths = paths.allPaths({graph, from: nodeFrom, to: nodeTo}),
        //result array
            result = []; 
        allPaths.forEach(arr => {
            //checking the length of each path
            if(arr.length <= stops+1 ){
                //storing the path that matches the if cond
                result.push(arr);
            }
        });
        //returning the length of result array
        //result contains the paths that satisfies the query
        return result.length;
    }

    /**
     * Description: finds the shortest route between two nodes 
     * @param:  {type: string} nodeFrom 
     *          {type: string} nodeTo 
     * @return: shortest route, type: Array
     */
    shortestRoute(graph, nodeFrom, nodeTo){
        // getting all paths from nodeFrom to nodeTo
        let allPaths = paths.allPaths({graph, from: nodeFrom, to: nodeTo}),
        // storing the shortest route
            shortest = allPaths.reduce(function(p,c) {return p.length>c.length?c:p;},{length:Infinity});
        //return the shortest route
        return shortest.join('-');
    }
    /**
     * finds the length of shortest route between two cities 
     * @param:  {type: string} nodeFrom 
     *          {type: string} nodeTo 
     * @return: {type: Number} shortest length
     */
    shortestDistance(map, nodeFrom, nodeTo){
        //variable to store the shortest distance and initializing it
        let cost = 0, 
        // for loop variable
            i,
        // varibale to store the shortest route
            shortest = this.shortestRoute(this.graph, nodeFrom, nodeTo).split('-');
        // get the shortest distance
        for(i=0; i< shortest.length - 1; i++){
            //storing the distance
            cost += map.getWeight(shortest[i], shortest[i+1])
        }
        //return shortest distance
        return cost;
    }

    /**
     * Description: number of trips between two cities with exactly k stops
     * @param:  {type: object} instance of Graph class
     *          {type: String} nodeFrom 
     *          {type: String} nodeTo 
     *          {type: Number} k 
     * @returns: {type: Number} shortest length
     */
    countTrips(graph, nodeFrom, nodeTo, k) { 
        // Base cases
        if (k == 0 && nodeFrom == nodeTo) { return 1;}
        if (k == 1 && graph.hasEdge(nodeFrom, nodeTo)) { return 1;}
        if (k <= 0) { return 0;}
        // variable to store the count of walks and initialize it
        var count = 0;
        for(var key in graph._nodes) {
            // condition to check which nodes are adjacent to key
            if(graph.hasEdge(nodeFrom, key)){
                //increment the count if node is adjacent to key
                count += this.countTrips(graph, key, nodeTo, k-1)  
            }
        }
        //return the count of walks
        return count;
    }

    /**
     * Description: finds the length of the route
     * @param:  {type: object} instance of Graph class 
     *          {type: String} path 
     * @returns: {type: Number} path length or 
     *           {type: String} "NO SUCH ROUTE" 
     */
    computeDistance(map, path) {
        //splitting the path to make it a array
        let arr = path.split('-');
        //Declaring variables
        let len = arr.length,
            i,
            // store the result
            val = 0,
            // temp array
            list = [];
        for (i = 0; i < len - 1; i++) {
            // storing the nodes
            let temp = {}
            temp.nodeFrom = arr[i];
            temp.nodeTo = arr[i + 1];
            //storing the nodes for more than two nodes in a path
            list.push(temp);
            // calculating distance between two nodes
            val += map.getWeight(temp.nodeFrom, temp.nodeTo);
        }
        // checking if a edge exist in a path
        // return the distance or 'NO SUCH ROUTE' if no path exists between two nodes
        if(val){
            return val;
        } else {
            return 'NO SUCH ROUTE';
        }
    }

}
// exporting the class Route
module.exports = {
    Route
};