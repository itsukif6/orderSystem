import React from "react";
import "./Menu.css";
import donutsImg from "./donuts.png";
import chickenImg from "./chicken.webp";
import pizzaImg from "./pizza.avif";
import icecreamImg from "./icecream.jpg";
import cokeImg from "./coke.webp";
import steakImg from "./steak.png";
import friedRiceCakeImg from "./friedRiceCake.jpg";
import lobsterImg from "./lobster.jpeg";
import greenTeaImg from "./greenTea.jpg";
import bubbleTeaImg from "./bubbleTea.png";
import blackTeaImg from "./blackTea.jpg";
import honeyImg from "./honey.png";
import marshmallowImg from "./marshmallow.jpg";
import chocolateImg from "./chocolate.jpg";
import specialImg from "./special.png";
import { useRef } from "react";

let headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

function Welcome() {
  const ref = useRef({});
  const pushRef = (el) => {
    ref.current[el.name] = el;
  };

  const onFinish = () => {
    console.log(ref.current);
    fetch(
      "http://localhost:5000/menu", //api
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(
          Object.keys(ref.current).map((key) => {
            return ref.current[key].value;
          })
        ), // values為要傳送的資料
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json === true) {
          // change port if 3001 or 3000
          window.location.assign("http://localhost:3000/Order");
        } else {
          alert("123.");
        }
      });
  };
  //button minus
  const onMinus = (e) => {
    const { target } = e;
    console.log(target);
    if (target.nextSibling.value > 0) {
      target.nextSibling.value = target.nextSibling.value - 1;
    }
  };

  //button plus
  const onPlus = (e) => {
    const { target } = e;
    console.log(target);
    if (target.previousSibling.value < 100) {
      target.previousSibling.value = parseInt(target.previousSibling.value) + 1;
    }
  };

  return (
    <div id="full-menu-component">
      <div id="menu-component">
        <div>
          <div className="broadImg">
            <h2 className="food-text">主食:</h2>
            <div className="img-text">
              <img src={chickenImg} alt="chickenImg" className="foodImg" />
              <div className="order-num">
                <button className="plus-minus-button" onClick={onMinus}>
                  -
                </button>
                <input
                  ref={pushRef}
                  type="text"
                  id="chicken-order"
                  name="chicken-order"
                  required
                  minLength="1"
                  maxLength="3"
                  size="1"
                  defaultValue="0"
                />
                <button className="plus-minus-button" onClick={onPlus}>
                  +
                </button>
              </div>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="img-text">
              <img src={pizzaImg} alt="pizzaImg" className="foodImg" />
              <div className="order-num">
                <button className="plus-minus-button" onClick={onMinus}>
                  -
                </button>
                <input
                  ref={pushRef}
                  type="text"
                  id="pizza-order"
                  name="pizza-order"
                  required
                  minLength="1"
                  maxLength="3"
                  size="1"
                  defaultValue="0"
                />
                <button className="plus-minus-button" onClick={onPlus}>
                  +
                </button>
              </div>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="img-text">
              <img src={steakImg} alt="steakImg" className="foodImg" />
              <div className="order-num">
                <button className="plus-minus-button" onClick={onMinus}>
                  -
                </button>
                <input
                  ref={pushRef}
                  type="text"
                  id="steak-order"
                  name="steak-order"
                  required
                  minLength="1"
                  maxLength="3"
                  size="1"
                  defaultValue="0"
                />
                <button className="plus-minus-button" onClick={onPlus}>
                  +
                </button>
              </div>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="img-text">
              <img
                src={friedRiceCakeImg}
                alt="friedRiceCakeImg"
                className="foodImg"
              />
              <div className="order-num">
                <button className="plus-minus-button" onClick={onMinus}>
                  -
                </button>
                <input
                  ref={pushRef}
                  type="text"
                  id="friedRiceCake-order"
                  name="friedRiceCake-order"
                  required
                  minLength="1"
                  maxLength="3"
                  size="1"
                  defaultValue="0"
                />
                <button className="plus-minus-button" onClick={onPlus}>
                  +
                </button>
              </div>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="img-text">
              <img src={lobsterImg} alt="lobsterImg" className="foodImg" />
              <div className="order-num">
                <button className="plus-minus-button" onClick={onMinus}>
                  -
                </button>
                <input
                  ref={pushRef}
                  type="text"
                  id="lobster-order"
                  name="lobster-order"
                  required
                  minLength="1"
                  maxLength="3"
                  size="1"
                  defaultValue="0"
                />
                <button className="plus-minus-button" onClick={onPlus}>
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="broadImg">
            <h2 className="food-text">飲料:</h2>
            <div className="img-text">
              <img src={cokeImg} alt="cokeImg" className="foodImg" />
              <div className="order-num">
                <button className="plus-minus-button" onClick={onMinus}>
                  -
                </button>
                <input
                  ref={pushRef}
                  type="text"
                  id="coke-order"
                  name="coke-order"
                  required
                  minLength="1"
                  maxLength="3"
                  size="1"
                  defaultValue="0"
                />
                <button className="plus-minus-button" onClick={onPlus}>
                  +
                </button>
              </div>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="img-text">
              <img src={greenTeaImg} alt="greenTeaImg" className="foodImg" />
              <div className="order-num">
                <button className="plus-minus-button" onClick={onMinus}>
                  -
                </button>
                <input
                  ref={pushRef}
                  type="text"
                  id="greenTea-order"
                  name="greenTea-order"
                  required
                  minLength="1"
                  maxLength="3"
                  size="1"
                  defaultValue="0"
                />
                <button className="plus-minus-button" onClick={onPlus}>
                  +
                </button>
              </div>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="img-text">
              <img src={bubbleTeaImg} alt="bubbleTeaImg" className="foodImg" />
              <div className="order-num">
                <button className="plus-minus-button" onClick={onMinus}>
                  -
                </button>
                <input
                  ref={pushRef}
                  type="text"
                  id="bubbleTea-order"
                  name="bubbleTea-order"
                  required
                  minLength="1"
                  maxLength="3"
                  size="1"
                  defaultValue="0"
                />
                <button className="plus-minus-button" onClick={onPlus}>
                  +
                </button>
              </div>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="img-text">
              <img src={blackTeaImg} alt="blackTeaImg" className="foodImg" />
              <div className="order-num">
                <button className="plus-minus-button" onClick={onMinus}>
                  -
                </button>
                <input
                  ref={pushRef}
                  type="text"
                  id="blackTea-order"
                  name="blackTea-order"
                  required
                  minLength="1"
                  maxLength="3"
                  size="1"
                  defaultValue="0"
                />
                <button className="plus-minus-button" onClick={onPlus}>
                  +
                </button>
              </div>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="img-text">
              <img src={honeyImg} alt="honeyImg" className="foodImg" />
              <div className="order-num">
                <button className="plus-minus-button" onClick={onMinus}>
                  -
                </button>
                <input
                  ref={pushRef}
                  type="text"
                  id="honey-order"
                  name="honey-order"
                  required
                  minLength="1"
                  maxLength="3"
                  size="1"
                  defaultValue="0"
                />
                <button className="plus-minus-button" onClick={onPlus}>
                  +
                </button>
              </div>
            </div>
          </div>
          <br></br>
          <div className="broadImg">
            <h2 className="food-text">甜點:</h2>
            <div className="img-text">
              <img src={donutsImg} alt="donutsImg" className="foodImg" />
              <div className="order-num">
                <button className="plus-minus-button" onClick={onMinus}>
                  -
                </button>
                <input
                  ref={pushRef}
                  type="text"
                  id="donuts-order"
                  name="donuts-order"
                  required
                  minLength="1"
                  maxLength="3"
                  size="1"
                  defaultValue="0"
                />
                <button className="plus-minus-button" onClick={onPlus}>
                  +
                </button>
              </div>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="img-text">
              <img src={icecreamImg} alt="icecreamImg" className="foodImg" />
              <div className="order-num">
                <button className="plus-minus-button" onClick={onMinus}>
                  -
                </button>
                <input
                  ref={pushRef}
                  type="text"
                  id="icecream-order"
                  name="icecream-order"
                  required
                  minLength="1"
                  maxLength="3"
                  size="1"
                  defaultValue="0"
                />
                <button className="plus-minus-button" onClick={onPlus}>
                  +
                </button>
              </div>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="img-text">
              <img
                src={marshmallowImg}
                alt="marshmallowImg"
                className="foodImg"
              />
              <div className="order-num">
                <button className="plus-minus-button" onClick={onMinus}>
                  -
                </button>
                <input
                  ref={pushRef}
                  type="text"
                  id="marshmallow-order"
                  name="marshmallow-order"
                  required
                  minLength="1"
                  maxLength="3"
                  size="1"
                  defaultValue="0"
                />
                <button className="plus-minus-button" onClick={onPlus}>
                  +
                </button>
              </div>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="img-text">
              <img src={chocolateImg} alt="chocolateImg" className="foodImg" />
              <div className="order-num">
                <button className="plus-minus-button" onClick={onMinus}>
                  -
                </button>
                <input
                  ref={pushRef}
                  type="text"
                  id="chocolate-order"
                  name="chocolate-order"
                  required
                  minLength="1"
                  maxLength="3"
                  size="1"
                  defaultValue="0"
                />
                <button className="plus-minus-button" onClick={onPlus}>
                  +
                </button>
              </div>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="img-text">
              <img src={specialImg} alt="specialImg" className="foodImg" />
              <div className="order-num">
                <button className="plus-minus-button" onClick={onMinus}>
                  -
                </button>
                <input
                  ref={pushRef}
                  type="text"
                  id="special-order"
                  name="special-order"
                  required
                  minLength="1"
                  maxLength="3"
                  size="1"
                  defaultValue="0"
                />
                <button className="plus-minus-button" onClick={onPlus}>
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <button className="submit" onClick={onFinish}>
          submit
        </button>
      </div>
    </div>
  );
}

export default Welcome;
