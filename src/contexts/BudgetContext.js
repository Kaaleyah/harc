import React, { useContext } from "react"
import { v4 as uuidv4 } from "uuid"
import useLocalStorage from "../hoooks/useLocalStorage"

const BudgetContext = React.createContext()

export const uncategorizedBudgetId = "Uncategorized"

export function useBudgets() {
    return useContext(BudgetContext)
}

export const BudgetProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])

    function getExpenses(budgetId) {
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    function addExpense({ description, amount, budgetId }) {
        setExpenses([...expenses, { id: uuidv4(), description, amount, budgetId }])
    }

    function addBudget({ name, max }) {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets
            }
            return [...prevBudgets, { id: uuidv4(), name, max }]
        })
    }

    function deleteBudget({ id }) {
        setExpenses(prevExpenses => {
          return prevExpenses.map(expense => {
            if (expense.budgetId !== id) return expense
            return { ...expense, budgetId: uncategorizedBudgetId }
          })
        })

        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })
      }

    function deleteExpense({ id }) {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }

    return (
        <BudgetContext.Provider value={{
            budgets,
            expenses,
            getExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense
        }}>
            {children}
        </BudgetContext.Provider>
    )
}