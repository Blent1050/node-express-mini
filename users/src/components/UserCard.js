import React from 'react'
import { Button, Card } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const UserCard = props => {
  return (
    <Card.Group className='userCards'>
      <Card>
        <Card.Content>
          <Card.Header>Steve Sanders</Card.Header>
          <Card.Description>
            From Florida
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="green">
              Edit
            </Button>
            <Button basic color="red">
              Delete
            </Button>
          </div>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default UserCard;