import React from 'react';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
const registerMutation = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password)
  }
`;
class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
  };
  onSubmit = async () => {
    const response = await this.props.mutate({
      variables: this.state,
    });
    console.log(response);
  };

  onChange = e => {
    const { name, value } = e.target;
    // name = "email";
    this.setState({ [name]: value });
  };

  render() {
    const { username, email, password } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <Container text>
          <h2>Register</h2>
        <Input
          name="username"
          onChange={onChange}
          value={username}
          placeholder="Username"
          fluid
        />
        <Input name="email" onChange={onChange} value={email} placeholder="Email" fluid />
        <Input
          name="password"
          onChange={onChange}
          value={password}
          type="password"
          placeholder="Password"
          fluid
        />
        <Button onClick={(username && email && password) ? onSubmit : null }>Submit</Button>
      </Container>
    );
  }
}

export default graphql(registerMutation)(Register);