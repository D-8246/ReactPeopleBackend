import React from "react"

function PersonForm({ firstName, lastName, age, onTextChange, onAddUpdateClick, editMode, onCancelClick }) {
    return (
        <div className="row p-5 rounded">
            <div className="col-md-3">
                <input name='firstName' value={firstName} onChange={onTextChange} type="text" className="form-control" placeholder="First Name" />
            </div>
            <div className="col-md-3">
                <input name='lastName' value={lastName} onChange={onTextChange} type="text" className="form-control" placeholder="Last Name" />
            </div>
            <div className="col-md-3">
                <input name='age' value={age} onChange={onTextChange} type="text" className="form-control" placeholder="Age" />
            </div>
            <div className="col-md-3">
                <button onClick={onAddUpdateClick} className={`btn btn-${editMode ? 'warning' : 'primary'} w-100`}>
                    {editMode ? 'Update' : 'Add'}
                </button>
                {editMode && (
                    <div className="mt-2">
                        <button onClick={onCancelClick} type="button" className="btn btn-dark w-100">Cancel</button>
                    </div>
                )}
            </div>

        </div>
    )
}

export default PersonForm;