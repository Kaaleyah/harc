import React, { useContext } from "react"
import { v4 as uuidv4 } from "uuid"
import useLocalStorage from "../hoooks/useLocalStorage"

const BudgetContext = React.createContext()

export const uncategorizedBudgetID = "Uncategorized"

export function useBudgets() {
    return useContext(BudgetContext)
}

export const BudgetProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])

    function getExpenses(budgetID) {
        return expenses.filter(expense => expense.budgetID === budgetID)
    }

    function addExpense({ description, amount, budgetID }) {
        setExpenses([...expenses, { ID: uuidv4(), description, amount, budgetID }])
    }

    function addBudget({ name, max }) {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets
            }
            return [...prevBudgets, { ID: uuidv4(), name, max }]
        })
    }

    function deleteBudget({ id }) {
        setExpenses(prevExpenses => {
          return prevExpenses.map(expense => {
            if (expense.budgetId !== id) return expense
            return { ...expense, budgetId: uncategorizedBudgetID }
          })
        })
    
        setBudgets(prevBudgets => {
          return prevBudgets.filter(budget => budget.id !== id)
        })
      }

    function deleteExpense({ ID }) {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.ID !== ID)
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