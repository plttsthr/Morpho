import React, { useState } from 'react';
import ExpensePieChart from './ExpensePieChart';
import { CategoryScale, Chart } from "chart.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus} from '@fortawesome/free-solid-svg-icons';
import { faReceipt, faCar, faMedkit, faUtensils, faFilm, faCreditCard, faPiggyBank, faUmbrellaBeach, faGraduationCap, faTshirt } from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar';


function Budgeting() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [incomeName, setIncomeName] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("food");
  const [totalexpenses, setExpenses] = useState([]); 
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const [chartData, setChartData] = useState({
    labels: ['Income', 'Expense'],
    datasets: [
      {
        label: 'Income vs Expense',
        backgroundColor: ['rgba(75, 192, 75, 0.6)', 'rgba(192, 75, 75, 0.6)'],
        data: [income, expense],
      },
    ],
  });

  const calculateTotalExpenses = () => {
    return totalexpenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const expenses = [
    { category: 'Food', amount: 10 },
    { category: 'Entertainment', amount: 10 },
    { category: 'Credit Card', amount: 10 },
    { category: 'Bills', amount: 10 },
    { category: 'Transportation', amount: 10 },
    { category: 'Healthcare', amount: 10 },
    { category: 'Savings', amount: 10 },
    { category: 'Travel', amount: 10 },
    { category: 'Education', amount: 10 },
    { category: 'Clothing', amount: 10 },
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddIncome = () => {
    setIncome(income + income);
    updateChartData(income + income, expense);
  };


  const handleAddExpense = (category, amount) => {
    setExpenses([...totalexpenses, { category, amount }]);
  };

  const updateChartData = (newIncome, newExpense) => {
    setChartData({
      ...chartData,
      datasets: [
        {
          ...chartData.datasets[0],
          data: [newIncome, newExpense],
        },
      ],
    });
  };

  return (
    <div className="budget-container">
        <div className="budget-actions">
          <div className="income">
          {/* <div className="horizontal-rule"></div> */}
            <div className="budget-header">
              <h5>Add Income</h5>
              <button className='Add-Button' onClick={handleAddIncome}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>

            <div className="input-group">
              <label>Name:</label>
              <input
                type='text'
                value={incomeName}
                placeholder="Enter your income name"
                onChange={(e) => setIncome(Number(e.target.value))}
              />
            </div>
            <div className="input-group">
              <label>Amount:</label>
                <input
                    value={income === 0 ? '' : income}
                    placeholder={income === 0 ? 'Enter your amount' : ''}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    />
            </div>
            <div className="input-group">
              <label>Date:</label>
              <input
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={handleDateChange}
              />
            </div>
            
          </div>

          <div className="expense">

            {/* <div className="horizontal-rule"></div> */}

            <div className="budget-header">
              <h5>Add Expense</h5>
              <button className='Add-Button' onClick={handleAddIncome}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <div className="input-group">
              <label>Description:</label>
              <input
                type="text"
                value={expenseName}
                placeholder="Enter your expense description"
                onChange={(e) => setExpense(Number(e.target.value))}
              />
            </div>
            <div className="input-group">
              <label>Amount:</label>
              <input
                value={expense === 0 ? '' : expense}
                placeholder={income === 0 ? 'Enter your amount' : ''}
                onChange={(e) => setExpense(Number(e.target.value))}
              />
            </div>

            <div className="input-group">
              <label>Date:</label>
              <input
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={handleDateChange}
              />
            </div>


            <div className="category-section">
      <label className="category-label">Choose a category:</label>
          <div className="category-buttons">
            <button
              className={`category-button ${selectedCategory === 'food' ? 'selected' : ''}`}
              onClick={() => handleCategorySelect('food')}
            > 
            <FontAwesomeIcon icon={faUtensils} />
            Food
            </button>
            
            <button
              className={`category-button ${selectedCategory === 'bills' ? 'selected' : ''}`}
              onClick={() => handleCategorySelect('bills')}
            >
              <FontAwesomeIcon icon={faReceipt} />
              Bills
            </button>
            <button
              className={`category-button ${selectedCategory === 'car' ? 'selected' : ''}`}
              onClick={() => handleCategorySelect('car')}
            >
              <FontAwesomeIcon icon={faCar} />
              Transportation
            </button>
            <button
              className={`category-button ${selectedCategory === 'healthcare' ? 'selected' : ''}`}
              onClick={() => handleCategorySelect('healthcare')}
            >
              <FontAwesomeIcon icon={faMedkit} />
              Healthcare
            </button>
            <button
              className={`category-button ${selectedCategory === 'entertainment' ? 'selected' : ''}`}
              onClick={() => handleCategorySelect('entertainment')}
            >
              <FontAwesomeIcon icon={faFilm} />
              Entertainment
            </button>
            <button
              className={`category-button ${selectedCategory === 'credit card' ? 'selected' : ''}`}
              onClick={() => handleCategorySelect('credit card')}
            >
              <FontAwesomeIcon icon={faCreditCard} />
              Card
            </button>
            <button
              className={`category-button ${selectedCategory === 'savings' ? 'selected' : ''}`}
              onClick={() => handleCategorySelect('savings')}
            >
              <FontAwesomeIcon icon={faPiggyBank} />
              Savings
            </button>
            <button
              className={`category-button ${selectedCategory === 'travel' ? 'selected' : ''}`}
              onClick={() => handleCategorySelect('travel')}
            >
              <FontAwesomeIcon icon={faUmbrellaBeach} />
              Travel
            </button>
            <button
              className={`category-button ${selectedCategory === 'education' ? 'selected' : ''}`}
              onClick={() => handleCategorySelect('education')}
            >
              <FontAwesomeIcon icon={faGraduationCap} />
              Education
            </button>
            <button
              className={`category-button ${selectedCategory === 'clothing' ? 'selected' : ''}`}
              onClick={() => handleCategorySelect('clothing')}
            >
              <FontAwesomeIcon icon={faTshirt} />
              Clothing
            </button>
          </div>
        </div>
            
          </div>
        </div>

        <div className='budget-chart'>
            <div className="budget-header">
                <h5>My Spendings </h5>
            </div>
            <ExpensePieChart expenses={expenses} />
            <div className='recent-transactions-added'>
                <div className="budget-header">
                    <h5>Recent transactions </h5>
                </div>
            </div>
        </div>

        <div className='budget-calendar'>
            <div className="budget-header">
                <h5>My transactions </h5>
                
            </div>
            <Calendar></Calendar>
            <div className="transactions-list">
            </div>
        </div>
        
    </div>
  );
}


export default Budgeting;
