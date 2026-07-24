import React from "react";

function Home() {

  return (
    <div>
      <div className="text_block">
        <div className="home_section">
          <h2>Deep underground, rival clans of dwarves expand their tunnels,  searching for more gems and precious metals. When their tunnels collide, the entire clan mobilizes, rushing to the tunnels to claim the contested territory. When three or four tunnels intersect, an all-out melee ensues...</h2>
          <h1 className="centered">...a TUNNEL BRAWL!</h1>
          <p><b>Tunnel Brawl</b> is a modified form of chess for two to four players.</p>
          <p>Each player takes charge of a clan of dwarves fighting for territory. A clan is made up of eight pawns, two rooks, two knights, two bishops, a queen, and a king.</p>
          <p>At the start of the game, each player has four pawns at the mouth of their tunnel and four random pieces in reserve.</p>
          <p>Each turn, if there is room in a player's tunnel mouth, they will place a reinforcement from their reserve into an open square in their tunnel mouth. The reserves will then be replenished back to four pieces for as long as unplaced pieces remain in the clan.</p>
          <p>The game ends when all kings but one have been captured.</p>
          <p>To create a new game, go to the GAMES page and click on CREATE NEW GAME.</p>
          <p>To join someone else's game, go to the TAPROOM and select a game to join. The game will begin whenever the game's creator clicks START GAME.</p>
          <p>You can leave a game any time before it is started. You can cancel your own game at any time.</p>
        </div>
        <div>
          <div className="home_section">
            <h2>Setup</h2>
            <div>
              <div>
                <h3>Two Players</h3>
                <div>
                  <div className="board_description">
                    <p>One player takes control of the red clan and the other takes control of the blue clan. They begin opposite each other, at the eastern and western tunnel mouths. The north and south tunnel mouths are blocked.</p>
                  </div>
                </div>
              </div>
              <div>
                <h3>Three Players</h3>
                <div>
                  <div className="board_description">
                    <p>The players take control of the red, green, and blue clans. They begin in the western &#40;red clan&#41;, northern &#40;green clan&#41;, and eastern &#40;blue clan&#41; tunnel mouths. The southern tunnel mouth is blocked.</p>
                  </div>
                </div>
              </div>
              <div>
                <h3>Four Players</h3>
                <div>
                  <div className="board_description">
                    <p>The players take control of the red, green, blue, and yellow clans. The setup for four players is identical to the setup for three players, except the southern tunnel mouth is occupied by the yellow clan.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="home_section">
            <h2>Moving and Capturing</h2>
            <div>
              <h3>Pawns</h3>
              <div className="piece_combo">
                <div>
                  <img className="piece_image" src="/pieces/red_pawn.png"/>
                </div>
                <div className="piece_description">
                  <p><i>Pawns are the backbone of the clan. They are numerous &#40;there are eight of them in each clan&#41; and quick to mobilize &#40;you begin with four pawns at the mouth of your tunnel&#41;.</i></p>
                  <p>Pawns can move forward &#40;away from the mouth of their tunnel&#41; and sideways, but not backward &#40;toward the mouth of their tunnel&#41;.</p>
                  <p>Pawns move one square, with the exception of their first move when they may move up to two squares.</p>
                  <p>If there is a a piece between the pawn's starting square and ending square &#40;a situation that can only arise on their first move&#41;, they cannot take that move.</p>
                  <p>Pawns capture on the diagonal. If there is an enemy piece one square diagonally from the pawn's starting square, even if that piece is diagonally behind the pawn, the pawn can capture that piece, replacing it on the board.</p>
                  <p>For those familiar with the rules of chess, pawns in Tunnel Brawl cannot capture en passant. Pawn promotion also does not occur in Tunnel Brawl.</p>
                </div>
              </div>
            </div>
            <div>
              <h3>Rooks</h3>
              <div className="piece_combo">
                <div>
                  <img className="piece_image" src="/pieces/yellow_rook.png"/>
                </div>
                <div className="piece_description">
                  <p><i>Rooks are the bruisers of the clan. They charge into battle, running straight at the enemy, scattering their foes before them.</i></p>
                  <p>Rooks can move any number of squares forward, backward, or sideways. They cannot move diagonally.</p>
                  <p>If there is a piece between the rook's starting square and ending square, they cannot take that move.</p>
                  <p>Rooks capture during the course of a normal move: if there is an enemy piece in their ending square, they replace that piece.</p>
                  <p>For those familiar with the rules of chess, castling is not permitted in Tunnel Brawl.</p>
                </div>
              </div>
            </div>
            <div>
              <h3>Knights</h3>
              <div className="piece_combo">
                <div>
                  <img className="piece_image" src="/pieces/blue_knight.png"/>
                </div>
                <div className="piece_description">
                  <p><i>The clan's knights are high-mobility units, leaping over and around friends and enemies alike.</i></p>
                  <p>Knights move in an 'L' shape, by taking two steps forward, backward, or sideways, followed by one step perpendicular to the initial movement.</p>
                  <p>Unlike other pieces, knights ignore pieces between their starting square and ending square, though they cannot end in a square occupied by a friendly piece.</p>
                  <p>Knights capture by ending their move in a square occupied by an enemy piece.</p>
                </div>
              </div>
            </div>
            <div>
              <h3>Bishops</h3>
              <div className="piece_combo">
                <div>
                  <img className="piece_image" src="/pieces/green_bishop.png"/>
                </div>
                <div className="piece_description">
                  <p><i>Bishops are the clan's spiritual leaders, forming a deep connection to the stony walls of the tunnels themselves. This connection allows bishops to slip through the battlefield, appearing where they are least expected.</i></p>
                  <p>Bishops move diagonally, either forward or backward, any number of sqares.</p>
                  <p>If there is a a piece between the bishop's starting square and ending square, they cannot take that move.</p>
                  <p>Bishops capture during the course of a normal move: if there is an enemy piece in their ending square, they replace that piece.</p>
                </div>
              </div>
            </div>
            <div>
              <h3>Queens</h3>
              <div className="piece_combo">
                <div>
                  <img className="piece_image" src="/pieces/red_queen.png"/>
                </div>
                <div className="piece_description">
                  <p><i>Each clan is commanded by a regal warrior-queen. The queen moves quickly about the battlefield, always seeking out those places where the fighting is most intense.</i></p>
                  <p>Queens can move any number of squares forward, backward, sideways, or diagonally.</p>
                  <p>If there is a a piece between the queen's starting square and ending square, they cannot take that move.</p>
                  <p>Queens capture during the course of a normal move: if there is an enemy piece in their ending square, they replace that piece.</p>
                </div>
              </div>
            </div>
            <div>
              <h3>Kings</h3>
              <div className="piece_combo">
                <div>
                  <img className="piece_image" src="/pieces/yellow_king.png"/>
                </div>
                <div className="piece_description">
                  <p><i>The clan is ruled by a king, a slow but mighty warrior. Kings are often the last to arrive on the battlefield and when a king falls, their clan is thrown into chaos. Any member of the clan would gladly put themselves in harm's way to save their king.</i></p>
                  <p>Kings can moves one square in any direction.</p>
                  <p>Kings capture during the course of a normal move: if there is an enemy piece in their ending square, they replace that piece.</p>
                  <p>A king can capture one of their own pieces, typically to escape check.</p>
                  <p>If a king is captured, all of that clan's pieces are removed from the board. That player has lost.</p>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
          <div className="home_section">
            <h2>Special Rules</h2>
            <div>
              <h3>Tunnel Collapse</h3>
              <div>
                <p>If a player has no pieces in reserve, their tunnel mouth collapses, blocking each empty square in the tunnel mouth. If any of the squares in the tunnel mouth are occupied, they become blocked as soon as they are no longer occupied.</p>
                <p>If a player's king is captured, their tunnel mouth collapses, as above.</p>
              </div>
            </div>
            <div>
              <h3>Queen Defection</h3>
              <div>
                <p>When a player capture's a king, the queen of the losing clan defects to the capturing player's clan. This is true even if that queen has already been captured.</p>
                <p>If there are any empty squares in the capturing player's tunnel mouth, a new queen will immediately appear in one of the squares.</p>
                <p>If there are no empty squares in the capturing player's tunnel mouth, a new queen will appear as soon as a square becomes unoccupied.</p>
                <p>If the there are no empty squares in the capturing player's tunnel mouth because the tunnel has collapsed, a new queen will appear in one of the squares of the tunnel mouth. The square will fill with rubble as soon as the square is empty again.</p>
              </div>
            </div>
            <div>
              <h3>Locking</h3>
              <div>
                <p>A situation can arise where a player is unable to make any legal move. In that case, that player forfeits the move phase of their turn.</p>
                <p>Likewise, if a player's tunnel mouth is completely occupied during the placement phase of their turn, they forfeit that phase.</p>
              </div>
            </div>
          </div>
          <div>
            <h2>Creators</h2>
            <div>
              <p>This game was designed by Mark Alan Osterhaus and appeared under the name <i>Bosworth</i> in the U.S. and <i>Waterloo</i> in Europe.</p>
              <p>This online version of the game was created by <a href = "https://timloughrist.com/">Tim Loughrist</a>.</p>
              <p>Character art for the online version of the game was created by Kat Morrow.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;