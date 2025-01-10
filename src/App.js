import React, { useState } from "react";
import Papa from "papaparse";
import "./App.css";

const App = () => {
  const [cardData, setCardData] = useState([]);
  const [selectedCard, setSelectedCard] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(true);

  const csvFiles = [
    "Axis Bank Buzz Credit Card",
    "Axis Bank Magnus Credit Card",
    "Axis Bank Miles and More Credit Card",
    "Axis Bank MY Choice Credit Card",
    "Axis Bank MY Wings Credit Card",
    "Axis Bank Privilege Credit Card",
    "Axis Bank Titanium Smart Traveler Credit Card",
    "Bank of Baroda Easy Credit Card",
    "Bank of Baroda Eterna Credit Card",
    "Bank of Baroda Prime Credit Card",
    "Bank of Baroda Select Credit Card",
    "Bank of India Platinum International Credit Card",
    "BOI India Credit Card",
    "CMA One Credit Card",
    "EXCLUSIVE Credit Card for ICAI Members",
    "Flipkart Axis Bank Credit Card",
    "ICSI Diamond Credit Card",
    "Celesta Credit card",
    "Central Bank of India Titanium Credit Card",
    "Central Bank of India World Credit Card",
    "HDFC Bank Infinia Credit Card",
    "HSBC Premier Mastercard Credit Card",
    "IDBI Bank Euphoria World Credit Card",
    "Imperio Credit CardIndian",
    "Kotak Mahindra Bank Solaris Platinum Credit Card",
    "Mastercard Gold Credit Card",
    "Mastercard Gold Secured Credit Card",
    "Mastercard World Credit Card",
    "Myntra Kotak Mastercard Credit Card",
    "RBL Bank Blockbuster Credit Card",
    "RBL Bank Fun+ Credit Card",
    "RBL Bank Mocash Credit Card",
    "RBL Bank Shoprite Credit Card",
    "Signet Credit Card",
    "Standard Chartered Bank Emirates World credit card",
    "Standard Chartered Bank Super Value Titanium credit card",
    "Swiggy HDFC Bank Credit Card",
    "YES BANK ACE Credit Card",
    "YES BANK RESERVE Credit Card",
    "YES BANK SELECT Credit Card",
    "YES First Business Credit Card",
    "YES FIRST Preferred Credit Card",
    "YES Prosperity Business Credit Card",
    "YES Prosperity Cashback Credit Card",
    "YES Prosperity Cashback Plus Credit Card",
    "YES Prosperity Rewards Credit Card",
    "6E Rewards XL-IndiGo HDFC Bank Credit Card",
    "6E Rewards-IndiGo HDFC Bank Credit Card",
    "Business Moneyback Credit Card",
    "Business Regalia Credit Card",
    "HDFC Millennia Credit Card",
    "Maruti Suzuki NEXA HDFC Bank AllMiles Credit Card",
    "ICICI Bank Coral Contactless Credit Card",
    "ICICI Bank NRI Coral Credit Card",
    "ICICI Bank Platinum Chip Credit Card",
    "ICICI Bank Rubyx Credit Card",
    "ICICI Bank Sapphiro Credit Card",
    "ICICI Bank Titanium Credit Card",
    "ICICI Bank Unifare Credit Card",
    "ICICI Bank Unifare Mumbai Metro Credit Card",
    "FIRST SWYP Credit Card",
    "Mayura Mastercard Credit Card",
    "MasterCard FIRST Classic Credit Card",
    "MasterCard FIRST Select Credit Card",
    "MasterCard FIRST Millennia Credit Card",
    "Club Vistara IDFC FIRST Credit Card",
    "LIC Classic IDFC FIRST Credit Card",
    "LIC Select IDFC FIRST Credit Card",
    "Indusind Bank Crest Credit Card",
    "Indusind Bank Pinnacle Credit Card",
    "IndusInd Bank Pioneer Heritage Credit Card",
    "IndusInd Bank Pioneer Legacy Credit Card",
    "Platinum Aura Edge Credit Card",
    "Platinum Credit Card",
  ];

  const handleCardChange = async (cardName) => {
    setSelectedCard(cardName);
    setSearchInput(cardName);
    setShowDropdown(false); // Hide dropdown on card selection
    setCardData([]);

    if (cardName) {
      const data = await fetchCSVData(cardName);
      setCardData(data);
    }
  };

  const fetchCSVData = async (cardName) => {
    return new Promise((resolve, reject) => {
      Papa.parse(`/data/${cardName}.csv`, {
        download: true,
        header: true,
        complete: (results) => {
          // Filter the data to include only offers with Country as "India"
          const filteredData = results.data.filter(
            (item) => item.Country === "India"
          );
          resolve(filteredData);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  };

  const handleSearchChange = (event) => {
    const input = event.target.value;
    setSearchInput(input);
    setShowDropdown(true); // Show dropdown when typing in search input

    if (!input) {
      // Clear offers when input is cleared
      setCardData([]);
      setSelectedCard("");
    }
  };

  const filteredCards = csvFiles.filter((card) =>
    card.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Credit Card Offers</h1>

      <div className="dropdown">
        <input
          id="cardSearch"
          type="text"
          value={searchInput}
          onChange={handleSearchChange}
          placeholder="Enter credit card name"
        />
        {showDropdown && searchInput && (
          <div className="search-dropdown">
            {filteredCards.map((card, index) => (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => handleCardChange(card)}
              >
                {card}
              </div>
            ))}
          </div>
        )}
      </div>

      <div id="cardInfoContainer" className="card-grid">
        {searchInput && selectedCard && cardData.length > 0 ? (
          cardData.map((item, index) => (
            <div key={index} className="card">
              <img src={item.Image} alt={item.Title} />
              <div className="card-info">
                <h3>{item.Title}</h3>
                <p>
                  <strong>Country:</strong> {item.Country}
                </p>
                <p>
                  <strong>Offers:</strong> {item.Offers}
                </p>
              </div>
              <a
                href={item.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="learn-more"
              >
                Learn More
              </a>
            </div>
          ))
        ) : searchInput && selectedCard ? (
          <p className="alt">No offers found for the selected card.</p>
        ) : (
          searchInput && (
            <p className="alt">
              Please select a valid credit card from the list.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default App;
