# Tunnel Brawl Chess Variant App
Tunnel Brawl is a two to four player variant of chess.

## Description
This game was originally designed by Mark Alan Osterhaus and appeared under the name Bosworth in the U.S. and Waterloo in Europe. I tried to cleave as close to the original rules as I could.

The game is designed to be played synchronously, and each player will see the moves made by other players in real time.

## Demo
[![A link to a demo video](https://timloughrist.files.wordpress.com/2023/04/ksnip_20230406-104425.png)](https://youtu.be/3sZGFw-KpPc)

Click the image above to watch a video demonstrating the app.

## Installation
The current version of the app uses JavaScript/React for the frontend and Ruby on Rails for the backend. It also uses Redis to handle the WebSocket data transfer between the two.

The repository for this app can be found [HERE](https://github.com/tloughrist/capstone-frontend) and [HERE](https://github.com/tloughrist/capstone-backend).

## Usage

Tunnel Brawl is a modified form of chess for two to four players.

Each player takes charge of a clan of dwarves fighting for territory. A clan is made up of eight pawns, two rooks, two knights, two bishops, a queen, and a king.

At the start of the game, each player has four pawns at the mouth of their tunnel and four random pieces in reserve.

Each turn, if there is room in a player's tunnel mouth, they will place a reinforcement from their reserve into an open square in their tunnel mouth. The reserves will then be replenished back to four pieces for as long as unplaced pieces remain in the clan.

The game ends when all kings but one have been captured.

To create a new game, go to the GAMES page and click on CREATE NEW GAME.

To join someone else's game, go to the TAPROOM and select a game to join. The game will begin whenever the game's creator clicks START GAME.

You can leave a game any time before it is started. You can cancel your own game at any time.

**Setup:**
  
  Two Players
  
  One player takes control of the red clan and the other takes control of the blue clan. They begin opposite each other, at the eastern and western tunnel mouths. The north and south tunnel mouths are blocked.
  
  Three Players
  
  The players take control of the red, green, and blue clans. They begin in the western (red clan);, northern (green clan), and eastern (blue clan) tunnel mouths. The southern tunnel mouth is blocked.
  
  Four Players
  
  The players take control of the red, green, blue, and yellow clans. The setup for four players is identical to the setup for three players, except the southern tunnel mouth is occupied by the yellow clan.
  
  **Moving and Capturing:**
  
  Pawns
  
  Pawns are the backbone of the clan. They are numerous (there are eight of them in each clan) and quick to mobilize (you begin with four pawns at the mouth of your tunnel).
  
  Pawns can move forward (away from the mouth of their tunnel) and sideways, but not backward (toward the mouth of their tunnel).

  Pawns move one square, with the exception of their first move when they may move up to two squares.
  
  If there is a a piece between the pawn's starting square and ending square (a situation that can only arise on their first move), they cannot take that move.
  
  Pawns capture on the diagonal. If there is an enemy piece one square diagonally from the pawn's starting square, even if that piece is diagonally behind the pawn, the pawn can capture that piece, replacing it on the board.
  
  For those familiar with the rules of chess, pawns in Tunnel Brawl cannot capture en passant. Pawn promotion also does not occur in Tunnel Brawl.
  
  Rooks
  
  Rooks are the bruisers of the clan. They charge into battle, running straight at the enemy, scattering their foes before them.
  
  Rooks can move any number of squares forward, backward, or sideways. They cannot move diagonally.
  
  If there is a piece between the rook's starting square and ending square, they cannot take that move.
  
  Rooks capture during the course of a normal move: if there is an enemy piece in their ending square, they replace that piece.
  
  For those familiar with the rules of chess, castling is not permitted in Tunnel Brawl.
  
  Knights
  
  The clan's knights are high-mobility units, leaping over and around friends and enemies alike.
  
  Knights move in an 'L' shape, by taking two steps forward, backward, or sideways, followed by one step perpendicular to the initial movement.
  
  Unlike other pieces, knights ignore pieces between their starting square and ending square, though they cannot end in a square occupied by a friendly piece.
  
  Knights capture by ending their move in a square occupied by an enemy piece.
  
  Bishops
  
  Bishops are the clan's spiritual leaders, forming a deep connection to the stony walls of the tunnels themselves. This connection allows bishops to slip through the battlefield, appearing where they are least expected.
  
  Bishops move diagonally, either forward or backward, any number of sqares.
  
  If there is a a piece between the bishop's starting square and ending square, they cannot take that move.
  
  Bishops capture during the course of a normal move: if there is an enemy piece in their ending square, they replace that piece.
  
  Queens
  
  Each clan is commanded by a regal warrior-queen. The queen moves quickly about the battlefield, always seeking out those places where the fighting is most intense.
  
  Queens can move any number of squares forward, backward, sideways, or diagonally.
  
  If there is a a piece between the queen's starting square and ending square, they cannot take that move.
  
  Queens capture during the course of a normal move: if there is an enemy piece in their ending square, they replace that piece.
  
  Kings
  
  The clan is ruled by a king, a slow but mighty warrior. Kings are often the last to arrive on the battlefield and when a king falls, their clan is thrown into chaos. Any member of the clan would gladly put themselves in harm's way to save their king.
  
  Kings can moves one square in any direction.
  
  Kings capture during the course of a normal move: if there is an enemy piece in their ending square, they replace that piece.
  
  A king can capture one of their own pieces, typically to escape check.
  
  If a king is captured, all of that clan's pieces are removed from the board. That player has lost.
  
  **Special Rules:**
  
  Tunnel Collapse
  
  If a player has no pieces in reserve, their tunnel mouth collapses, blocking each empty square in the tunnel mouth. If any of the squares in the tunnel mouth are occupied, they become blocked as soon as they are no longer occupied.
  
  If a player's king is captured, their tunnel mouth collapses, as above.
  
  Queen Defection
  
  When a player capture's a king, the queen of the losing clan defects to the capturing player's clan. This is true even if that queen has already been captured.
  
  If there are any empty squares in the capturing player's tunnel mouth, a new queen will immediately appear in one of the squares.
  
  If there are no empty squares in the capturing player's tunnel mouth, a new queen will appear as soon as a square becomes unoccupied.
  
  If the there are no empty squares in the capturing player's tunnel mouth because the tunnel has collapsed, a new queen will appear in one of the squares of the tunnel mouth. The square will fill with rubble as soon as the square is empty again.
  
  Locking
  
  A situation can arise where a player is unable to make any legal move. In that case, that player forfeits the move phase of their turn.
  
  Likewise, if a player's tunnel mouth is completely occupied during the placement phase of their turn, they forfeit that phase.

## Support
If you have any questions about the app or suggestions, please send me an email at tim.loughrist@gmail.com.

## Roadmap
In the future, I'd like to add the following features:

1. Include a messaging function
2. Include friending
3. Include private games
4. Include automatic cleanup of completed or inactive games
5. Include asynchronous games with email notifications
6. Include profile pictures

## Contributing
If anyone wants to fork this repo and work on the app, I'd love to see what you do with it!

## Authors and acknowledgment
I've been lucky to have the help of instructors at the [Flatiron coding bootcamp](https://flatironschool.com/welcome-to-flatiron-school/?utm_source=Google&utm_medium=ppc&utm_campaign=12728169833&utm_content=127574232664&utm_term=flatiron&uqaid=513747011248&CjwKCAjwsMGYBhAEEiwAGUXJafADpgJFbJ4--7MTNBIDgpVzlW_ojAyku7GlAFULzRS0BW5RBpdGFBoCjNEQAvD_BwE&gclid=CjwKCAjwsMGYBhAEEiwAGUXJafADpgJFbJ4--7MTNBIDgpVzlW_ojAyku7GlAFULzRS0BW5RBpdGFBoCjNEQAvD_BwE). I also want to thank everyone I've played board games with for inspiring this app. I especially want to thank Kat Morrow for the wonderful art.