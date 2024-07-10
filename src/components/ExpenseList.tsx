import React from "react";

interface Expense {
  id: number;
  description: string;
  quantity: number;
  cost: number;
  category: string;
}

interface Props {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

const ExpenseList = ({ expenses, onDelete }: Props) => {
  if (expenses.length === 0) return null;
  return (
    <>
      <div className="mb3">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Cost</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>{expense.quantity}</td>
                <td>${expense.cost} ea</td>
                <td>{expense.category}</td>
                <td>
                  <button
                    onClick={() => onDelete(expense.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td></td>
              <td>
                $
                {expenses.reduce(
                  (acc, expense) => expense.cost * expense.quantity + acc,
                  0
                )}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default ExpenseList;
