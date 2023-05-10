import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import logo from './logo.svg';
import './App.css';
import Map from './Map';
import Report from './Report';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Report />
        </header>
        <Map />
      </div>
    </QueryClientProvider>
  );
}

export default App;
