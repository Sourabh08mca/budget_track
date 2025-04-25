import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const TransactionList = () => {
  const [budgets, setBudgets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001')
      .then(result => setBudgets(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete= (id) => {
    axios.delete('http://localhost:3001/deleteBudget/'+id)
    .then(res => {console.log(res)
        window.location.reload();
    })
    .catch(errr => console.log(errr))
  }

  return (
    <div>
      <div>
        <Link className='flex justify-center mt-6 text-blue-600 hover:underline' to='/form'>Add New</Link>
      </div>

      <div className="max-w-4xl mx-auto mt-12 grid gap-4 grid-cols-1 md:grid-cols-2">
        {budgets.map((budget, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-5 border-l-4"
            style={{ borderColor: budget.type === 'Expense' ? '#f87171' : '#34d399' }}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Category: {budget.category}</h3>
              <span className={`text-sm font-medium ${budget.type === 'Expense' ? 'text-red-500' : 'text-green-500'}`}>
                {budget.type}
              </span>
            </div>
            <p className="text-gray-600 mb-1 font-bold">Amount: ₹{budget.amount}</p>
            {budget.description && (
              <p className="text-gray-500 text-sm italic font-bold">Description: "{budget.description}"</p>
            )}
            <p className="text-xs text-gray-700 mt-2 font-bold">Date: {new Date(budget.date).toLocaleDateString()}</p>

            {/* Edit and Delete Buttons */}
            <div className="flex justify-end space-x-4 mt-4">
              <Link
                to={`/update/${budget._id}`}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm"
              >
                Edit
              </Link>
              <button
               
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                onClick={(e)=> handleDelete(budget._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
