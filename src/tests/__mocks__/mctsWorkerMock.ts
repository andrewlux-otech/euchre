class MCTSWorkerMock {
    onmessage: ((event: MessageEvent) => void) | null = null;
  
    postMessage(message: any): void {
      if (this.onmessage) {
        // Simulate worker logic and respond
        const result = { result: 0.5 }; // Mocked result
        this.onmessage({ data: result } as MessageEvent);
      }
    }
  
    terminate(): void {
      // Mock termination
    }
  }
  
  export default MCTSWorkerMock;
  