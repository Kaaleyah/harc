import { Modal, Button, Stack } from 'react-bootstrap';
import { uncategorizedBudgetID, useBudgets } from '../contexts/BudgetContext';
import '../style.css';
import { currencyFormatter } from '../utils';

export default function ViewExpensesModal({ budgetID, onClose }) {
    const { getExpenses, budgets, deleteBudget, deleteExpense } = useBudgets();

    const expenses = getExpenses(budgetID);

    const budget = uncategorizedBudgetID === budgetID ? 
    {
        name: 'Uncategorized', ID: uncategorizedBudgetID 
    } : budgets.find(budget => budget.ID === budgetID);

    return (
        <Modal show={budgetID != null} onHide={onClose}>
            <div id="modal">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Stack direction="horizontal" gap="2">
                            <div>Expenses - {budget?.name}</div>
                            {budgetID !== uncategorizedBudgetID && (
                                <Button variant="outline-danger" onClick={() => {
                                    deleteBudget(budgetID);
                                    onClose();
                                }}>Delete</Button>
                            )}
                        </Stack>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Stack direction="vertical" gap="2">
                        {expenses.map(expense => (
                          <Stack direction="horizontal" gap="2" key={expense.ID}>
                            <div className="me-auto fs-4">{expense.description}</div>
                            <div className="fs-5">{currencyFormatter.format(expense.amount)}</div>
                            <Button onClick={() => deleteExpense(expense)} size="sm" variant="outline-danger">&#215;</Button>
                          </Stack>
                        ))}
                    </Stack>
                </Modal.Body>
            </div>
        </Modal>
    )
}