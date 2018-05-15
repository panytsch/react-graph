import React from "react";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import axios from "axios";

const coins = ["BTC", "ETH"];

class Currency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: []
    };
  }
  componentWillMount() {
    this.fillArray();
  }
  fillArray() {
    let _this = this;
    axios
      .get("https://api.coinmarketcap.com/v2/ticker/?limit=10")
      .then(function(res) {
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
  change(e) {}
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
                      <select {...obj.input}>
                        {coin.map((i, key) => (
                          <option value={i.id || i} key={key}>
                            {i.name || i}
                          </option>
                        ))}
                      </select>
                    );
                  }}
                </Field>
                <OnChange name="currency">
                  {value => {
                    this.change(value);
                    console.log(this);
                  }}
                </OnChange>
              </div>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </form>
          )}
        />
      </div>
    );
  }
}

export default Currency;
