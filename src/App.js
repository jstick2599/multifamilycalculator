import { useState } from "react";
import "./App.css";

function App() {
  const [rent, setRent] = useState(null);
  const [units, setUnits] = useState(null);
  const [expenses, setExpenses] = useState(null);
  const [expenseType, setExpenseType] = useState("percentage");
  const [noi, setNoi] = useState(null);
  const [propertyValue, setPropertyValue] = useState(null);
  const [capRate, setCapRate] = useState(null);
  const [grossIncome, setGrossIncome] = useState(null);
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);

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

      // Calculate gross income from rent and units
      if (rentValue !== null && unitsValue !== null) {
        const newGrossIncome = rentValue * unitsValue * 12;
        if (!isNaN(newGrossIncome) && isFinite(newGrossIncome) && newGrossIncome !== grossIncomeValue) {
          grossIncomeValue = newGrossIncome;
          changed = true;
        }
      }

      // Calculate NOI from gross income and expenses
      if (grossIncomeValue !== null && expensesValue !== null) {
        const newNoi = expenseType === "percentage" 
          ? grossIncomeValue * (1 - expensesValue / 100)
          : grossIncomeValue - expensesValue;
        if(capRate!=null && propertyValue!=null){
          noiValue=capRate*propertyValue;
          changed=true;
        }
        if (!isNaN(newNoi) && isFinite(newNoi) && newNoi !== noiValue) {
          noiValue = newNoi;
          changed = true;
        }
      }

      // Calculate property value from NOI and cap rate
      if (noiValue !== null && capRateValue !== null && capRateValue !== 0) {
        const newPropertyValue = noiValue / capRateValue;
        if (!isNaN(newPropertyValue) && isFinite(newPropertyValue) && newPropertyValue !== propertyValueValue) {
          propertyValueValue = newPropertyValue;
          changed = true;
        }
      }

      // Calculate cap rate from NOI and property value
      if (noiValue !== null && propertyValueValue !== null && propertyValueValue !== 0) {
        const newCapRate = noiValue / propertyValueValue;
        if (!isNaN(newCapRate) && isFinite(newCapRate) && newCapRate !== capRateValue) {
          capRateValue = newCapRate;
          changed = true;
        }
      }

      // Calculate rent from gross income and units
      if (grossIncomeValue !== null && unitsValue !== null && unitsValue !== 0) {
        const newRent = grossIncomeValue / (unitsValue * 12);
        if (!isNaN(newRent) && isFinite(newRent) && newRent !== rentValue) {
          rentValue = newRent;
          changed = true;
        }
      }

      // Calculate units from gross income and rent
      if (grossIncomeValue !== null && rentValue !== null && rentValue !== 0) {
        const newUnits = grossIncomeValue / (rentValue * 12);
        if (!isNaN(newUnits) && isFinite(newUnits) && newUnits !== unitsValue) {
          unitsValue = newUnits;
          changed = true;
        }
      }

      // Calculate expenses from gross income and NOI
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

    // Update all calculated values
    if (rentValue !== null) setRent(rentValue.toFixed(2));
    if (unitsValue !== null) setUnits(unitsValue.toFixed(0));
    if (grossIncomeValue !== null) setGrossIncome(grossIncomeValue.toFixed(2));
    if (expensesValue !== null) setExpenses(expensesValue.toFixed(2));
    if (noiValue !== null) setNoi(noiValue.toFixed(2));
    if (propertyValueValue !== null) setPropertyValue(propertyValueValue.toFixed(2));
    if (capRateValue !== null) setCapRate((capRateValue * 100).toFixed(2));

    setShowResults(true);
  };

  return (
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
  );
}

export default App;
