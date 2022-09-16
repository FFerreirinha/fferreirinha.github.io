const Gameboard = (() => {
    const moves = {};
    const crossPlay = (x, y) => moves[x][y] = 1;
    const circlePlay = (x, y) => moves[x][y] = 2;
    return {circlePlay, crossPlay};  
})();

