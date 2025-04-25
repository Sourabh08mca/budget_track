const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const BudgetModel = require('./models/Budgets')

const app =express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/Budget_Tracker")

app.post('/form', (req,res) => {
    BudgetModel.create(req.body)
    .then(budgets => res.json(budgets))
    .catch(err => res.json(err))
})

app.get('/',(req,res)=>{
    BudgetModel.find({})
    .then(budgets => res.json(budgets))
    .catch(err => res.json(err))
})

app.get('/getBudget/:id', (req,res) => {
    const id = req.params.id;
    BudgetModel.findById({_id:id})
    .then(budgets => res.json(budgets))
    .catch(err => res.json(err) )
})

app.put('/updateBudget/:id', (req,res)=> {
    const id = req.params.id;
    BudgetModel.findByIdAndUpdate({_id:id}, {
        type:req.body.type,
        amount: req.body.amount,
        category:req.body.category,
        description: req.body.description
    })
    .then(budgets => res.json(budgets))
    .catch(err => res.json(err) )

})

app.delete('/deleteBudget/:id',(req,res) => {
    const id = req.params.id;
    BudgetModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

app.listen(3001, (req,res) => {
    console.log('Server is Running')
})