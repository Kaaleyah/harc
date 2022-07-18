import { uncategorizedBudgetID, useBudgets } from "../contexts/BudgetContext"
import BudgetCard from "./BudgetCard"

export default function UncategorizedBudgetCard(props) {
    const { getExpenses } = useBudgets()

    const amount = getExpenses(uncategorizedBudgetID).reduce(
        (total, expense) => total + expense.amount,
        0
    )

    if (amount === 0) {
        return null
    }

    return (
        <BudgetCard gray name="Uncategorized" amount={amount} {...props}/>  
    )
}