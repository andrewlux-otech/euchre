"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card } from "../types/mcts";

const Game: React.FC = () => {
  const workerRef = useRef<Worker | null>(null);
  const serverRef = useRef<Worker | null>(null);
  const [hand, setHand] = useState<Array<Card>>();
  const [burned, setBurned] = useState<Array<Card>>();
  const [trump, setTrump] = useState<Card["suit"]>();

  useEffect(() => {
    if (hand === undefined || burned === undefined || trump === undefined) {
      return;
    }

    workerRef.current!.postMessage({
      iterations: 2500,
      hand,
      burned,
      trump,
    });
  }, [hand, burned, trump]);

  useEffect(() => {
    // Instantiate the worker using the native Worker API
    const worker = new Worker(
      new URL("../workers/mctsWorker.ts", import.meta.url),
    );
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

  useEffect(() => {
    // Instantiate the worker using the native Worker API
    const worker = new Worker(new URL("../workers/server.ts", import.meta.url));
    serverRef.current = worker;

    // Handle messages from the worker
    worker.onmessage = (event) => {
      console.log("Message from worker:", event.data);
      const data = event.data;

      setHand(data.hand);
      setBurned(data.burned);
      setTrump(data.trump);
    };

    // Clean up the worker on component unmount
    return () => {
      worker.terminate();
      serverRef.current = null;
    };
  }, []);

  // Function to send a message to the worker
  const handleClick = () => {
    if (serverRef.current && workerRef.current) {
      serverRef.current.postMessage({
        random: "test7",
      });
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
