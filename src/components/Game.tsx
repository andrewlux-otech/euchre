import React, { useEffect } from "react";
import MCTSWorker from "../workers/mctsWorker.worker";

const Game = () => {
  useEffect(() => {
    const worker = new MCTSWorker();

    worker.onmessage = (event) => {
      console.log("Best move:", event.data.bestMove);
    };

    worker.postMessage({ gameState: {}, iterations: 1000 });

    return () => {
      worker.terminate();
    };
  }, []);

  return <div>Check the console for the best move!</div>;
};

export default Game;
