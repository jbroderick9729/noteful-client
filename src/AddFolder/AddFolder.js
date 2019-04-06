import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import { Redirect } from 'react-router-dom';
import './AddFolder.css'

export default class AddFolder extends Component {

  constructor(props){
   super(props);
   this.state = {
     folderName: '',
     fireRedirect: false
   }
 }



  handleFolderPost(folderName) {
    this.setState({
      folderName
    })
  }

  postFolderName = (e) => {
    e.preventDefault();
    const folderName = this.state.folderName
    const id = folderName

    const folderInfo = {
      "id": id,
      "name": folderName
    }
    this.setState({ fireRedirect: true })

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
    .then(console.log('Folder added'))
    .catch(err => console.log(err))
  }

  render() {
    const { from } = this.props.location.state || '/'
    const { fireRedirect } = this.state
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
        {fireRedirect && (
          <Redirect to={from || '/'}/>
        )}
      </section>
    )
  }
}
