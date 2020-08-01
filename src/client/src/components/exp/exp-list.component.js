import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import ExpService from './services';


export default class ExpList extends Component {

    constructor(props) {
        super(props);
        this.expService = new ExpService;
        this.state = {
            exps: []
        }
        this.deleteExp = this.deleteExp.bind(this);
    }

    componentDidMount = () => {
        this.getExpList();
    }

    async getExpList() {
        await axios.get('/api/exp', { headers: authHeader() })
            .then((response) => {
                console.log(response);
                this.setState({
                    exps: response.data
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteExp(empid) {
        this.expService.deleteExp(empid);
        this.getExpList();
    }

    render() {
        const { exps } = this.state;
        return (
            <div className="container-fluid">
                <h3 className="text-center">Expenses List</h3><Link to={"/addExp"} className="btn btn-outline-success"><i class="fa fa-plus"></i> Add Expenses</Link>
                <table className="table table-striped table-bordered table-hover" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>DATE</th>
                            <th>MODE</th>
                            <th>PAID TO / FROM</th>
                            <th>COST CENTER</th>
                            <th>AMOUNT</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            exps && exps.map((employee, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{i}</td>
                                        <td>{employee.dt}</td>
                                        <td>{employee.mode}</td>
                                        <td>{employee.pto}</td>
                                        <td>{employee.head}</td>
                                        <td>{employee.amt}</td>
                                        <td><Link to={"editExp/" + employee._id} className="text-info"><i class="fas fa-pencil-alt"></i></Link> &nbsp; | &nbsp;
                      <a href="#" onClick={() => this.deleteExp(employee._id)} className="text-danger"><i class="far fa-trash-alt"></i></a>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}