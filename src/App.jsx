/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./styles/style.css";
import Card from "./components/Card";



function App() {
  const [arr, SetArr] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
 
  async function fetchData() {
    try{
      let obj = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=12`);
       let data = await obj.json();
       let results = data.results.map((el)=>{
         el.isClicked = false;
         return el
       })
         SetArr(results);
      }catch(error){
        return error
  }
}

  useEffect(()=>{
  fetchData();
  },[])
  
  function shuffleArray(array){
   for(let i=0;i<array.length;i++){
    let random = Math.floor(Math.random() * array.length);
    [arr[random] , arr[i]] = [arr[i] , arr[random]];
    }
  }

  function settingScores(array,name){
    array.forEach((element)=>{
      if(score===0){
        element.isClicked = false;
      }
     if(element.name === name){
      if(element.isClicked){
      setBestScore(Math.max(score,bestScore));
      setScore(0);
      element.isClicked = false;
      }else{
        setScore(score+1);
      
    }
     }
      if(score===arr.length){
        setBestScore(score);
        setScore(0);
      }
     })
  }
  function handleCardClick(name){
    shuffleArray(arr);
    SetArr(arr.map((element)=>{
     if(element.name === name){
     return {...element, isClicked: true};
     }else{
      return element;
     }
 }))
 settingScores(arr,name);
}

  return (
    <>
    <header>
      <h1>Memory Card</h1>
      <div className="score-container">
        <p>Score: {score}</p>
        <p>Best Score: {bestScore}</p>
      </div>
      </header>
     <Card array={arr} onclick={handleCardClick}></Card>
     </>
  );

}
export default App;
