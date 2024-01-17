function populateDropdown() {
  fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1"
  )
    .then((response) => response.json())
    .then((data) => {
      const selectElement = document.getElementById("cryptoSymbol");
      data.forEach((coin) => {
        let option = document.createElement("option");
        option.value = coin.symbol.toUpperCase();
        option.text = `${coin.name} (${coin.symbol.toUpperCase()})`;
        selectElement.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching top 100 cryptocurrencies:", error);
    });
}

// Call the function to populate the dropdown when the page loads
document.addEventListener("DOMContentLoaded", populateDropdown);

document.getElementById("cryptoSymbol").addEventListener("change", function () {
  getCryptoPrice(); // Call the function when a new option is selected
});

document
  .getElementById("cryptoForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    getCryptoPrice();
  });

function getCryptoPrice() {
  var cryptoSymbol = document.getElementById("cryptoSymbol").value;
  if (!cryptoSymbol) {
    document.getElementById("error").innerText =
      "Please select a cryptocurrency";
    return; // Exit the function if no cryptocurrency is selected
  }

  fetch("http://localhost:3000/" + cryptoSymbol)
    .then((response) => response.json())
    .then((data) => {
      // Assuming 'data' contains price, marketCap, volume, and change24h
      document.getElementById("price").innerText = data.price
        ? data.price + " USD"
        : "N/A";
      document.getElementById("marketCap").innerText = data.marketCap
        ? data.marketCap + " USD"
        : "N/A";
      document.getElementById("volume").innerText = data.volume
        ? data.volume + " USD"
        : "N/A";
      document.getElementById("change24h").innerText = data.change24h
        ? data.change24h + "%"
        : "N/A";
      document.getElementById("error").innerText = ""; // Clear any previous error message
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("error").innerText =
        "Failed to fetch data. Please try again.";
    });
}
