function PathFinding(map, width, height) {
    this.map = map;
    this.width = width;
    this.height = height;
    this.emptyValue = -1;

    this.includeStartPosition = false;
}

PathFinding.prototype.find = function(start, end) {
    if (start.x == end.x && start.y == end.y) {
        return new Array();
    }

    return this.findPath(this.map, this.width, this.height, start, end);
};

PathFinding.prototype.findPath = function(map, width, height, start, end) {
    queue = [];
    queue.push( start );

    completePaths = {};
    completePaths[start.x + 'x'+start.y] = start;

    while( queue.length > 0 ) {
        current = queue.shift();

        neighboors = this.findNeighboors(current.x, current.y, width, height);
        for( i=0; i< neighboors.length; i++ ) {
            if( completePaths[ neighboors[i].x + "x" + neighboors[i].y ] == undefined ) {
                if( map[ neighboors[i].y ][ neighboors[i].x ].index === this.emptyValue ) {
                    queue.push( neighboors[i] );
                    completePaths[ neighboors[i].x + "x" + neighboors[i].y ] = current;
                }
            }
        }
    }

    paths = [];
    if( completePaths[end.x + "x" + end.y ] != undefined ) {
        current = end;
        paths.push( end );

        while( current != start ) {
            current = completePaths[ current.x + "x" + current.y ];
            if( current != start || this.includeStartPosition ) {
                paths.push( current );
            }
        }
    }

    paths.reverse();
    return paths;
};

PathFinding.prototype.findNeighboors = function(x, y, width, height) {
    neighboors = [];
    for(y2 = -1; y2 <= 1; y2++) {
        for(x2 = -1; x2 <= 1; x2++) {
            if( Math.abs(x2) != Math.abs(y2) ) {
                currentNeighboor = {x: x+x2, y: y+y2};
                if( currentNeighboor.x >= 0 && currentNeighboor.x < width && currentNeighboor.y >= 0 && currentNeighboor.y < height) {
                    neighboors.push( currentNeighboor );
                }
            }
        }
    }
    return neighboors;
};
