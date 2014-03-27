function AI(grid) {
  this.grid = grid;
}

// static evaluation function
AI.prototype.eval = function() {
  var emptyCells = this.grid.availableCells().length;

  var smoothWeight = 0.1,
      //monoWeight   = 0.0,
      //islandWeight = 0.0,
      mono2Weight  = 1.0,
      emptyWeight  = 2.7,
      maxWeight    = 1.0;

  return this.grid.smoothness() * smoothWeight
       //+ this.grid.monotonicity() * monoWeight
       //- this.grid.islands() * islandWeight
       + this.grid.monotonicity2() * mono2Weight
       + Math.log(emptyCells) * emptyWeight
       + this.grid.maxValue() * maxWeight;
};
// AI.prototype.eval = function() {
//   var emptyCells = 0;
//   var score = 0;
//   var max = 2;
//   var self = this;
//   this.grid.eachCell(function (x, y, tile) {
//     if (tile) {
//       if (tile.value == self.grid.winScore) {
//         score += 16*self.grid.winScore;
//       }
//       score += (tile.value/2 - 1);
//       max = Math.max(max, tile.value);
//     } else {
//       ++emptyCells;
//     }
//   });
//
//   return (max/16.0)*emptyCells + score;
// };

// performs a search and returns the best move
AI.prototype.getBest = function() {
  return this.iterativeDeep();
}

// performs iterative deepening over the alpha-beta search
AI.prototype.iterativeDeep = function() {
  var start = (new Date()).getTime();

  var scores = {};
  var states = [];
  for (var direction in [0, 1, 2, 3]) {
    var newGrid = this.grid.clone();
    if (newGrid.move(direction).moved) {
      var score = new AI(newGrid).eval()
      scores[direction] = score;
      states.push(new State(newGrid, score, direction, 1.0));
    }
  }
  var bestMove = { score: -1, direction: -1 }

  // var moves = 0;
  do {
    // Find the current best state
    var best = { score: -1, index: -1 };
    for (var i in states) {
      var state = states[i];
      if (state.score > best.score) {
        best.score = state.score;
        best.index = i;
      }
    }

    // Replace the best state with all its children
    var state = states.splice(best.index, 1)[0];
    var children = state.search();
    var score = scores[state.origDirection];
    score -= (state.score * state.chance);
    for (var i in children) {
      var child = children[i];
      score += (child.score * child.chance);
      states.push(child);
    }
    scores[state.origDirection] = score;
    if (score > bestMove.score) {
      bestMove.score = score;
      bestMove.direction = state.origDirection;
    }

    // moves++;
  } while ((new Date()).getTime() - start < minSearchTime);
  // alert(moves);
  return bestMove.direction;
}
