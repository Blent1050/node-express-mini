import React from 'react'
import { Button, Input } from 'semantic-ui-react'
const UserForm = (props) => {
    return(
    <form onSubmit={e => props.addUser(e)}>
       <Input onChange={e => props.handleChanges(e)} type='text' name='name' placeholder='name' />
        <Input onChange={e => props.handleChanges(e)} type='text' name='bio' placeholder='bio' />
        <Button type='submit' basic color='green'>Submit</Button>
    </form>
    )
}

export default UserForm;