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
        checkedPeople: []
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
        axios.post('api/people/delete', { "Ids": this.state.checkedPeople }).then(() => {
            this.setState({ checkedPeople: [] });
            this.loadPeople();
        });
    }

    checkAll = e => {
        const ids = this.state.people.map(p => p.id);
        this.setState({ checkedPeople: [...ids] });
    }

    uncheckAll = e => {
        this.setState({checkedPeople : []});
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

    onAddClick = e => {
        this.setState();
        axios.post('api/people/add', this.state.currentPerson).then(() => {
            this.setState({
                currentPerson: {
                    firstName: '',
                    lastName: '',
                    age: ''
                },
            })
            this.loadPeople();
        })
    }

    render() {
        const { firstName, lastName, age } = this.state.currentPerson;
        return (
            <div className="container mt-5">
                <div className="row">
                    <PersonForm
                        firstName={firstName}
                        lastName={lastName}
                        age={age}
                        onAddClick={this.onAddClick}
                        onTextChange={this.onTextChange} />
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
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.people.map(p => <PersonRow key={p.id} 
                            person={p}
                            checkedPeople={this.state.checkedPeople}
                            onCheckboxChange={this.onCheckboxChange} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default PeopleTable;

