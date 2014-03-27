function State(grid, score, origDirection, chance) {
  this.grid = grid;
  this.score = score;
  this.origDirection = origDirection;
  this.chance = chance;
}

// static evaluation function
State.prototype.search = function() {
  var available = this.grid.availableCells();
  var cellChance = 1.0/available.length;
  var states = [];
  for (var i in available) {
    var cell = available[i];

    var newGrid = this.grid.clone();
    newGrid.insertTile(new Tile(cell, 2));
    var best = { score: -1, grid: null };
    for (var direction in [0, 1, 2, 3]) {
      var newGridWithMove = newGrid.clone();
      if (newGridWithMove.move(direction).moved) {
        var score = new AI(newGridWithMove).eval()
        if (score > best.score) {
          best.score = score;
          best.grid = newGridWithMove;
        }
      }
    }
    if (best.grid != null) {
      states.push(new State(best.grid, best.score, this.origDirection, this.chance * cellChance * 0.9));
    // } else {
    //   states.push(new State(newGrid, 0, this.origDirection, this.chance * cellChance * 0.9));
    }

    newGrid = this.grid.clone();
    newGrid.insertTile(new Tile(cell, 4));
    best = { score: -1, grid: null };
    for (var direction in [0, 1, 2, 3]) {
      var newGridWithMove = newGrid.clone();
      if (newGridWithMove.move(direction).moved) {
        var score = new AI(newGridWithMove).eval()
        if (score > best.score) {
          best.score = score;
          best.grid = newGridWithMove;
        }
      }
    }
    if (best.grid != null) {
      states.push(new State(best.grid, best.score, this.origDirection, this.chance * cellChance * 0.1));
    // } else {
    //   states.push(new State(newGrid, 0, this.origDirection, this.chance * cellChance * 0.9));
    }
  }
  return states;
};
