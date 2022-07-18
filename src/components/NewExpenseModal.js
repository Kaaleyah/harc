import { Modal, Form, Button } from 'react-bootstrap';
import { useRef } from 'react';
import { useBudgets, uncategorizedBudgetID } from '../contexts/BudgetContext';
import '../style.css';

export default function NewExpenseModal({ show, onClose, defaultBudgetID }) {
    const descriptionRef = useRef();
    const amountRef = useRef();
    const budgetIDRef = useRef();

    const { addExpense, budgets } = useBudgets();
 
    function handleSubmit(e) {
        e.preventDefault();

        addExpense({
            description: descriptionRef.current.value,
            amount: amountRef.current.value,
            budgetID: budgetIDRef.current.value
        })

        onClose();
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Form id="modal" onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Expense</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control ref={descriptionRef} type="text" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control ref={amountRef} type="number" required min={0} step={0.01} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="budgetID">
                        <Form.Label>Budget</Form.Label>
                        <Form.Select ref={budgetIDRef}  defaultValue={defaultBudgetID}>
                            <option id={uncategorizedBudgetID}>Uncategorized</option>
                            {budgets.map(budget => (
                                <option key={budget.ID} value={budget.ID}>{budget.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button type="submit" variant="primary">Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}