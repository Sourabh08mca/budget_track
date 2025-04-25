import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const UpdateForm = () => {
       const {id} = useParams()
       const [type, setType] = useState();
       const [amount, setAmount] = useState();
       const [category, setCategory] = useState();
       const [description, setDescription] = useState();
       const navigate = useNavigate()

        useEffect(() => {
           axios.get('http://localhost:3001/getBudget/'+id)
             .then(result =>{ console.log(result)
                setType(result.data.type)
                setAmount(result.data.amount)
                setCategory(result.data.category)
                setDescription(result.data.description)
                
             })
             .catch(err => console.log(err));
         }, []);

        const Update = (e) => {
            e.preventDefault();
            axios.put('http://localhost:3001/updateBudget/'+id,{type, amount, category, description})
           .then(result => {console.log(result)
            navigate('/')
        })
           .catch(err => console.log(err))
        }

  return (
    <form  className="max-w-md mx-auto p-6 bg-white shadow rounded-xl space-y-4" onSubmit={Update}>
      <h2 className="text-2xl font-semibold text-center">Update Transaction</h2>

      {/* Type */}
      <div>
  <label className="block mb-1 font-medium">Type</label>
  <div className="flex items-center space-x-4">
    <label className="inline-flex items-center">
      <input
        type="radio"
        value="Income"
        checked={type === 'Income'}
        onChange={(e) => setType(e.target.value)}
        className="form-radio text-green-500"
      />
      <span className="ml-2">Income</span>
    </label>
    <label className="inline-flex items-center">
      <input
        type="radio"
        value="Expense"
        checked={type === 'Expense'}
        onChange={(e) => setType(e.target.value)}
        className="form-radio text-red-500"
      />
      <span className="ml-2">Expense</span>
    </label>
  </div>
</div>


      {/* Amount */}
      <div>
        <label className="block mb-1 font-medium">Amount</label>
        <input
          type="number"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="block mb-1 font-medium">Category</label>
        <select
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Salary">Salary</option>
          <option value="Entertainment">Entertainment</option>
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="3"
         value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      {/* Submit */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default UpdateForm;
