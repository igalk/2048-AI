# 2048 AI

AI for the game [2048](https://github.com/gabrielecirulli/2048).

See it in action [here](http://igalk.github.io/2048-AI/). (Hit the auto-run button to let the AI attempt to solve it by itself)

You can tweak the thinking time via global var `animationDelay`. Higher = more time/deeper search.

The better heuristics now give it a success rate of about 90% in my testing (on a reasonably fast computer).

### Suggested Improvements

1.  Caching. It's not really taking advantage of the iterative deepening yet, as it doesn't remember the move orderings from previous iterations. Consequently, there aren't very many alpha-beta cutoffs. With caching, I think the tree could get pruned much more. This would also allow a higher branching factor for computer moves, which would help a lot because I think the few losses are due to unexpected random computer moves that had been pruned.

2. Put the search in a webworker. Parallelizing minimax is really hard, but just running it like normal in another thread would let the animations run more smoothly.

3. ~~Evaluation tweaks. There are currently four heuristics. Change the weights between them, run a lot of test games and track statistics to find an optimal eval function.~~

4. Comments and cleanup. It's pretty hacky right now but I've spent too much time already. There are probably lots of low-hanging fruit optimizations.
