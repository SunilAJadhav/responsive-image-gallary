import React from 'react';
import axios from 'axios';
import { NavLink} from 'react-router-dom';
import './../App.css';

const DisplayImage = ({ list, index }) => (
    <NavLink className="list-element" key={`list${list.id}`} to={{pathname:'/'+list.name, list: list }}>
        <div className="image-item" key={`show${list.id}`} >
        <div className="image-item-container">
            {list && list.image && <img src={list.image} alt={list.image}/> }
            {list.is_sold_out && 
              <div className="sold-out-container"><span className="sold-out">SOLD</span></div> }
            </div>
            <h3>{list.name}</h3>
            <h4>$ {list.price}
              <span className="like">
                <span className="heart icon"></span>
                <span className="like-count">{list.like_count}</span>
                </span>
              </h4>
        </div>
    </NavLink>
  );
  
  const Home = () => {
    const [lists, setLists] = React.useState([]);
    const [loaded, setIsLoaded] = React.useState(false);
    const [error, setIsError] = React.useState(false);
  
    React.useEffect(() => {
      const checkForLocalData = JSON.parse(localStorage.getItem("lists"));

      if(checkForLocalData.length === 0){
        fetchImages();
      }else{
        setLists([...lists, ...checkForLocalData]);
        setIsLoaded(true);
      }
    }, []);
  
    const fetchImages = () => {
      const apiURI = 'http://localhost:3000/all';

      axios.get(apiURI).then(response => {
        setLists([...lists, ...response.data]);
          setIsLoaded(true);
          localStorage.setItem("lists", JSON.stringify(lists));
        })
        .catch((err) => {
            setIsError(true);
          })
    };

    return (
          <div className="container">
              <div className="image-grid">
                {loaded
                  ? lists.map((list, index) => (
                      <DisplayImage list={list} key={`list${index}`} index={index} />
                    ))
                  : error ? 'some error occurred, while fetching api':"loading..."}
              </div>
          </div>
    );
  };

  export default Home;