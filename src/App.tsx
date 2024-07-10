import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseFilter from "./components/ExpenseFilter";
import { useState } from "react";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: "Water",
      cost: 100,
      quantity: 1,
      category: "Utilities",
    },
    {
      id: 2,
      description: "Trash",
      cost: 60,
      quantity: 1,
      category: "Utilities",
    },
    {
      id: 3,
      description: "Apples",
      cost: 1,
      quantity: 5,
      category: "Groceries",
    },
    {
      id: 4,
      description: "Beers",
      cost: 5,
      quantity: 3,
      category: "Entertainment",
    },
  ]);

  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  return (
    <>
      <h1 className="mb-5">Expense Tracker</h1>
      <ExpenseForm
        onSubmit={(expense) =>
          setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
        }
      />
      <ExpenseFilter
        onSelectCategory={(category) => setSelectedCategory(category)}
      />
      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
      ></ExpenseList>
    </>
  );
}

export default App;
