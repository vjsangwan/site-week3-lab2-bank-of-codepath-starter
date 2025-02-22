import * as React from "react"
import "./AddTransaction.css"
import { API_BASE_URL } from "../../constants"
import { formatDate } from "../../utils/format"
import { v4 as uuidv4 } from 'uuid';
import {createTransactions} from "../../api"
import { useRef } from "react";

export default function AddTransaction(props) {
  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>

      <AddTransactionForm transactionsFromServer={props.transactionsFromServer}  setTransactionsFromServer={props.setTransactionsFromServer}/>
    </div>
  )
}

export function AddTransactionForm(props) {
  
  const formRef = useRef(null)
  
  const submitHandle=(e)=>{
    e.preventDefault();
    let formObject = {
      postedAt: new Date(),
      id: uuidv4()
    }
    const formData = new FormData(e.currentTarget) 
    for (let [key, value] of formData.entries()) {
      formObject[key] = value;
    }
   
    createTransactions(formObject).then(data=>{
      console.log(data.transaction)
      if(props.transactionsFromServer){
        props.setTransactionsFromServer(prevState=>[...prevState, data.transaction])
      }
    }
    
    );
    formRef.current.reset();
  }

  return (
    <div className="form">
      <form className="fields" ref={formRef} onSubmit={submitHandle}>
        <div className="field">
          <label htmlFor="description">Description</label>
          <input id="description" name="description" type="text" />
        </div>
        <div className="field">
          <label htmlFor="category">Category</label>
          <input  id="category" name="category" type="text"/>
        </div>
        <div className="field half-flex">
          <label htmlFor="amount">Amount (cents)</label>
          <input  id="amount" name="amount" type="text"/>
        </div>

        <button className="btn add-transaction" type="submit" >
          Add
        </button>
      </form>
    </div>
  )
}
