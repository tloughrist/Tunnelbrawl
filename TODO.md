# Tunnel Brawl — Future Work

Known limitations / planned improvements. **Not yet implemented** — captured here
so they aren't lost.

## Gameplay

### Multi-piece placement during the "place" phase
A player should be able to place **as many reinforcement pieces as they have empty
squares in their tunnel mouth (home camp)** on their turn — not just one.

Current behavior: a player can only place a single piece per turn, even when several
camp squares are open. In `backend/app/models/game.rb#advance`, after a placement
(when `phase == "place"`) the game immediately rotates the turn to the next player.
It should instead keep the **same** player in the place phase and let them place
again until their camp is full — i.e. only rotate the turn once `place_lock?(turn)`
is true (no empty camp squares remain). The frontend place flow would also need to
allow consecutive placements before the turn passes.
