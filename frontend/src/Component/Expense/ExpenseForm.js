import React, { Fragment, useEffect, useRef } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { activeAction } from "../Store/ActiveSlicer";
import { expensesActions } from "../Store/ExpenseSlicer";

function ExpenseForm(props) {
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();
  const dispatch = useDispatch();
  const Hellow = useSelector((state) => state.expense.expenses);
  



  const submitHandler = async (event) => {
    event.preventDefault();
  
    const expenseData = {
      Amount: amountInputRef.current.value,
      Description: descriptionInputRef.current.value,
      Category: categoryInputRef.current.value,
    };
  
    try {
      const response = await fetch(
        `http://localhost:3000/add-expense`,
        {
          method: "POST",
          body: JSON.stringify(expenseData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
  
      //const data = await response.json();
      // console.log(data);
      getExpenseData();
      console.log('getExpense Function called');
  
      amountInputRef.current.value = "";
      descriptionInputRef.current.value = "";
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  const getExpenseData = () => {
    const response = fetch(
      `http://localhost:3000/get-expense`
    )
      .then((response) => response.json())
      .then((data) => {
         //console.log(data);

        const transformedData = [];

        for (const key in data) {
          transformedData.push({
            id: data[key].id,
            Amount: data[key].Amount,
            Description: data[key].Description,
            Category: data[key].Category,
          });
        }
        console.log(transformedData)
        // props.setExpensesData(transformedData);
        dispatch(expensesActions.setExpenses(transformedData));
    
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getExpenseData();
    console.log('useEffect Get Called')
  }, []);

  const deleteExpenseHandler = (id) => {
    console.log(id)
    fetch(
      `http://localhost:3000/delete-expense/${id}`,
      {
        method: "DELETE",
      }
      )
      .then((response) => response)
      .then((data) => {
        console.log(data);
        getExpenseData();
        console.log("Expense successfully deleted",id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editExpenseHandler = (expense) => {
    amountInputRef.current.value = expense.Amount;
    descriptionInputRef.current.value = expense.Description;
    categoryInputRef.current.value = expense.Category;

    deleteExpenseHandler(expense.id);
  };

  const totalMoney = Hellow.reduce(
    (accumulator, current) => parseInt(accumulator) + parseInt(current.Amount),
    0
  );

  const primiumHandler = () => {
    dispatch(activeAction.showActive());
  };

  return (
    <Fragment>
      <Container
        className="p-3 my-3  text-white"
        style={{ backgroundColor: "#b3adba" }}
      >
        <Form onSubmit={submitHandler} id="expenses">
          <Row>
            <Col className="form-control">
              <input
                type="number"
                placeholder="Amount"
                name="Amount"
                ref={amountInputRef}
                required
              ></input>
            </Col>

            <Col className="form-control">
              <textarea
                style={{ height: "25px" }}
                type="text"
                placeholder="Description"
                name="Description"
                ref={descriptionInputRef}
                required
              ></textarea>
            </Col>

            <Col className="form-control">
              <select ref={categoryInputRef} name="Category" required>
                <option>Food</option>

                <option>Petrol</option>

                <option>Clothes</option>

                <option>other..</option>
              </select>
            </Col>

            <Col className="mt-5">
              <Button type="submit" variant="success">
                Add New Expense
              </Button>
            <div style={{margin:'5px', padding:'5px'}}>{totalMoney >= 10000 && (
                <Button variant="danger" onClick={primiumHandler}>
                  Active premium Button
                </Button>
              )}</div>
            </Col>
          </Row>
        </Form>
      </Container>
      <h1 style={{ textAlign: "center" }}>Expenses</h1>
      <h3>Total Amount: $ {totalMoney}</h3>

      <div>
        {Hellow.map((expense, id) => (
          <div
            className=" d-flex justify-content-around mx-5 p-1 shadow"
            key={id}
          >
            <p>Amount: $ {expense.Amount}</p>
            <p class="text-justify">Description : {expense.Description}</p>
            <p>Category : {expense.Category}</p>
            <Button onClick={() => editExpenseHandler(expense)}>Edit</Button>
            <Button
              variant="danger"
              onClick={() => deleteExpenseHandler(expense.id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default ExpenseForm;
