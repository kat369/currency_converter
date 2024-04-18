"use client";
import React, { useEffect, useState } from "react";
import { items } from "./data";
import axios from "axios";
import { toASCII } from "punycode";

export default function Home() {
  const [data, setData] = useState(items);
  const [currency, setCurrency] = useState({});
  const [to, setTo] = useState("usd");

  useEffect(() => {
    loadCurrency();
  }, []);

  let loadCurrency = async () => {
    try {
      let allCurrency = await axios.get(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json `
      );
      setCurrency(allCurrency.data.usd);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
      <div className="cont">
        <div className="side">
          <h1>Currency Convert</h1>

          <select
            onChange={(e) => {
              setTo(e.target.value.toLowerCase());
            }}
            name="currency_code"
          >
            <option value="USD">USD</option>
            <option value="AUD">AUD</option>
            <option value="BRL">BRL</option>
            <option value="CAD">CAD</option>
            <option value="DKK">DKK</option>
            <option value="EUR">EUR</option>
            <option value="HKD">HKD</option>
            <option value="HUF">HUF</option>
            <option value="INR">INR</option>
            <option value="ILS">ILS</option>
            <option value="JPY">JPY</option>
            <option value="KRW">KRW</option>
            <option value="MYR">MYR</option>
            <option value="MXN">MXN</option>
            <option value="TWD">TWD</option>
            <option value="PHP">PHP</option>
            <option value="PLN">PLN</option>
            <option value="GBP">GBP</option>
            <option value="RUB">RUB</option>
            <option value="SGD">SGD</option>
            <option value="ZAR">ZAR</option>
            <option value="SEK">SEK</option>
            <option value="CHF">CHF</option>
            <option value="NOK">NOK</option>
            <option value="NZD">NZD</option>
            <option value="THB">THB</option>
          </select>
        </div>
        <div className="mid">
          <div className="items-container">
            {data.map((item, idx) => (
              <div key={`items-${idx}`} className="item">
                <p>Name:{item.name}</p>
                <p className="category">Cartogary:{item.category}</p>
                <p className="category">Rating:{item.rating}</p>
              
                <p className="category">
                  Price:{to.toUpperCase()} {Math.floor(item.price * currency[to])}                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
