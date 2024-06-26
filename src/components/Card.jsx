function Card({array, onclick}){

return(
    <>
    <div className="card-container">
     {array.map((element,i) => (
            <div key={i} className="card" name={element.name} onClick={()=> onclick(element.name)}>
              <img src={`https://img.pokemondb.net/artwork/${element.name}.jpg`} alt={`${element.name} img`}/>
              <p className="card-name">{element.name.toUpperCase()}</p>
            </div>
          ))}
    </div>
  </>
)
}
export default Card;