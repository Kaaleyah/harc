import { Modal, Button, Stack } from 'react-bootstrap';
import { uncategorizedBudgetId, useBudgets } from '../contexts/BudgetContext';
import '../style.css';
import { currencyFormatter } from '../utils';

export default function ViewExpensesModal({ budgetId, onClose }) {
    const { getExpenses, budgets, deleteBudget, deleteExpense } = useBudgets();

    const expenses = getExpenses(budgetId);

    const budget = uncategorizedBudgetId === budgetId ? 
    {
        name: 'Uncategorized', id: uncategorizedBudgetId 
    } : budgets.find(budget => budget.id === budgetId);

    return (
        <Modal show={budgetId != null} onHide={onClose}>
            <div id="modal">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Stack direction="horizontal" gap="2">
                            <div>Expenses - {budget?.name}</div>
                            {budgetId !== uncategorizedBudgetId && (
                                <Button variant="outline-danger" onClick={() => {
                                    deleteBudget(budgetId);
                                    onClose();
                                }}>Delete</Button>
                            )}
                        </Stack>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Stack direction="vertical" gap="2">
                        {expenses.map(expense => (
                          <Stack direction="horizontal" gap="2" key={expense.id}>
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