import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddFolder.css'

export default class AddFolder extends Component {

  constructor(props){
   super(props);
   this.state = {
     folderName: ''
   }
 }



  handleFolderPost(folderName) {
    this.setState({
      folderName
    })
  }

  postFolderName = () => {
    const folderName = this.state.folderName
    const id = folderName

    const folderInfo = {
      "id": id,
      "name": folderName
    }

    const url = 'http://localhost:9090/folders'
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folderInfo)
    }

    fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Something went wrong!')
    })
    .then(alert('Folder added'))
    .catch(err => console.log(err))
  }

  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={this.postFolderName}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' onChange={e => this.handleFolderPost(e.target.value)}/>
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
