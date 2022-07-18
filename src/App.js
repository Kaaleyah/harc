import { Button, Container, Stack } from "react-bootstrap"
import BudgetCard from "./components/BudgetCard"
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard"
import TotalBudgetCard from "./components/TotalBudgetCard";
import NewBudgetModal from "./components/NewBudgetModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import NewExpenseModal from "./components/NewExpenseModal";
import { useState } from "react";
import { uncategorizedBudgetId, useBudgets } from "./contexts/BudgetContext";
import "./style.css";

function App() {
    const [showNewbudgetModal, setShowNewBudgetModal] = useState(false);
    const [showNewExpenseModal, setShowNewExpenseModal] = useState(false);

    const [newExpenseBudgetId, setNewExpenseBudgetId] = useState();
    const [viewExpenseBudgetId, setViewExpenseBudgetId] = useState();
    

    const { budgets, getExpenses } = useBudgets();

    function openNewExpenseModal(budgetId) {
        setShowNewExpenseModal(true);
        setNewExpenseBudgetId(budgetId);
    }

    return (
        <>
            <Container className="my-4">
                <Stack direction="horizontal" gap="2" className="mb-4">
                    <h1 className="me-auto">Harc</h1>

                    <Button variant="primary" onClick={() => setShowNewBudgetModal(true)} >Add Budget</Button>
                    <Button variant="info" onClick={openNewExpenseModal} >Add Expense</Button>

                </Stack>

                <div id="budget-grid">
                    {budgets.map(budget => {
                        const amount = getExpenses(budget.id).reduce(
                            (total, expense) => total + expense.amount,
                            0
                        )

                        return (
                            <BudgetCard 
                                key={budget.id} 
                                name={budget.name} 
                                amount={amount}
                                max={budget.max} 
                                onNewExpenseClick={() => openNewExpenseModal(budget.id)}
                                onViewExpensesClick={() => setViewExpenseBudgetId(budget.id)}
                            />    
                        )
                    })}

                    <UncategorizedBudgetCard
                        onNewExpenseClick={openNewExpenseModal}
                        onViewExpensesClick={() => setViewExpenseBudgetId(uncategorizedBudgetId)}
                    />
                    <TotalBudgetCard />
                </div>
            </Container>
            <NewBudgetModal show={showNewbudgetModal} onClose={() => setShowNewBudgetModal(false)} />
            <NewExpenseModal show={showNewExpenseModal} defaultBudgetId={newExpenseBudgetId} onClose={() => setShowNewExpenseModal(false)} />

            <ViewExpensesModal budgetId={viewExpenseBudgetId} onClose={() => setViewExpenseBudgetId()} />
        </>
    )
}

export default App;