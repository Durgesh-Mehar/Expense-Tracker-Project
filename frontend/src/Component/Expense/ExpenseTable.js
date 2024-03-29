import React, { Fragment, useEffect } from "react";
import { Button } from "react-bootstrap";



function ExpenseTable(props) {


  const getExpenseData = async () => {
    const response = await fetch(
      "http://localhost:3000/get-expense"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        const transformedData = [];

        for (const key in data) {
          transformedData.push({
            id: data[key].id,
            Category: data[key].Category,
            Description: data[key].Description,
            Amount: data[key].Amount,
          });
        }
        props.setExpensesData(transformedData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getExpenseData();
  }, []);

  const  deleteExpenseHandler =  (id) => {
  
     fetch(
      `http://localhost:3000/delete-expense/${id}`,
      {
        method: "DELETE", 
  
      }) .then((response) => response.json())
      .then((data) => {
         console.log(data);
         getExpenseData();
         console.log ("Expense successfuly deleted");
      })
      .catch((error) => {
        console.log(error);
      });
     
    }


  const  editExpenseHandler =  (expense) => {
    console.log(props.expenseData)
  
    
    deleteExpenseHandler(expense.id);  
  }


//   const editExpenseHandler = (expense)=>{
    
//     const filteredList = props.expensesData.filter((lst)=>lst.Amount===expense.Amount);
//     console.log(filteredList)
    
//     for( let i = 0; i < expense.length; i++){ 

//         if ( expense[i] === filteredList[0]) { 

//             const Amount = prompt('Enter the Amount', expense[i].Amount);
//             const Description  = prompt('Enter the Description', expense[i].Description);
//             const Category = prompt('Enter the Category', expense[i].category);
//             expense.splice(i, 1,{Amount:Amount,Description:Description,Category:Category});
//         }
//       reqPUT(expense).then(res=>{props.setExpensesData([...expense])})
//         console.log(expense)
//     }
// }


// async function reqPUT(){
//     const response = await fetch("https://expense-tracker-3d3d0-default-rtdb.firebaseio.com/expensedata.json",
//     {
//         method:'PUT',
//         body:JSON.stringify(props.expensesData)
//     })
// }
  
  
  return (
    <Fragment>
      <h1 style={{ textAlign: "center" }}>Expenses</h1>
      <div>
        {props.expensesData.map((expense, id) => (
          <div
            className=" d-flex justify-content-around mx-5 p-1 shadow"
            key={id}
          >
            <p>Amount: $ {expense.Amount}</p>
            <p class="text-justify">Description : {expense.Description}</p>
            <p>Category : {expense.Category}</p>
            <Button onClick={()=>editExpenseHandler(expense)}>Edit</Button>
            <Button onClick={()=>deleteExpenseHandler(expense.id)}>Delete</Button> 
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default ExpenseTable;
