import React from 'react'

function PersonRow({ person, onCheckboxChange, checkedPeople }) {
    const { firstName, lastName, age, id } = person
    return (
        <tr>
            <td>
                <div className='d-flex justify-content-center align-items-center'>
                    <input type="checkbox"
                        checked={checkedPeople.includes(id)}
                        onChange={(e) => onCheckboxChange(id)}
                        className='form-check-input mt-2'
                        style={{ transform: 'scale(1.5)' }} />
                </div>
            </td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td style={{ display: 'none' }}>
                <input type='hidden' value={id} />
            </td>
        </tr>
    )
}

export default PersonRow;