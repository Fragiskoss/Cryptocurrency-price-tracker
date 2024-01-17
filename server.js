const express = require("express");
const app = express();
const request = require("request");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
app.use(cors());

app.get("/:crypto", (req, res) => {
  const crypto = req.params.crypto;
  const url2 = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${crypto}`;

  request.get(
    {
      url: url2,
      json: true,
      headers: {
        "X-CMC_PRO_API_KEY": process.env.API_KEY,
      },
    },
    (error, response, data) => {
      if (error) {
        return res.send({
          error: error,
        });
      }

      const cryptoData = data.data[crypto].quote.USD;

      res.send({
        price: cryptoData.price.toFixed(2), // Format the price to two decimal places
        marketCap: cryptoData.market_cap.toFixed(2),
        volume: cryptoData.volume_24h.toFixed(2),
        change24h: cryptoData.percent_change_24h.toFixed(2),
      });
    }
  );
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
