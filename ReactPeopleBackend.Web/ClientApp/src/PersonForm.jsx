import React from "react"

function PersonForm({id, firstName, lastName, age, onTextChange, onAddClick}){
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
                <button onClick={onAddClick} className='btn btn-primary w-100'>Add</button>
            </div>
        </div>
    )
}

export default PersonForm;