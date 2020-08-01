import React, { Component } from 'react';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import { Link } from 'react-router-dom';
import AuthService from "../../services/auth.service";

class AddExp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rid: '',
            dt: '',
            mode: '',
            pto: '',
            head: '',
            grp: '',
            amt: '',
            purp: '',
            usern: '',
            type: '',
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

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { rid, dt, mode, pto, head, grp, amt, purp, usern, type } = this.state;
        axios.post('/api/exp', {
            rid: rid,
            dt: dt,
            mode: mode,
            pto: pto,
            head: head,
            grp: grp,
            amt: amt,
            purp: purp,
            usern: usern,
            type: type,
        }, { headers: authHeader() })
            .then((response) => {
                console.log(response);
                this.props.history.push('/exp');
            })
            .catch((error) => {
                console.log(error);
            });
    }
    render() {
        return (
            <div className="container-fluid">
                <h3 className="text-center text-primary">Add Exp</h3>
                <form onSubmit={this.handleSubmit}>
                    <table className="table table-bordered">
                        <tr>
                            <td colSpan="2">
                                <div class="form-group">
                                    <label for="">RECORD ID</label>
                                    <input type="text" className="form-control" name="rid" placeholder="RECORD ID" value={this.state.rid} onChange={this.handleChange} />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="">DATE</label>
                                    <input type="date" className="form-control" name="dt" onChange={this.handleChange} value={this.state.dt} />
                                </div>
                                <div class="form-group">
                                    <label for="">MODE</label>
                                    <input required type="text" className="form-control" placeholder="PAYMENT MODE" name="mode" onChange={this.handleChange} value={this.state.mode} />
                                </div>
                                <div class="form-group">
                                    <label for="">PAID TO</label>
                                    <input required type="text" className="form-control" placeholder="PAID TO" name="pto" onChange={this.handleChange} value={this.state.pto} />
                                </div>
                                <div class="form-group">
                                    <label for="">COST CENTER</label>
                                    <input type="text" className="form-control" placeholder="COST CENTER" name="head" onChange={this.handleChange} value={this.state.head} />
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="">GROUP</label>
                                    <input type="text" className="form-control" placeholder="GROUP" name="grp" onChange={this.handleChange} value={this.state.grp} />
                                </div>
                                <div class="form-group">
                                    <label for="">AMOUNT</label>
                                    <input required type="number" className="form-control" placeholder="AMOUNT" name="amt" step="any" onChange={this.handleChange} value={this.state.amt} />
                                </div>
                                <div class="form-group">
                                    <label for="">PAYMENT DESCRIPTION</label>
                                    <textarea className="form-control" name="purp" required rows="5" cols="4" onChange={this.handleChange} value={this.state.purp}></textarea>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan='2'>
                                <div class="form-group">
                                    <label for="">PAYMENT TYPE</label>
                                    <input type="text" className="form-control" name="type" placeholder="PAYMENT TYPE" value={this.state.type} onChange={this.handleChange} />
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-outline-success"
                        ><i class="fa fa-database"></i> Save</button> &nbsp;
                        <Link to={"/exp"} className="btn btn-outline-primary"><i class="fa fa-list-alt"></i> View All</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddExp;