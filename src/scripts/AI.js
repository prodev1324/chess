import * as tools from "rsg-chess/src/tools";

export const html = `
<html>
  <body>
    <script>
    var PIECE_CHARS={pawn:{W:"♙",B:"♟"},rook:{W:"♖",B:"♜"},knight:{W:"♘",B:"♞"},bishop:{W:"♗",B:"♝"},queen:{W:"♕",B:"♛"},king:{W:"♔",B:"♚"}};function Piece(e,o,t,r,i,n){if(t&&(this.char=t[r]),this.color=r,this.x=e,this.y=o,this.game=i,this.type=n){var a="knight"===n?"n":n.charAt(0);"W"===this.color&&(a=a.toUpperCase()),this.FENname=a}}function Pawn(e,o,t,r){Piece.call(this,e,o,PIECE_CHARS.pawn,t,r,"pawn")}function Rook(e,o,t,r){Piece.call(this,e,o,PIECE_CHARS.rook,t,r,"rook")}function Knight(e,o,t,r){Piece.call(this,e,o,PIECE_CHARS.knight,t,r,"knight")}function Bishop(e,o,t,r){Piece.call(this,e,o,PIECE_CHARS.bishop,t,r,"bishop")}function Queen(e,o,t,r){Piece.call(this,e,o,PIECE_CHARS.queen,t,r,"queen")}function King(e,o,t,r){Piece.call(this,e,o,PIECE_CHARS.king,t,r,"king")}function Game(e){this.board=[];for(var o=0;o<8;o++){for(var t=[],r=0;r<8;r++)t.push(null);this.board.push(t)}this.turn=[],this.FEN=[],this.FENboard=[],this.threefold=[]}Piece.empty=function(){return new Piece},Piece.prototype.getValidMoves=function(){return[{x:0,y:0},{x:7,y:7}]},Pawn.prototype=Piece.empty(),Pawn.prototype.getValidMoves=function(e){var o,t,r=this.game,i=[],n=this.y,a=this.x,c=r.board,h=r.turn,l=h.length,p="W"===this.color?n-1:n+1,s="W"===this.color?n-2:n+2,u=(this.color,[a-1,a+1]);p<8&&0<=p&&!c[p][a]&&(i.push({x:a,y:p}),(1===n||6===n)&&s<8&&0<=s&&!r.board[s][a]&&i.push({x:a,y:s}));for(var f=0;f<2;f++)t=u[f],p<8&&0<=p&&c[p][t]&&c[p][t].color!==this.color&&i.push({x:t,y:p});for(f=0;f<2;f++)t=u[f],!(o=h[l-1])||"pawn"!==o.type||o.to.x!==t||o.to.y!==n||o.color===this.color||1!==o.from.y&&6!==o.from.y||3!==n&&4!==n||i.push({x:t,y:p,movePiece:{piece:r.board[n][t],from:{x:t,y:n},to:null}});return e?r.simulateAndFilter(i,this):i},Piece.pawn=function(e,o,t,r){return new Pawn(e,o,t,r)},Rook.prototype=Piece.empty(),Rook.prototype.getValidMoves=function(e){var n=this.game,a=[];[[-1,0],[1,0],[0,1],[0,-1]].forEach(function(e){var o,t,r,i;for(o=1;(t=this.x+e[0]*o,!((r=this.y+e[1]*o)<0||7<r||t<0||7<t))&&(!(i=n.board[r][t])||i.color!==this.color)&&(a.push({x:t,y:r}),!i);o++);},this);return e?n.simulateAndFilter(a,this):a},Piece.rook=function(e,o,t,r){return new Rook(e,o,t,r)},Knight.prototype=Piece.empty(),Knight.prototype.getValidMoves=function(e){for(var o,t,r=this.game,i=[],n=[[2,1],[-2,1],[1,2],[-1,2],[2,-1],[-2,-1],[1,-2],[-1,-2]],a=0;a<n.length;a++){var c,h=!1;o=n[a][0],t=n[a][1],this.x+o<8&&0<=this.x+o&&this.y+t<8&&0<=this.y+t&&(h=!(c=r.board[this.y+t][this.x+o])||c.color!==this.color),h&&i.push({x:this.x+o,y:this.y+t})}return e?r.simulateAndFilter(i,this):i},Piece.knight=function(e,o,t,r){return new Knight(e,o,t,r)},Bishop.prototype=Piece.empty(),Bishop.prototype.getValidMoves=function(e){var n=this.game,a=[];[[-1,-1],[1,1],[-1,1],[1,-1]].forEach(function(e){var o,t,r,i;for(o=1;(t=this.x+e[0]*o,!((r=this.y+e[1]*o)<0||7<r||t<0||7<t))&&(!(i=n.board[r][t])||i.color!==this.color)&&(a.push({x:t,y:r}),!i);o++);},this);return e?n.simulateAndFilter(a,this):a},Piece.bishop=function(e,o,t,r){return new Bishop(e,o,t,r)},Queen.prototype=Piece.empty(),Queen.prototype.getValidMoves=function(e){var o=this.game,t=Rook.prototype.getValidMoves.call(this),r=Bishop.prototype.getValidMoves.call(this),i=t.concat(r);return e?o.simulateAndFilter(i,this):i},Piece.queen=function(e,o,t,r){return new Queen(e,o,t,r)},King.prototype=Piece.empty(),King.prototype.getValidMoves=function(e){var h=[],l=this.x,p=this.y,s=this.game,u=s.turn,f=this;[[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1],[-1,0],[1,0]].forEach(function(e){var o,t=l+e[0],r=p+e[1];t<8&&0<=t&&r<8&&0<=r&&((o=s.board[r][t])&&o.color===f.color||h.push({x:t,y:r}))}),u.some(function(e){return"king"===e.type&&e.color===f.color})||[[0,2,-1],[7,6,1]].forEach(function(e){var o=e[0],t=e[1],r=e[2],i=s.board[p][o];if(i&&"rook"!==!i.type&&!u.some(function(e){return e.from.x===o&&e.from.y===p})){for(var n=l+r;n!==o;n+=r){if(s.board[p][n])return;var a=!0;if(s.board.forEach(function(e){e.forEach(function(e){e&&"king"!==e.type&&e.color!==f.color&&e.getValidMoves().forEach(function(e){e&&e.y===p&&e.x===n&&(a=!1)})})}),!a)return}var c={x:t,y:p,movePiece:{piece:f.game.board[p][o],from:{x:o,y:p},to:{y:p,x:l+r}}};h.push(c)}});return e?s.simulateAndFilter(h,f):h},Piece.king=function(e,o,t,r){return new King(e,o,t,r)},Game.prototype.piece=function(e,o,t,r){var i=Piece[e](o,t,r,this);this.board[t][o]=i,this.FEN=this.gameToFEN(),this.FENboard=this.boardToFEN()},Game.prototype.moveSelected=function(e,o,t,r,i){var n=o.x,a=o.y;if(e){var c={x:e.x,y:e.y};if(this.board[a][n]!==e){for(var h=e.getValidMoves(!i),l=null,p=0;p<h.length;p++){var s=h[p];if(s.x===n&&s.y===a){l=s;break}}if(!l)return!1;var u,f,y,v=l.movePiece;v&&(u=v.from,null===(f=v.to)||(y=this.board[u.y][u.x],(this.board[f.y][f.x]=y).x=f.x,y.y=f.y),this.board[u.y][u.x]=null);var m=this.board[a][n]?this.board[a][n]:null;v=v?l.movePiece:null,this.turn.push({from:c,to:o,color:e.color,type:e.type,piece:m,movePiece:v}),this.board[a][n]=e,this.board[e.y][e.x]=null,this.board[a][n].x=n,this.board[a][n].y=a,this.FEN=this.gameToFEN(),this.FENboard=this.boardToFEN(),this.threefold.push(this.FENboard),("pawn"===e.type||m)&&(this.threefold=[]),this.threefoldCheck()&&r("D"),50<=this.halfmoveClock()&&r("D"),"pawn"===e.type&&("W"===e.color&&0===a||"B"===e.color&&7===a)&&t&&t(e,n,a,e.color);var g="W"===e.color?"B":"W",d=this.checkmate(g);d&&r(d)}return!(e=null)}},Game.prototype.promotePawn=function(e,o,t,r,i){this.piece(i,o,t,r)},Game.prototype.simulateAndFilter=function(e,c){var h=[],l=this,p=this.board;return e.forEach(function(e,o){var t=e.y,r=e.x,i={x:c.x,y:c.y},n=p[t][r]?{piece:p[t][r],from:{x:r,y:t},to:null}:null;e.movePiece&&(n=e.movePiece),n&&l.simpleMovePiece(n.piece,n.from,n.to),l.simpleMovePiece(c,i,{x:r,y:t});var a=l.warning(c.color);l.simpleMovePiece(c,{x:r,y:t},i),n&&l.simpleMovePiece(n.piece,n.to,n.from),a||h.push(e)}),h},Game.prototype.checkmate=function(e){for(var o=0;o<8;o++)for(var t=0;t<8;t++)if(this.board[o][t]&&this.board[o][t].color===e&&this.board[o][t].getValidMoves(!0).length)return!1;return this.warning(e)?e:"D"},Game.prototype.simpleMovePiece=function(e,o,t){var r=this.board;t&&((r[t.y][t.x]=e).x=t.x,e.y=t.y),o&&(r[o.y][o.x]=null)},Game.prototype.simpleMove=function(e){var o=this,t=o.board,r=e.from,i=e.to,n=t[r.y][r.x],a=this.board[i.y][i.x]?this.board[i.y][i.x]:null,c=t[i.y][i.x]?{piece:t[i.y][i.x],from:{x:i.x,y:i.y},to:null}:null;return this.turn.push({from:r,to:{x:i.x,y:i.y},color:e.color,type:n.type,piece:a,movePiece:c}),i.movePiece&&(c=i.movePiece),c&&o.simpleMovePiece(c.piece,c.from,c.to),o.simpleMovePiece(n,r,{x:i.x,y:i.y}),function(){c&&o.simpleMovePiece(c.piece,c.to,c.from),o.simpleMovePiece(n,{x:i.x,y:i.y},r),a&&(t[i.y][i.x]=a),o.turn.pop()}},Game.prototype.warning=function(o){var t,r=!1;return this.board.forEach(function(e){e.forEach(function(e){e&&e.color===o&&"king"===e.type&&(t=e)})}),this.board.forEach(function(e){e.forEach(function(e){e&&e.color!==o&&e.getValidMoves().forEach(function(e){e.x===t.x&&e.y===t.y&&(r=!0)})})}),r},Game.prototype.threefoldCheck=function(){for(var e=this.threefold,o=e.length,t=0;t<o;t++){for(var r=0,i=t+1;i<o;i++)e[t]===e[i]&&(r+=1);if(2<=r)return!0}return!1},Game.prototype.pieceToAN=function(e,o){return"abcdefgh".charAt(e)+(8-o)},Game.prototype.boardToFEN=function(){for(var e=this.board,o="",t=0,r=0;r<8;r++){for(var i=0;i<8;i++)e[r][i]?(t&&(o+=t),t=0,o+=e[r][i].FENname):t++;t&&(o+=t),t=0,o+=r<7?"/":""}return o},Game.prototype.halfmoveClock=function(){var e=this.turn,o=e.length,t=0;if(0===e.length)return t;for(var r=e[o-1-t];t<=o-1&&"pawn"!==r.type&&!r.piece;)r=e[o-1-++t];return t},Game.prototype.activeColour=function(){var e=this.turn;return e.length&&"W"===e[e.length-1].color?"b":"w"},Game.prototype.castlingTarget=function(){var n,a,c=this.board,h=this.turn,l="";return h.forEach(function(e){n="king"===e.type&&"W"===e.color,a="king"===e.type&&"B"===e.color}),[[7,0],[0,0],[7,7],[0,7]].forEach(function(e){var o=e[0],t=e[1],r=c[t][o];if((7!==t||!n)&&(0!==t||!a)&&r&&"rook"!==!r.type&&!h.some(function(e){return"rook"===e.type&&(e.from.x===o&&e.from.y===t)})){var i=0===o?"q":"k";l+=0===t?i.toUpperCase():i}}),l||(l="-"),l},Game.prototype.enPassantTarget=function(){var e=this.turn,o="";if(e.length){var t=e[e.length-1];"W"===t.color&&4===t.to.y&&(o=this.pieceToAN(t.to.x,t.to.y+1)),"B"===t.color&&3===t.to.y&&(o=this.pieceToAN(t.to.x,t.to.y-1))}return o||(o="-"),o},Game.prototype.fullmoveCount=function(){var o=1;return this.turn.forEach(function(e){"B"===e.color&&(o+=1)}),o},Game.prototype.gameToFEN=function(){var e="";return e+=this.boardToFEN(),e+=" "+this.activeColour(),e+=" "+this.castlingTarget(),e+=" "+this.enPassantTarget(),e+=" "+this.halfmoveClock(),e+=" "+this.fullmoveCount()},Game.prototype.initializeGame=function(){for(var e=new Game,o=0;o<8;o++)e.piece("pawn",o,6,"W"),e.piece("pawn",o,1,"B");return e.piece("rook",0,0,"B"),e.piece("knight",1,0,"B"),e.piece("bishop",2,0,"B"),e.piece("queen",3,0,"B"),e.piece("king",4,0,"B"),e.piece("bishop",5,0,"B"),e.piece("knight",6,0,"B"),e.piece("rook",7,0,"B"),e.piece("rook",0,7,"W"),e.piece("knight",1,7,"W"),e.piece("bishop",2,7,"W"),e.piece("queen",3,7,"W"),e.piece("king",4,7,"W"),e.piece("bishop",5,7,"W"),e.piece("knight",6,7,"W"),e.piece("rook",7,7,"W"),e},Game.prototype.allMoves=function(){for(var o=this.board,t=[],e=this.activeColour().toUpperCase(),r=0;r<8;r++)for(var i=0;i<8;i++){if(o[r][i]&&o[r][i].color===e)o[r][i].getValidMoves(!0).forEach(function(e){t.push({color:o[r][i].color,from:{x:i,y:r},to:e,FENname:o[r][i].FENname})})}return t};var ChessAI=function(e,o,t){for(var r=Game.prototype.initializeGame(),i=0;i<8;i++)for(var n=0;n<8;n++)if(o.board[i][n]){var a=o.board[i][n];r.piece(a.type,n,i,a.color)}else r.board[i][n]=null;r.turn=o.turn,r.threefold=o.threefold,r.FEN=o.FEN,r.FENboard=o.FENboard;var c,h=r.allMoves(),l=-9999;for(i=0;i<h.length;i++){var p=h[i],s=r.simpleMove(p),u=minimax(e-1,r,-1e4,1e4,!t);s(),l<=u&&(l=u,c=p)}return c},minimax=function(e,o,t,r,i){if(0===e)return-evaluateBoard(o.board);var n=o.allMoves();if(i){for(var a=-9999,c=0;c<n.length;c++){var h=o.simpleMove(n[c]);if(a=Math.max(a,minimax(e-1,o,t,r,!i)),h(),r<=(t=Math.max(t,a)))return a}return a}for(a=9999,c=0;c<n.length;c++){h=o.simpleMove(n[c]);if(a=Math.min(a,minimax(e-1,o,t,r,!i)),h(),(r=Math.min(r,a))<=t)return a}return a},evaluateBoard=function(e){for(var o=0,t=0;t<8;t++)for(var r=0;r<8;r++)o+=getPieceValue(e[t][r]);return o},reverseArray=function(e){return e.slice().reverse()},pawnEvalWhite=[[0,0,0,0,0,0,0,0],[5,5,5,5,5,5,5,5],[1,1,2,3,3,2,1,1],[.5,.5,1,2.5,2.5,1,.5,.5],[0,0,0,2,2,0,0,0],[.5,-.5,-1,0,0,-1,-.5,.5],[.5,1,1,-2,-2,1,1,.5],[0,0,0,0,0,0,0,0]],pawnEvalBlack=reverseArray(pawnEvalWhite),knightEval=[[-5,-4,-3,-3,-3,-3,-4,-5],[-4,-2,0,0,0,0,-2,-4],[-3,0,1,1.5,1.5,1,0,-3],[-3,.5,1.5,2,2,1.5,.5,-3],[-3,0,1.5,2,2,1.5,0,-3],[-3,.5,1,1.5,1.5,1,.5,-3],[-4,-2,0,.5,.5,0,-2,-4],[-5,-4,-3,-3,-3,-3,-4,-5]],bishopEvalWhite=[[-2,-1,-1,-1,-1,-1,-1,-2],[-1,0,0,0,0,0,0,-1],[-1,0,.5,1,1,.5,0,-1],[-1,.5,.5,1,1,.5,.5,-1],[-1,0,1,1,1,1,0,-1],[-1,1,1,1,1,1,1,-1],[-1,.5,0,0,0,0,.5,-1],[-2,-1,-1,-1,-1,-1,-1,-2]],bishopEvalBlack=reverseArray(bishopEvalWhite),rookEvalWhite=[[0,0,0,0,0,0,0,0],[.5,1,1,1,1,1,1,.5],[-.5,0,0,0,0,0,0,-.5],[-.5,0,0,0,0,0,0,-.5],[-.5,0,0,0,0,0,0,-.5],[-.5,0,0,0,0,0,0,-.5],[-.5,0,0,0,0,0,0,-.5],[0,0,0,.5,.5,0,0,0]],rookEvalBlack=reverseArray(rookEvalWhite),evalQueen=[[-2,-1,-1,-.5,-.5,-1,-1,-2],[-1,0,0,0,0,0,0,-1],[-1,0,.5,.5,.5,.5,0,-1],[-.5,0,.5,.5,.5,.5,0,-.5],[0,0,.5,.5,.5,.5,0,-.5],[-1,.5,.5,.5,.5,.5,0,-1],[-1,0,.5,0,0,0,0,-1],[-2,-1,-1,-.5,-.5,-1,-1,-2]],kingEvalWhite=[[-3,-4,-4,-5,-5,-4,-4,-3],[-3,-4,-4,-5,-5,-4,-4,-3],[-3,-4,-4,-5,-5,-4,-4,-3],[-3,-4,-4,-5,-5,-4,-4,-3],[-2,-3,-3,-4,-4,-3,-3,-2],[-1,-2,-2,-2,-2,-2,-2,-1],[2,2,0,0,0,0,2,2],[2,3,1,0,0,1,3,2]],kingEvalBlack=reverseArray(kingEvalWhite),getPieceValue=function(e){if(null===e)return 0;var o,t,r,i,n,a,c=(t=(o=e).color,r=o.type,i=o.x,n=o.y,a="W"===t,"pawn"===r?10+(a?pawnEvalWhite[n][i]:pawnEvalBlack[n][i]):"rook"===r?50+(a?rookEvalWhite[n][i]:rookEvalBlack[n][i]):"knight"===r?30+knightEval[n][i]:"bishop"===r?30+(a?bishopEvalWhite[n][i]:bishopEvalBlack[n][i]):"queen"===r?90+evalQueen[n][i]:"king"===r?900+(a?kingEvalWhite[n][i]:kingEvalBlack[n][i]):void 0);return"W"===e.color?c:-c},uncycleBoard=(getPieceValue=function(e){if(null===e)return 0;var o,t=((o=e).color,"pawn"===o.type?10:"rook"===o.type?50:"knight"===o.type?30:"bishop"===o.type?30:"queen"===o.type?90:"king"===o.type?900:void 0);return"W"===e.color?t:-t},function(e){for(var o=[],t=0;t<e.length;t++){for(var r=[],i=0;i<e[t].length;i++)e[t][i]?r.push({char:e[t][i].char,color:e[t][i].color,x:e[t][i].x,y:e[t][i].y,type:e[t][i].type,FENname:e[t][i].FENname}):r.push(null);o.push(r)}return o}),uncycleTurns=function(e){var t=[];return e.map(function(e){var o={};o.from=e.from,o.to=e.to,o.color=e.color,o.type=e.type,o.piece=null,o.movePiece=null,e.piece&&(o.piece={char:e.piece.char,color:e.piece.color,x:e.piece.x,y:e.piece.y,type:e.piece.type,FENname:e.piece.FENname}),e.movePiece&&(o.movePiece=uncycleMovePiece(e.movePiece)),t.push(o)}),t},uncycleMovePiece=function(e){return{from:e.from,to:e.to,piece:{char:e.piece.char,color:e.piece.color,x:e.piece.x,y:e.piece.y,type:e.piece.type,FENname:e.piece.FENname}}},stringifyBoard=function(e){var o=uncycleBoard(e);return JSON.stringify(o)};stringifyBoard=function(e){var o=uncycleTurns(e);return JSON.stringify(o)};window.RSGChess={Game:Game,AI:ChessAI,Pieces:{PIECE_CHARS:PIECE_CHARS,pawn:Piece.pawn,rook:Piece.rook,knight:Piece.knight,bishop:Piece.bishop,queen:Piece.queen,king:Piece.king},tools:{uncycleBoard:uncycleBoard,uncycleTurns:uncycleTurns,uncycleMovePiece:uncycleMovePiece,stringifyBoard:stringifyBoard,stringifyBoard:stringifyBoard}};
    </script>
    <script>
      window.AI = function (params) {
        var bestMove = RSGChess.AI(params.playAgainstAI.depth, {board: params.board, turn: JSON.parse(params.turn)}, true);
        if (bestMove.to.movePiece) bestMove.to.movePiece = RSGChess.tools.uncycleMovePiece(bestMove.to.movePiece);
        window.postMessage(JSON.stringify(bestMove));
      }
    </script>
  </body>
</html>
`;

export const combineParams = (game, playAgainstAI) => {
  const board = tools.uncycleBoard(game.board);
  const turn = tools.uncycleTurns(game.turn);

  const combine = {
    board: board,
    turn: JSON.stringify(turn),
    threefold: JSON.stringify(game.threefold),
    FEN: game.FEN,
    playAgainstAI: playAgainstAI
  };

  return JSON.stringify(combine);
};
