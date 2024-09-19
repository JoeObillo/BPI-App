import React, { useState, useEffect } from "react";
import axios from "axios";

function CryptoData() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null); // Add state for errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coindesk.com/v1/bpi/currentprice.json"
        );
        setData(response.data);
      } catch (error) {
        setError(error);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Display data or error message conditionally
  return (
    <div>
      {error ? (
        <p>Error fetching data: {error.message}</p>
      ) : data ? (
        <div>
          <p>Last Updated: {data.time.updated}</p>
          <table class="bitcoin-table">
            <thead>
              <tr>
                <th class="category">CURRENCY CODE</th>
                <th class="category">SYMBOL</th>
                <th class="category">RATE</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.bpi).map(([currencyCode, currencyData]) => (
                <tr key={currencyCode}>
                  <td class="category">{currencyData.code}</td>
                  <td class="category">{currencyData.symbol}</td>
                  <td class="category">{currencyData.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CryptoData;
