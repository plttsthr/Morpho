import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'

function ExpensePieChart({ expenses }) {
  const data = {
    labels: expenses.map(expense => expense.category),
    datasets: [
      {
        data: expenses.map(expense => expense.amount),
        backgroundColor: [
            '#FF8F8F',
            '#FFA0B3',
            '#FFC175',
            '#FFEE8F',
            '#8FFF8F',
            '#8FFFDF',
            '#6BB2B2',
            '#8F8FFF',
            '#8F74E0',
            '#E08FFF',
            
              
          // Add more colors for additional categories
        ],
      },
    ],
  };

  return (
    <div className="expense-pie-chart">
      <Doughnut data={data} />
    </div>
  );
}

export default ExpensePieChart;
