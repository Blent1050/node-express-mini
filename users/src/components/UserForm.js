import React from 'react'
import { Button, Input } from 'semantic-ui-react'
const UserForm = (props) => {
    return(
    <form>
       <Input type='text' name='name' placeholder='name' />
        <Input type='text' name='bio' placeholder='bio' />
        <Button type='submit' basic color='green'>Submit</Button>
    </form>
    )
}

export default UserForm;