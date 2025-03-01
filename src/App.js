import { useState, useEffect } from "react"; // Add useEffect import
import "./App.css";
import ReactPlayer from "react-player";

function App() {
  const [rent, setRent] = useState(null);
  const [units, setUnits] = useState(null);
  const [expenses, setExpenses] = useState(null);
  const [expenseType, setExpenseType] = useState("percentage");
  const [noi, setNoi] = useState(null);
  const [propertyValue, setPropertyValue] = useState(null);
  const [capRate, setCapRate] = useState(null);
  const [grossIncome, setGrossIncome] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [numPayments, setNumPayments] = useState(null);
  const [monthlyInterestRate, setMonthlyInterestRate] = useState(null);
  const [monthlyValue, setMonthlyValue] = useState(null);
  const [error, setError] = useState("");
  const [loanError, setLoanError] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showLoanResults, setShowLoanResults] = useState(false);

  const calculateValues = () => {
    setError("");
    let rentValue = rent ? parseFloat(rent) : null;
    let unitsValue = units ? parseFloat(units) : null;
    let expensesValue = expenses ? parseFloat(expenses) : null;
    let noiValue = noi ? parseFloat(noi) : null;
    let propertyValueValue = propertyValue ? parseFloat(propertyValue) : null;
    let capRateValue = capRate ? parseFloat(capRate) / 100 : null;
    let grossIncomeValue = grossIncome ? parseFloat(grossIncome) : null;

    let givenValues = [rent, units, grossIncome, expenses, noi, propertyValue, capRate].filter(
      (val) => val !== null && val !== ""
    ).length;

    if (givenValues < 2) {
      setError("Please provide at least 2 values to start calculations.");
      return;
    }

    let changed;
    do {
      changed = false;

      if (rentValue !== null && unitsValue !== null) {
        const newGrossIncome = rentValue * unitsValue * 12;
        if (!isNaN(newGrossIncome) && isFinite(newGrossIncome) && newGrossIncome !== grossIncomeValue) {
          grossIncomeValue = newGrossIncome;
          changed = true;
        }
      }

      if (grossIncomeValue !== null && expensesValue !== null) {
        const newNoi = expenseType === "percentage" 
          ? grossIncomeValue * (1 - expensesValue / 100)
          : grossIncomeValue - expensesValue;
        if (!isNaN(newNoi) && isFinite(newNoi) && newNoi !== noiValue) {
          noiValue = newNoi;
          changed = true;
        }
      }

      if (capRateValue !== null && propertyValueValue !== null) {
        const newNoi = capRateValue * propertyValueValue;
        if (!isNaN(newNoi) && isFinite(newNoi) && newNoi !== noiValue) {
          noiValue = newNoi;
          changed = true;
        }
      }

      if (noiValue !== null && capRateValue !== null && capRateValue !== 0) {
        const newPropertyValue = noiValue / capRateValue;
        if (!isNaN(newPropertyValue) && isFinite(newPropertyValue) && newPropertyValue !== propertyValueValue) {
          propertyValueValue = newPropertyValue;
          changed = true;
        }
      }

      if (noiValue !== null && propertyValueValue !== null && propertyValueValue !== 0) {
        const newCapRate = noiValue / propertyValueValue;
        if (!isNaN(newCapRate) && isFinite(newCapRate) && newCapRate !== capRateValue) {
          capRateValue = newCapRate;
          changed = true;
        }
      }

      if (grossIncomeValue !== null && unitsValue !== null && unitsValue !== 0) {
        const newRent = grossIncomeValue / (unitsValue * 12);
        if (!isNaN(newRent) && isFinite(newRent) && newRent !== rentValue) {
          rentValue = newRent;
          changed = true;
        }
      }

      if (grossIncomeValue !== null && rentValue !== null && rentValue !== 0) {
        const newUnits = grossIncomeValue / (rentValue * 12);
        if (!isNaN(newUnits) && isFinite(newUnits) && newUnits !== unitsValue) {
          unitsValue = newUnits;
          changed = true;
        }
      }

      if (grossIncomeValue !== null && noiValue !== null) {
        let newExpenses;
        if (expenseType === "percentage") {
          newExpenses = ((grossIncomeValue - noiValue) / grossIncomeValue) * 100;
        } else {
          newExpenses = grossIncomeValue - noiValue;
        }
        if (!isNaN(newExpenses) && isFinite(newExpenses) && newExpenses !== expensesValue) {
          expensesValue = newExpenses;
          changed = true;
        }
      }
    } while (changed);

    if (rentValue !== null) setRent(rentValue.toFixed(2));
    if (unitsValue !== null) setUnits(unitsValue.toFixed(0));
    if (grossIncomeValue !== null) setGrossIncome(grossIncomeValue.toFixed(2));
    if (expensesValue !== null) setExpenses(expensesValue.toFixed(2));
    if (noiValue !== null) setNoi(noiValue.toFixed(2));
    if (propertyValueValue !== null) setPropertyValue(propertyValueValue.toFixed(2));
    if (capRateValue !== null) setCapRate((capRateValue * 100).toFixed(2));

    setShowResults(true);
  };

  const calculateLoanValues = () => {
    setLoanError("");
    let principalValue = principal ? parseFloat(principal) : null;
    let numPaymentsValue = numPayments ? parseFloat(numPayments) : null;
    let monthlyInterestRateValue = monthlyInterestRate ? parseFloat(monthlyInterestRate) / 100 / 12 : null;

    let givenValues = [principal, numPayments, monthlyInterestRate].filter(
      (val) => val !== null && val !== ""
    ).length;

    if (givenValues < 3) {
      setLoanError("Please provide Principal, Number of Payments, and Monthly Interest Rate to calculate the monthly payment.");
      setMonthlyValue(null); // Clear Debt Service if inputs are incomplete
      setShowLoanResults(false);
      return;
    }

    if (principalValue !== null && monthlyInterestRateValue !== null && numPaymentsValue !== null) {
      const rateFactor = Math.pow(1 + monthlyInterestRateValue, numPaymentsValue);
      const newMonthlyValue = principalValue * (monthlyInterestRateValue * rateFactor) / (rateFactor - 1);
      if (!isNaN(newMonthlyValue) && isFinite(newMonthlyValue)) {
        setMonthlyValue(newMonthlyValue.toFixed(2));
        setShowLoanResults(true);
      } else {
        setLoanError("Calculation resulted in an invalid value. Please check your inputs.");
        setMonthlyValue(null);
        setShowLoanResults(false);
      }
    }
  };

  // useEffect to auto-calculate Debt Service when inputs change
  useEffect(() => {
    calculateLoanValues();
  }, [principal, numPayments, monthlyInterestRate]);

  return (
    <div className="wrapper">
      <div className="background-section">
        <div className="container">
          <h1>Multifamily Property Value Calculator</h1>
          <div className="calculator">
            <h2>Enter known values:</h2>
            {error && <p className="error">{error}</p>}
            <div className="input-group">
              <label>Rent ($ per unit) & Units (#):</label>
              <div className="rent-units-row">
                <input
                  type="number"
                  value={rent || ""}
                  onChange={(e) => setRent(e.target.value || null)}
                  placeholder="Enter Rent"
                />
                <span className="x">x</span>
                <input
                  type="number"
                  value={units || ""}
                  onChange={(e) => setUnits(e.target.value || null)}
                  placeholder="Enter Units"
                />
                <span className="multiply">x12</span>
              </div>
            </div>
            <div className="input-group">
              <label>Gross Income ($):</label>
              <input
                type="number"
                value={grossIncome || ""}
                onChange={(e) => setGrossIncome(e.target.value || null)}
                placeholder="Enter Gross Income"
              />
            </div>
            <div className="input-group">
              <label>Expenses:</label>
              <div className="expense-input">
                <input
                  type="number"
                  value={expenses || ""}
                  onChange={(e) => setExpenses(e.target.value || null)}
                  placeholder={`Enter ${expenseType === "percentage" ? "Expense %" : "Exact $"}`}
                />
                <select
                  onChange={(e) => setExpenseType(e.target.value)}
                  value={expenseType}
                >
                  <option value="percentage">%</option>
                  <option value="exact">$</option>
                </select>
              </div>
            </div>
            <div className="input-group">
              <label>Net Operating Income (NOI) ($):</label>
              <input
                type="number"
                value={noi || ""}
                onChange={(e) => setNoi(e.target.value || null)}
                placeholder="Enter NOI"
              />
            </div>
            <div className="input-group">
              <label>Cap Rate (%):</label>
              <input
                type="number"
                value={capRate || ""}
                onChange={(e) => setCapRate(e.target.value || null)}
                placeholder="Enter Cap Rate"
              />
            </div>
            <div className="input-group">
              <label>Property Value ($):</label>
              <input
                type="number"
                value={propertyValue || ""}
                onChange={(e) => setPropertyValue(e.target.value || null)}
                placeholder="Enter Property Value"
              />
            </div>
            <button onClick={calculateValues}>Calculate</button>
            {showResults && (
              <div className="results">
                <h3>Calculated Results:</h3>
                <p>Rent: ${rent}</p>
                <p>Units: {units}</p>
                <p>Gross Income: ${grossIncome}</p>
                <p>NOI: ${noi}</p>
                <p>Property Value: ${propertyValue}</p>
                <p>Cap Rate: {capRate}%</p>
              </div>
            )}
          </div>
        </div>
        <div className="calculator2">
          <h2>Loan Calculator</h2>
          <div className="calculator">
            <h2>Enter loan details:</h2>
            {loanError && <p className="error">{loanError}</p>}
            <div className="loan-input-row">
              <div className="input-group">
                <label>Principal ($)</label>
                <input
                  type="number"
                  value={principal || ""}
                  onChange={(e) => setPrincipal(e.target.value || null)}
                  placeholder="Principal"
                />
              </div>
              <div className="input-group">
                <label>Payments (#)</label>
                <input
                  type="number"
                  value={numPayments || ""}
                  onChange={(e) => setNumPayments(e.target.value || null)}
                  placeholder="Payments"
                />
              </div>
              <div className="input-group">
                <label>Rate (%)</label>
                <input
                  type="number"
                  value={monthlyInterestRate || ""}
                  onChange={(e) => setMonthlyInterestRate(e.target.value || null)}
                  placeholder="Rate"
                />
              </div>
            </div>
            <div className="input-group">
              <label>Net Operating Income (NOI) ($):</label>
              <input
                type="number"
                value={noi || ""}
                onChange={(e) => setNoi(e.target.value || null)}
                placeholder="Enter NOI"
              />
            </div>
            <div className="input-group">
              <label>Debt Service ($):</label>
              <input
                type="number"
                value={monthlyValue || ""}
                onChange={(e) => setMonthlyValue(e.target.value || null)}
                placeholder="Enter Debt Service"
              />
            </div>
            {/* <button onClick={calculateLoanValues}>Calculate</button> */} {/* Optional: Keep if you want manual trigger */}
            {showLoanResults && (
              <div className="results">
                <h3>Calculated Loan Results:</h3>
                <p>Monthly Debt Service: ${monthlyValue}</p>
                {noi && monthlyValue && (
                  <p>Debt Service Coverage Ratio (DSCR): {(noi / (monthlyValue * 12)).toFixed(2)}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="videoDescription">
        <div className="video">
          <ReactPlayer
            url="https://www.youtube.com/shorts/I5fQcEoC6k4"
            controls
            width="100%"
            height="100%"
            className="react-player"
          />
        </div>
        <div className="description">
          <h1>
            Welcome to multifamilycalc.com – the simplest way to analyze multifamily real estate deals with ease. Our powerful yet user-friendly calculator helps you determine Net Operating Income (NOI), Cap Rates, and Property Values in just a few clicks.
          </h1>
          <h1>
            Whether you're a seasoned investor, realtor, or just getting started, EasyCap Calculator takes the guesswork out of real estate math. No more complex formulas or spreadsheets—just enter your numbers and get instant, accurate results.
          </h1>
          <h1>
            Make smarter multifamily investment decisions—faster. Try it now!
          </h1>
        </div>
      </div>
    </div>
  );
}

export default App;