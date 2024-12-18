import React, { useEffect, useRef } from "react";

const Game: React.FC = () => {
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Instantiate the worker using the native Worker API
    const worker = new Worker(new URL("../workers/mctsWorker.ts", import.meta.url));
    workerRef.current = worker;

    // Handle messages from the worker
    worker.onmessage = (event) => {
      console.log("Message from worker:", event.data);
    };

    // Clean up the worker on component unmount
    return () => {
      worker.terminate();
      workerRef.current = null;
    };
  }, []);

  // Function to send a message to the worker
  const handleClick = () => {
    if (workerRef.current) {
      workerRef.current.postMessage({ state: "gameState", iterations: 1000 });
    }
  };

  return (
    <div>
      <h1>Game</h1>
      <button onClick={handleClick}>Run MCTS</button>
    </div>
  );
};

export default Game;
