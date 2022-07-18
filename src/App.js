import { Button, Container, Stack } from "react-bootstrap"
import BudgetCard from "./components/BudgetCard"
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard"
import TotalBudgetCard from "./components/TotalBudgetCard";
import NewBudgetModal from "./components/NewBudgetModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import NewExpenseModal from "./components/NewExpenseModal";
import { useState } from "react";
import { uncategorizedBudgetID, useBudgets } from "./contexts/BudgetContext";
import "./style.css";

function App() {
    const [showNewbudgetModal, setShowNewBudgetModal] = useState(false);
    const [showNewExpenseModal, setShowNewExpenseModal] = useState(false);

    const [newExpenseBudgetID, setNewExpenseBudgetID] = useState();
    const [viewExpenseBudgetID, setViewExpenseBudgetID] = useState();
    

    const { budgets, getExpenses } = useBudgets();

    function openNewExpenseModal(budgetID) {
        setShowNewExpenseModal(true);
        setNewExpenseBudgetID(budgetID);
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
                        const amount = getExpenses(budget.ID).reduce(
                            (total, expense) => total + expense.amount,
                            0
                        )

                        return (
                            <BudgetCard 
                                key={budget.ID} 
                                name={budget.name} 
                                amount={amount}
                                max={budget.max} 
                                onNewExpenseClick={() => openNewExpenseModal(budget.ID)}
                                onViewExpensesClick={() => setViewExpenseBudgetID(budget.ID)}
                            />    
                        )
                    })}

                    <UncategorizedBudgetCard
                        onNewExpenseClick={openNewExpenseModal}
                        onViewExpensesClick={() => setViewExpenseBudgetID(uncategorizedBudgetID)}
                    />
                    <TotalBudgetCard />
                </div>
            </Container>
            <NewBudgetModal show={showNewbudgetModal} onClose={() => setShowNewBudgetModal(false)} />
            <NewExpenseModal show={showNewExpenseModal} defaultBudgetID={newExpenseBudgetID} onClose={() => setShowNewExpenseModal(false)} />

            <ViewExpensesModal budgetID={viewExpenseBudgetID} onClose={() => setViewExpenseBudgetID()} />
        </>
    )
}

export default App;