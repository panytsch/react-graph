import React from "react";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import axios from "axios";
import papers from "../papers";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: null,
      price: null,
      paper: "USD",
      count: null,
      coin: null,
      coinId: null
    };
  }
  componentWillMount() {
    this.fillArray();
  }
  fillArray() {
    let _this = this;
    axios
      .get("https://api.coinmarketcap.com/v2/ticker/?limit=5")
      .then(res => {
        let obj = res.data.data;
        let arr = [];
        for (let k in obj) {
          arr.push(obj[k]);
        }
        _this.setState(Object.assign(_this.state, { coins: arr }));
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  submit() {
    let s = this.state;
    if (!s.paper || !s.coinId || !s.count) {
      return;
    } else {
      let _this = this;
      axios
        .get(
          `https://api.coinmarketcap.com/v2/ticker/${s.coinId}/?convert=${
            s.paper
          }`
        )
        .then(res => {
          let cost = res.data.data.quotes[s.paper].price * s.count;
          this.setState(Object.assign(this.state, { price: cost }));
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
  render() {
    return (
      <div>
        <Form
          onSubmit={this.submit.bind(this)}
          render={({ handleSubmit, submitting, values }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <Field name="count" type="number">
                  {obj => {
                    return <input {...obj.input} type={obj.type} />;
                  }}
                </Field>
                <OnChange name="count">
                  {value => {
                    this.setState(Object.assign(this.state, { count: value }));
                  }}
                </OnChange>
              </div>
              <div>
                <Field name="coinName">
                  {obj => {
                    return (
                      <select {...obj.input}>
                        {this.state &&
                          this.state.coins &&
                          this.state.coins.map(i => {
                            return (
                              <option key={i.id} value={i.id}>
                                {i.name}
                              </option>
                            );
                          })}
                      </select>
                    );
                  }}
                </Field>
                <div>
                  <p>{(this.state && this.state.coin) || "---"}</p>
                  <p>{(this.state && this.state.count) || "---"}</p>
                </div>
                <OnChange name="coinName">
                  {value => {
                    let coin;
                    this.state.coins.map(i => {
                      if (i.id == value) {
                        coin = i.name;
                      }
                    });
                    this.setState(
                      Object.assign(this.state, { coin: coin, coinId: value })
                    );
                  }}
                </OnChange>
              </div>
              <div>
                <button type="submit">GO</button>
              </div>
              <div>
                <Field name="paperName">
                  {obj => {
                    return (
                      <select {...obj.input}>
                        {papers.map(i => {
                          return (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          );
                        })}
                      </select>
                    );
                  }}
                </Field>
                <div>
                  <p>{(this.state && this.state.paper) || "---"}</p>
                  <p>{(this.state && this.state.price) || "---"}</p>
                </div>
                <OnChange name="paperName">
                  {value => {
                    this.setState(Object.assign(this.state, { paper: value }));
                  }}
                </OnChange>
              </div>
            </form>
          )}
        />
      </div>
    );
  }
}

export default Calculator;
