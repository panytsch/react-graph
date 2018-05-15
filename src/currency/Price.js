import React from "react";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import axios from "axios";

const coins = ["BTC", "ETH"];
const papers = [
  "USD",
  "AUD",
  "BRL",
  "CAD",
  "CHF",
  "CLP",
  "CNY",
  "CZK",
  "DKK",
  "EUR",
  "GBP",
  "HKD",
  "HUF",
  "IDR",
  "ILS",
  "INR",
  "JPY",
  "KRW",
  "MXN",
  "MYR",
  "NOK",
  "NZD",
  "PHP",
  "PKR",
  "PLN",
  "RUB",
  "SEK",
  "SGD",
  "THB",
  "TRY",
  "TWD",
  "ZAR"
];

class Currency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      papers: []
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
        console.log(_this.state.coins);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  getAllPrice(coin = 1, paper) {
    let _this = this;
    axios
      .get(`https://api.coinmarketcap.com/v2/ticker/${coin}/?convert=${paper}`)
      .then(res => {
        _this.setState(
          Object.assign(_this.state, {
            [coin]: res.data.data.quotes[paper].price
          })
        );
      });
  }
  change(paper) {
    let _coins =
      (this.state && this.state.coins.length && this.state.coins) || coins;
    _coins.map(coin => {
      this.getAllPrice(coin.id || 1, paper);
    });
    // this.setState(Object.assign(this.state, this.result));
  }
  render() {
    return (
      <div>
        <h2>Crypto price</h2>
        <Form
          onSubmit={() => {}}
          render={({ handleSubmit, submitting, values }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <Field name="currency">
                  {obj => {
                    let coin =
                      (this.state &&
                        this.state.coins.length &&
                        this.state.coins) ||
                      coins;
                    return (
                      <div>
                        <select {...obj.input}>
                          <option value={papers[0]}>Choose</option>
                          {papers.map((i, key) => (
                            <option value={i} key={key}>
                              {i}
                            </option>
                          ))}
                        </select>
                        <ul>
                          {coin.map((i, k) => {
                            return (
                              <li key={k}>
                                {i.name || i} price: {this.state[i.id] || ""}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  }}
                </Field>
                <OnChange name="currency">
                  {value => {
                    // this.getAllPrice(1, value);
                    this.change(value);
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

export default Currency;
