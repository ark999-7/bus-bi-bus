import React, { useEffect, useRef, useState } from "react";
import { Chess } from "chess.js";
import { Chessground } from "chessground";
import "chessground/assets/chessground.css";

function ChessPracticeBoard() {
  const boardRef = useRef(null);
  const [game, setGame] = useState(new Chess());

  useEffect(() => {
    const ground = Chessground(boardRef.current, {
      fen: game.fen(),
      turnColor: "white",
      movable: {
        free: false,
        color: "white",
        dests: getDestinations(game),
        events: {
          after: (from, to) => {
            const move = game.move({ from, to, promotion: "q" });
            if (move) {
              ground.set({ fen: game.fen(), turnColor: "black", movable: { dests: getDestinations(game) } });
            }
          }
        }
      }
    });
    return () => ground.destroy();
  }, [game]);

  function getDestinations(chess) {
    const dests = new Map();
    chess.SQUARES.forEach(s => {
      const moves = chess.moves({ square: s, verbose: true });
      if (moves.length)
        dests.set(s, moves.map(m => m.to));
    });
    return dests;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div ref={boardRef} style={{ width: "400px", height: "400px" }} />
    </div>
  );
}

export default ChessPracticeBoard;