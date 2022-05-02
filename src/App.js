import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { update } from "./store/actions/action";

function App() {
  const [page, setpage] = useState(1);
  // const [data, setdata] = useState({ results: [] });
  const [loading, setloading] = useState(false);

  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();

  /**get the data */
  /**get the data */

  const getPhotos = async (page) => {
    setloading(true);
    await axios
      .get(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then((res) => {
        // setdata(res.data);
        dispatch(update(res.data));
        setloading(false);
      });
  };

  /**get the data */
  /**get the data */

  /** load data in state */
  /** load data in state */
  useEffect(() => {
    console.log(data[0]);
    getPhotos(page);
    return () => {
      console.log("unmount");
    };
  }, [page]);
  /** load data in state */
  /** load data in state */

  /**INFINITE SCROLL */
  /**INFINITE SCROLL */
  /**INFINITE SCROLL */
  window.onscroll = function () {
    window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight && setpage(page + 1);
  };
  /**INFINITE SCROLL */
  /**INFINITE SCROLL */
  /**INFINITE SCROLL */

  return (
    <div className="App">
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
