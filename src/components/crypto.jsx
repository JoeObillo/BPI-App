import React, { useState, useEffect } from "react"; // useState stores data | useEffect fetches data
import axios from "axios"; // for https requests aka brunging data from the api

function CryptoData() {
  const [data, setData] = useState(null); // prepares data
  const [error, setError] = useState(null); // prepares errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coindesk.com/v1/bpi/currentprice.json" //getting the data from api
        );
        setData(response.data); //data is returned
      } catch (error) {
        setError(error);
        console.error("Error fetching data:", error); //error is returned
      }
    };

    fetchData();
  }, []);

  // returns the data
  return (
    <div className="whole">
      <div className="logo"></div>
      <div className="wave"> </div>
      <div className="wave"> </div>
      <div className="wave"> </div>
      {error ? ( //checks if error variable is true
        <p>Error fetching data: {error.message}</p>
      ) : data ? ( //checks if data is true
        <div>
          <div className="header">
            <h1 className="logo"> BITCOIN </h1>
            <p className="time">
              {" "}
              <b>{data.time.updated}</b>
            </p>
          </div>
          <table class="bitcoin-table">
            <thead>
              <tr>
                <th class="category">CURRENCY CODE</th>
                <th class="category">RATE</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.bpi).map(([currencyCode, currencyData]) => (
                <tr key={currencyCode}>
                  <td class="category">{currencyData.code}</td>
                  <td class="category">{currencyData.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="loading">...</div>
      )}
    </div>
  );
}

export default CryptoData;
