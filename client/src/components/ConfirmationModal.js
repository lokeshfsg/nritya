export default function ConfirmationModal({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop d-block">
      <div className="modal-card">
        <h5>{title}</h5>
        <p>{message}</p>
        <div className="d-flex gap-2 justify-content-end">
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="btn btn-primary" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
