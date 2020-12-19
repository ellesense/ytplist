import React, { useState } from "react";
import { Button, Form, Input } from "semantic-ui-react";
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";
import { register } from "../actions/auth";

function Register(props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      props.setAlert("passwords do not match", "warning");
    } else {
      props.register({ name, email, password });
    }
  };

  return (
    <div>
      <h1>Register</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Nickname</label>
          <input
            placeholder="..."
            name="name"
            value={name}
            onChange={(e) => handleChange(e)}
          />
        </Form.Field>
        <Form.Field
          id="form-input-control-error-email"
          control={Input}
          label="Email"
          value={email}
          name="email"
          onChange={(e) => handleChange(e)}
          placeholder="user@example.com"
          // error={{
          //   content: "Please enter a valid email address",
          //   pointing: "below",
          // }}
        />

        <Form.Field>
          <label>Enter Password</label>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => handleChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <label>Confirm Password</label>
          <Input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => handleChange(e)}
          />
        </Form.Field>

        <Button type="submit">Register</Button>
      </Form>
    </div>
  );
}

export default connect(null, { setAlert, register })(Register);
