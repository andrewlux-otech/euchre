"use client";

import React, { useEffect, useRef, useState } from "react";
import { State, Card } from "../types/mcts";

const Game: React.FC = () => {
  const workerRef = useRef<Worker | null>(null);
  const serverRef = useRef<Worker | null>(null);
  const [state, setState] = useState<State>();

  useEffect(() => {
    if (state === undefined) {
      return;
    }

    if (state.turn === 0) {
      if (
        state.hands[0]?.find((card) =>
          card === undefined
            ? undefined
            : card.suit === "Diamonds" && card.rank === "Jack",
        )
      ) {
        serverRef.current!.postMessage({
          play: { rank: "Jack", suit: "Diamonds" } as Card,
        });
      } else if (
        state.hands[0]?.find((card) =>
          card === undefined
            ? undefined
            : card.suit === "Spades" && card.rank === "Ace",
        )
      ) {
        serverRef.current!.postMessage({
          play: { rank: "Ace", suit: "Spades" } as Card,
        });
      } else if (
        state.hands[0]?.find((card) =>
          card === undefined
            ? undefined
            : card.suit === "Spades" && card.rank === "Ten",
        )
      ) {
        serverRef.current!.postMessage({
          play: { rank: "Ten", suit: "Spades" } as Card,
        });
      } else if (
        state.hands[0]?.find((card) =>
          card === undefined
            ? undefined
            : card.suit === "Diamonds" && card.rank === "Nine",
        )
      ) {
        serverRef.current!.postMessage({
          play: { rank: "Nine", suit: "Diamonds" } as Card,
        });
      } else if (
        state.hands[0]?.find((card) =>
          card === undefined
            ? undefined
            : card.suit === "Hearts" && card.rank === "Queen",
        )
      ) {
        serverRef.current!.postMessage({
          play: { rank: "Queen", suit: "Hearts" } as Card,
        });
      } 
    } else {
      serverRef.current!.postMessage({});
    }
  }, [state]);

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
      console.log("Message from server:", event.data);
      // const data = event.data;

      setState(event.data);
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
        deal: true,
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
