PRONLEMS ON TRAINS
author: NG_JavaScript

For running the application, please follow the following instructions.
    1. Download the app in zip format.
    2. Extract the app.
    3. Open the command prompt in the folder in which the app is been downloaded. 
    4. Run npm install. If nodejs is not installed please download and install it(Link:https://nodejs.org/en/)
    5. Run node index.
    6. Run npm run test.

Design:
    The graph presented here is a directed cyclic graph.
    A graph class has been constructed for initializing the graph. Initializing means to add nodes and edges and provide them with weights. Similarly, a route class has been also constructed to solve for the queries in the given assignment. Utility module is created to help in solving queries. 
    Use of functional programming is for generating all paths from a particular node to another particular node. Also, another function is also created to solve for cyclic paths.

    TDD:
    First, the tests are written for the test input provided. Then they are made to fail either by not creating the function or the function doesn't do the required job. Then the actual development is done to pass the test. Commenting of the code is done simultaneously.

Assumptions:
    Assuming there are cycles in the graph.