import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [amount, setAmount] = useState(1);
  const [firstCurr, setFirstCurr] = useState([]);
  const [firstSelect, setFirstSelect] = useState("USD");
  const [secondCurr, setSecondCurr] = useState([]);
  const [secondSelect, setSecondSelect] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    async function fetchCurrencies() {
      try {
        const res = await fetch(`https://api.frankfurter.app/currencies`);
        const data = await res.json();
        setFirstCurr(Object.keys(data));
        setSecondCurr(Object.keys(data));
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    }

    fetchCurrencies();
  }, []);

  const handleConvert = async () => {
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${firstSelect}&to=${secondSelect}`
      );
      const data = await res.json();
      setConvertedAmount(data.rates[secondSelect]);
    } catch (error) {
      console.error("Error converting currencies:", error);
    }
  };

  function handleAmount(e) {
    setConvertedAmount(0);
    setAmount(Number(e.target.value));
  }

  return (
    <main>
      <div className="top">
        <img src="./cc.png" alt="cc" />
        <h1>Currency Converter</h1>
      </div>
      <form>
        <label htmlFor="amount">Amount</label>
        <input type="text" id="amount" value={amount} onChange={handleAmount} />
        <div className="select">
          <select
            value={firstSelect}
            onChange={(e) => setFirstSelect(e.target.value)}
          >
            {firstCurr.map((curr) => (
              <option value={curr} key={curr}>
                {curr}
              </option>
            ))}
          </select>
          <select
            value={secondSelect}
            onChange={(e) => setSecondSelect(e.target.value)}
          >
            {secondCurr.map((curr) => (
              <option value={curr} key={curr}>
                {curr}
              </option>
            ))}
          </select>
        </div>
        <button type="button" onClick={handleConvert}>
          Convert
        </button>
      </form>
      <p>{`${amount} ${firstSelect} = ${convertedAmount} ${secondSelect}`}</p>
    </main>
  );
}

export default App;
