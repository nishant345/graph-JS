class Graph {
    constructor() {
        this._nodes = {};
        this.adjacencyList = {};
    }

    addNode(value) {
        this._nodes[value] = {
            edges: {},
            weight: {}
        };
        this.adjacencyList[value] = [];
    }

    removeNode(value) {
        for (let connectedNode in this._nodes[value].edges) {
            this.removeEdge(value, connectedNode);
        }
        delete this._nodes[value];
    }

    hasNode(value) {
        return !!this._nodes[value];
    }

    addEdge(nodeFrom, nodeTo, weight) {
        if (this.hasNode(nodeFrom) && this.hasNode(nodeTo)) {
            this._nodes[nodeFrom].edges[nodeTo] = true;
            this._nodes[nodeFrom].weight[nodeTo] = weight;
            this.adjacencyList[nodeFrom].push({
                node: nodeTo,
                weight: weight
            });
        }
    }

    removeEdge(nodeFrom, nodeTo) {
        if (this.hasNode(nodeFrom) && this.hasNode(nodeTo)) {
            delete this._nodes[nodeFrom].edges[nodeTo];
            delete this._nodes[nodeFrom].weight[nodeTo];
        }
    }

    hasEdge(nodeFrom, nodeTo) {
        return !!this._nodes[nodeFrom].edges[nodeTo];
    }

    getWeight(nodeFrom, nodeTo) {
        if (this.hasEdge(nodeFrom, nodeTo)){
            return this._nodes[nodeFrom].weight[nodeTo];
        } 
    }
}

module.exports = {
    Graph
};