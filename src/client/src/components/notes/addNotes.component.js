import React, { Component } from 'react';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import { Link } from 'react-router-dom';
import AuthService from "../../services/auth.service";

class AddNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DT: '',
            NOTE: '',
            usern: '',
            currentUser: undefined
        }
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
    
        if (user) {
          this.setState({
            currentUser: user,
            usern: user.username
          });
        }
      }

    // When value changes of the fields
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    // To add new employee when user submits the form
    handleSubmit = (event) => {
        event.preventDefault();
        const { DT, NOTE, usern } = this.state;
        axios.post('/api/notes', {
            DT: DT,
            NOTE: NOTE,
            usern: usern,
        }, { headers: authHeader() })
            .then((response) => {
                console.log(response);
                this.props.history.push('/notes');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="container-fluid">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        DATE
                        <input
                            name="DT"
                            type="date"
                            value={this.state.DT}
                            onChange={this.handleChange}
                            className="form-control"
                            required
                        />
                    </label>
                    <br />
                    <label>
                        NOTE
                        <textarea
                            name="NOTE"
                            value={this.state.NOTE}
                            onChange={this.handleChange}
                            className="form-control"
                            rows="15"
                            cols="12"
                            required
                        ></textarea>
                    </label>
                    <br />
                    <label>
                        USER NAME
                        <input
                            name="usern"
                            type="text"
                            value={this.state.usern}
                            onChange={this.handleChange}
                            className="form-control"
                            readOnly
                        />
                    </label>
                    <br />
                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-success"
                        ><i class="fa fa-database"></i> Save</button> &nbsp;
                        <Link to={"/notes"} className="btn btn-primary"><i class="fa fa-list-alt"></i> View All</Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddNotes;