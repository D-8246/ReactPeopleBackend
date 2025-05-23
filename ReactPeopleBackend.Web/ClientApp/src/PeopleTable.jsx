import React from 'react'
import PersonRow from './PersonRow'
import PersonForm from './PersonForm'
import axios from 'axios'

class PeopleTable extends React.Component {

    state = {
        people: [],
        currentPerson: {
            id: 0,
            firstName: '',
            lastName: '',
            age: ''
        },
        checkedPeople: [],
        editMode: false
    }

    loadPeople() {
        axios.get('api/people/getall').then(({ data }) => {
            this.setState({ people: data })
        });
    }

    componentDidMount() {
        axios.get('api/people/getall').then(({ data }) => {
            this.setState({ people: data })
        });
    }

    onTextChange = e => {
        const copy = { ...this.state.currentPerson };
        copy[e.target.name] = e.target.value;
        this.setState({ currentPerson: copy });
    }

    deleteAll = e => {
        axios.post('api/people/deleteall', { "Ids": this.state.checkedPeople }).then(() => {
            this.setState({ checkedPeople: [] });
            this.loadPeople();
        });
    }

    checkAll = e => {
        const ids = this.state.people.map(p => p.id);
        this.setState({ checkedPeople: [...ids] });
    }

    uncheckAll = e => {
        this.setState({ checkedPeople: [] });
    }

    deleteOne = (id) => {
        console.log('in deleteOne function');
        axios.post('api/people/deleteall', { "Ids": [id] }).then(() => {
            this.loadPeople();
        })
    }

    onEditClick = ({ firstName, lastName, age, id }) => {
        this.setState({
            editMode: true,
            currentPerson: {
                firstName,
                lastName,
                age,
                id
            }
        })
    }

    onCheckboxChange = (id) => {
        const copy = [...this.state.checkedPeople]
        if (copy.includes(id)) {
            this.setState({ checkedPeople: copy.filter(p => p !== id) })
        }
        else {
            this.setState({ checkedPeople: [...copy, id], })
        }
    }

    onAddUpdateClick = e => {
        console.log('in addupdate function');
        const url = this.state.editMode ? 'api/people/update' : 'api/people/add';
        axios.post(url, this.state.currentPerson).then(() => {
            this.setState({
                currentPerson: {
                    firstName: '',
                    lastName: '',
                    age: ''
                },
                editMode: false
            })
            this.loadPeople();
        })
    }

    onCancelClick = e => {
        this.setState({
            currentPerson: {
                firstName: '',
                lastName: '',
                age: ''
            },
            editMode: false
        })
    }

    render() {
        const { firstName, lastName, age, id } = this.state.currentPerson;
        return (
            <div className="container mt-5">
                <div className="row">
                    <PersonForm
                        firstName={firstName}
                        lastName={lastName}
                        age={age}
                        id={id}
                        onAddUpdateClick={this.onAddUpdateClick}
                        onTextChange={this.onTextChange}
                        editMode={this.state.editMode} 
                        onCancelClick={this.onCancelClick}/>
                    <table className="table table-hover table-striped table-bordered mt-3">
                        <thead>
                            <tr>
                                <th style={{ width: '15%' }}>
                                    <button className='btn btn-danger w-100' onClick={this.deleteAll}>Delete all</button>
                                    <button className='btn btn-outline-danger w-100 mt-2' onClick={this.checkAll}>Check all</button>
                                    <button className='btn btn-outline-danger w-100 mt-2' onClick={this.uncheckAll}>Uncheck all</button>
                                </th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Age</th>
                                <th>Edit/Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.people.map(p => <PersonRow key={p.id}
                                person={p}
                                checkedPeople={this.state.checkedPeople}
                                onCheckboxChange={this.onCheckboxChange}
                                deleteOne={this.deleteOne}
                                onEditClick={this.onEditClick} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default PeopleTable;

