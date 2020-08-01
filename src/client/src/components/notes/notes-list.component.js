import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import NotesService from './services';




export default class NotesList extends Component {

  constructor(props) {
    super(props);
    this.noteService = new NotesService;
    this.state = {
      notes: []
    }
    this.deleteNote = this.deleteNote.bind(this);
  }


  componentDidMount = () => {
    this.getNoteList();
  }

  async getNoteList() {
    await axios.get('/api/notes', { headers: authHeader() })
      .then((response) => {
        console.log(response);
        this.setState({
          notes: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteNote(empid) {
    this.noteService.deleteNote(empid);
    this.getNoteList();
  }

  render() {
    const { notes } = this.state;
    return (
      <div className="container-fluid">
        <div>
          <h3 className="text-center">Notes List</h3><Link to={"/addNote"} className="btn btn-outline-primary"><i class="fa fa-plus"></i> Add Note</Link>
          <table className="table table-striped table-bordered table-hover" style={{ marginTop: 20 }} >
            <thead>
              <tr>
                <th>#</th>
                <th>DATE</th>
                <th>NOTE</th>
                <th>USER NAME</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {
                notes && notes.map((employee, i) => {
                  return (
                    <tr key={i}>
                      <td>{i}</td>
                      <td>{employee.DT}</td>
                      <td>{employee.NOTE}</td>
                      <td>{employee.usern}</td>
                      <td><Link to={"editNote/" + employee._id} className="text-info"><i class="fas fa-pencil-alt"></i></Link> &nbsp; | &nbsp;
                      <a href="#" onClick={() => this.deleteNote(employee._id)} className="text-danger"><i class="far fa-trash-alt"></i></a>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}