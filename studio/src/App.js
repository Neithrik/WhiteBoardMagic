import Dropzone from 'react-dropzone'
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const processFiles = async (acceptedFiles) => {

    const queryParams = new URLSearchParams({
      name: acceptedFiles[0].name,
    });

    const requestUrl = `http://localhost:5000?${queryParams.toString()}`

    const res = await fetch(
      requestUrl,
      {
        method: "GET",
        headers: { 
          "Content-type": "application/json",
        },
      }
    );

    const response = await res.text();

    setResponse(response);
  };

  const [response, setResponse] = useState(undefined);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <Dropzone onDrop={processFiles}>
        {({getRootProps, getInputProps}) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
              <p>Retrieved response is {response}</p>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
}

export default App;
