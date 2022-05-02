// import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { update } from "./store/actions/action";

function App() {
  const [page, setpage] = useState(1);
  // const [data, setdata] = useState({ results: [] });
  const [loading, setloading] = useState(false);
  const [selected, setselected] = useState(1);
  const [dimension, setdimension] = useState("");
  const [residents, setresidents] = useState(0);
  const [chapters, setchapters] = useState([]);

  //redux
  const data = useSelector((state) => state.data);

  const dispatch = useDispatch();
  //redux

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

  /**get dimension */
  /**get dimension */
  const getDimension = async () => {
    let url = data
      .filter((i) => i.id == selected)
      .slice(0, 1)
      .map((item) => {
        return item.location.url;
      });
    let location = await axios.get(url).then((res) => {
      return res.data;
    });

    let ammount = location.residents.length;
    setdimension(location.dimension);
    setresidents(ammount);
    // console.log(ammount);
  };
  /**get dimension */
  /**get dimension */

  /**get chapters */
  /**get chapters */
  const getChapters = async () => {
    let urls = data
      .filter((i) => i.id == selected)
      .slice(0, 1)
      .map((item) => {
        return item.episode;
      });

    console.log(urls);

    urls = urls.flat();

    const promises = urls.map(async (url) => {
      const res = await axios.get(url, {
        mode: "no-cors",
      });
      return res.data;
    });
    Promise.all(promises).then((data) => {
      console.log(data);
      setchapters(data);
    });

    // console.log(chapArray);

    // let chap = await Promise.all(
    //    urls.forEach(element => {
    //     const res =  fetch(element);
    //     return  res.json();
    //    })
    //  )

    // setchapters(chapArray);
  };

  /**get chapters */
  /**get chapters */

  /**get the data */
  /**get the data */

  /**debounce funtion */
  /**debounce funtion */

  const debounce = (fun, time) => {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fun(...args);
      }, time);
    };
  };
  /**debounce funtion */
  /**debounce funtion */

  /** load data in state */
  /** load data in state */
  const scrollHandle = () => {
    setpage(page + 1);
    getPhotos(page);
  };

  useEffect(() => {
    // getDimention();
    // console.log(uniqueNames);
    scrollHandle();
    // console.log(data);
    // getPhotos(page);
    return () => {
      console.log("unmount");
    };
  }, []);

  useEffect(() => {
    console.log(chapters);
    getDimension();
    getChapters();
    return () => {
      console.log("unmount");
    };
  }, [selected]);
  /** load data in state */
  /** load data in state */

  /**INFINITE SCROLL */
  /**INFINITE SCROLL */
  /**INFINITE SCROLL */
  window.onscroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      scrollHandle();
    }
  }, 100);
  /**INFINITE SCROLL */
  /**INFINITE SCROLL */
  /**INFINITE SCROLL */

  return (
    <div className="App">
      <div className="container">
        <div className="list" id="list">
          {data.map((item, index) => (
            <div
              className="listItem"
              key={index}
              onClick={() => setselected(item.id)}
            >
              <img className="avtar" src={item.image} />
              <p>{item.name}</p>
            </div>
          ))}
          {loading && <p>Loading...</p>}
        </div>
        <div className="result">
          {data
            .filter((i) => i.id == selected)
            .slice(0, 1)
            .map((item, index) => (
              <div className="resultContainer" key={index}>
                <img className="rAvtar" src={item.image} />
                <p className="rName">{item.name}</p>
                <p className="rText">Status: {item.status}</p>
                <p className="rText">Species: {item.species}</p>
                <p className="rText">Gender: {item.gender}</p>
                <div className="break"></div>
                <p className="rText">Origin: {item.origin.name}</p>
                <p className="rText">Location: {item.location.name}</p>
                <p className="rText">Dimention: {dimension}</p>
                <p className="rText">Residents Ammount: {residents}</p>
                <div className="break"></div>
                <p className="rText">Chapters: </p>
                <div className="chapters">
                  {chapters.map((item, index) => (
                    <p className="rText chaptersTXT" key={index}>
                      {" "}
                      {item.name}
                      {", "}
                    </p>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
