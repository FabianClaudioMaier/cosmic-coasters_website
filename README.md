Altair spaceworks - Website
=======================

Requirements
------------

### MUST: 12 points

1.  The backend (BE) of the system must be an individual component.
2.  The frontend (FE) of the system must be an individual component implemented using HTML5, CSS and JS.
3.  The communication between FE and BE components must be implemented using HTTP(S).
4.  The communication between FE and BE components must be implemented using asynchronous data transfer (AJAX).
5.  The HTTP endpoints of the BE component must return the data either as JSON or as XML.
6.  The HTTP endpoints of the BE component must manage resources using HTTP methods GET, POST, PUT and DELETE, each method at least on one HTTP endpoint.
7.  The HTTP endpoints of the FE component must consume resources using HTTP methods GET, POST, PUT and DELETE from at least one HTTP endpoint.
8.  The system must consume at least one external REST web service.
9.  The system must implement session management (Login, sessionID, JWT, ...).

### SHOULD: 5 points

1.  The system should consume at least two external REST web services.
2.  The system should offer a second individual FE component that communicates with at least three HTTP endpoints of the BE component.
3.  The FE component should be designed in a way that it is w3c compliant (<https://validator.w3.org/>).

### COULD: 3 points

1.  The system could consume at least three external REST web services.
2.  The HTTP endpoints of the BE component could return the data as JSON and XML.
3.  The BE component of the system could provide a PATCH HTTP endpoint, which is consumed by the FE component.
