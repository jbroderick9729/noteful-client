import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddNote.css'
import AppContext from '../AppContext/AppContext'
import PropTypes from 'prop-types'

export default class AddNote extends Component {
  constructor(props) {
    super(props); 
      this.state = {
        name: '',
        id: '',
        modified: '',
        content: '',
        folderId: ''
    }
  }


  static contextType = AppContext

  postNote = (e) => {
    e.preventDefault();
    const noteInfo = {
      "id": this.state.id,
      "name": this.state.name,
      "modified": this.updateModified(),
      "content": this.state.content,
      "folderId": this.state.folderId
    }

    const url ='http://localhost:9090/notes'
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(noteInfo)
    }

    fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Note failed to post!')
    })
    .then(alert('Note added!'))
    .catch(err => console.log(err))
  }


  updateModified() {
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();  

    return date;
  }


  updateName(name) {
    this.setState(
      { name,
      id: name }
    )
  }

  updateContent(content) {
    this.setState({
      content
    })
  }

  updateFolderOption(folderId) {
    this.setState({
      folderId
    })
  }


  render() {
    const { folders } = this.context
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NotefulForm onSubmit={e => this.postNote(e)}>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input type='text' id='note-name-input' onChange={e => this.updateName(e.target.value)} />
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <textarea id='note-content-input' onChange={e => this.updateContent(e.target.value)}/>
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select id='note-folder-select' onChange={e => this.updateFolderOption(e.target.value)}>
              <option value={null} >...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add note
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}

AddNote.propTypes = {
  name: PropTypes.string.isRequired
}