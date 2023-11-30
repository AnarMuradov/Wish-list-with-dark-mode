import React from "react";
import { useEffect, useState } from "react";
import "./style.css";
const WishList = () => {
  const [api, setApi] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [toggle, setToggle] = useState(true);
  //   const [count, setCount] = useState(0);
  const [local, setLocal] = useState(
    localStorage.getItem("local")
      ? JSON.parse(localStorage.getItem("local"))
      : []
  );

  function getApi() {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setApi(data);
        setIsloading(false);
      });
  }

  useEffect(() => {
    getApi();
  }, []);

  useEffect(() => {
    localStorage.setItem("local", JSON.stringify(local));
  }, [local]);

  function add(newitem) {
    let elementindex = local.findIndex((x) => x.id === newitem.id);
    if (elementindex !== -1) {
      const newLocal = [...local];
      newLocal[elementindex].count++;
      setLocal(newLocal);
    } else {
      setLocal([...local, { ...newitem, count: 1 }]);
    }
    setToggle(!toggle);
  }

  function remove(newitem) {
    setLocal(local.filter((x) => x.id !== newitem));
  }

  function setCountValue(isAdd, newitem) {
    let elementindex = local.findIndex((x) => x.id === newitem.id);
    const newLocal = [...local];
    if (isAdd) {
      newLocal[elementindex].count++;
      setLocal(newLocal);
    } else {
      if (newLocal[elementindex].count > 1) {
        newLocal[elementindex].count--;
        setLocal(newLocal);
      }
    }
  }

  return (
    <div>
      <h1> Wish List</h1>
      <div className="wishList">
        {local.map((item) => {
          return (
            <ul key={item.id} className="card">
              <li>
                <img src={item.image} alt="" />
                <i onClick={() => remove(item.id)} class="fa-solid fa-x"></i>
              </li>
              <li>{item.title}</li>
              <li>{item.price}$</li>
              <li>{item.description.slice(1, 50)}...</li>
              <li>
                Eded:{item.count}
                <button
                  className="plas"
                  onClick={() => setCountValue(true, item)}
                >
                  +
                </button>
                <button
                  className="minus"
                  onClick={() => setCountValue(false, item)}
                >
                  -
                </button>
              </li>
              <li className="categ">{item.category}</li>
            </ul>
          );
        })}
      </div>

      <div className="products">
        {isloading ? (
          <h1>Loading...</h1>
        ) : (
          api.map((x) => {
            return (
              <ul key={x.id} className="card">
                <li>
                  <img src={x.image} alt="" />
                  <i
                    onClick={() => add(x)}
                    class="fa-solid fa-heart" /*style={{ color: toggle ? 'red' : null }}*/
                  ></i>
                </li>
                <li>{x.title}</li>
                <li>{x.price}$</li>
                <li>{x.description.slice(1, 50)}...</li>
                <li className="categ">{x.category}</li>
              </ul>
            );
          })
        )}
      </div>
    </div>
  );
};

export default WishList;
