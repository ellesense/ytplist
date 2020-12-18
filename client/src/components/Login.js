import React, { useState } from "react";
import { Button, Form, Input } from "semantic-ui-react";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // do something
  };

  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
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

        <Button type="submit">Login</Button>
      </Form>
    </div>
  );
}

export default Login;
