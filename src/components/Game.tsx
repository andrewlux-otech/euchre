"use client";

import React, { useEffect, useRef, useState } from "react";
import { State, Card } from "../types/mcts";
import { followsSuit } from "../utils/followsSuit";
import { isLeft } from "../utils/isLeft";

const Game: React.FC = () => {
  const workerRef = useRef<Worker | null>(null);
  const serverRef = useRef<Worker | null>(null);
  const [state, setState] = useState<State>();
  const [play, setPlay] = useState<Array<Card>>([]);

  useEffect(() => {
    if (state === undefined) {
      return;
    }

    if (state.turn !== 0 && state.myWins + state.myLosses < 5) {
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

  useEffect(() => {
    if (play.length === 0) {
      return;
    }
    serverRef.current!.postMessage({
      play: play[play.length - 1],
    });
  }, [play]);

  return (
    <div>
      <h1>Game</h1>
      <button onClick={handleClick}>Run MCTS</button>
      {(
        state?.hands[0].filter(
          (card: Card | undefined) =>
            card !== undefined &&
            play.find(
              ({ rank, suit }) => rank === card.rank && suit === card.suit,
            ) === undefined,
        ) as Array<Card>
      )?.map((card: Card) => (
        <div key={`${card.rank[0]}${card.suit[0]}`}>
          <button
            onClick={() =>
              state !== undefined &&
              play.length + state.hands[0].length === 5 &&
              state.turn === 0 &&
              (state.trick.length === 0 ||
                followsSuit(
                  isLeft(state.trump, state.trick[0]),
                  state.trick[0],
                  state.trump,
                  isLeft(state.trump, card),
                  card,
                ) ||
                state.hands[0].find((myCard) =>
                  followsSuit(
                    isLeft(state.trump, state.trick[0]),
                    state.trick[0],
                    state.trump,
                    isLeft(state.trump, myCard!),
                    myCard!,
                  ),
                ) === undefined)
                ? setPlay((oldPlay) => [...oldPlay, card])
                : undefined
            }
          >
            {card.rank} of {card.suit}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Game;
