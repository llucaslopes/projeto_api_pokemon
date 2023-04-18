import axios from "axios";
import { useEffect, useState } from "react";


function App() {
  const [list, setList] = useState([]);

  const fetchListData = () => {
    axios
    .get('https://pokeapi.co/api/v2/pokemon')
    .then((response) => {
      const sortedArray = [...response.data.results];

      sortedArray.sort((a, b) => {
        console.log({ a });
        console.log({ b });

        return a.name.localeCompare(b.name);
      });

      console.log({sortedArray});
      setList(sortedArray);
    });
  };

  useEffect(() => {
   fetchListData();
  }, []);

  return (
    <>
      <h1>consumir api pokémon</h1>
      <hr  />
      {list.map((item) => (
        <Pokemon key={item.name} data={item} />
      ))}
    </>
  );
}

const Pokemon = ({data}) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios
    .get(data.url)
    .then((response) => setDetails(response.data));
  }, []);

  if(details == null){
    return <div>-</div>
  }
  
  return (
    <div style={{display: 'flex', alignItems: 'center' }}>
      <img 
        src={details.sprites.front_default} 
        style={{width: 30, marginRight: 20}}
      />

      <span>
        <b>{details.name}</b> - EXP {details.base_experience}
      </span>
      </div>
    
  );
};

export default App;