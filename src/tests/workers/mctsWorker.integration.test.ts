import MCTSWorkerMock from "../../__mocks__/mctsWorkerMock";

describe("MCTS Worker (Integration)", () => {
  let worker: MCTSWorkerMock;

  beforeEach(() => {
    worker = new MCTSWorkerMock();
  });

  afterEach(() => {
    worker.terminate();
  });

  it("should process a message and return the MCTS result", (done) => {
    worker.onmessage = (event) => {
      expect(event.data).toEqual({ result: 0.5 }); // Mocked response
      done();
    };

    worker.postMessage({ state: "mockState" });
  });
});
