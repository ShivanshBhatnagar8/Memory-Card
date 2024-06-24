/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";

function App() {
  // https://gateway.marvel.com:443/v1/public/characters?ts=1&limit=12&apikey=bd8b3d1ac0a7581457dfb795a9fc044b&hash=e84e4f9abc157ff276c22ac46df83fc3
  let charactersId = [
    1009220, 1009368, 1009664, 1009351, 1009338, 1009189, 1009282, 1009610,
    1009707, 1009652, 1009685, 1009718,
  ];
  // const url = "https://gateway.marvel.com:443/v1/public/characters";
  // const apiKey = "bd8b3d1ac0a7581457dfb795a9fc044b";
  // const hash = "e84e4f9abc157ff276c22ac46df83fc3";
  // const [arr, SetArr] = useState([]);

  // async function fetchData() {
  //   let obj = await fetch(
  //     `${url}/1009220?ts=1&limit=12&apikey=${apiKey}&hash=${hash}`
  //   );
  //   let data = await obj.json();
  //   console.log(data.data.results);
  // }
  // fetchData();

  return (
    <>
      <h1>Memory Game</h1>
    </>
  );
}

export default App;
