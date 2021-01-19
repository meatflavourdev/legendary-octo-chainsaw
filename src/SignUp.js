import 'antd/dist/antd.css';
import './index.css';
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';


function SignUp() {

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name="normal_signup"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      {/* Username field */}
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please enter a Username!',
          },
        ]}
      >
        <Input
        prefix={<UserOutlined className="site-form-item-icon" />}
        placeholder="Username" />
      </Form.Item>

      {/* Email field */}
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please enter an Email!',
          },
        ]}
      >
        <Input
        prefix={<UserOutlined className="site-form-item-icon" />}
        placeholder="Email" />
      </Form.Item>

      {/* Password field */}
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please enter a Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      {/* Confirm Password field */}
      <Form.Item
        name="confirm-password"
        rules={[
          {
            required: true,
            message: 'Please confirm your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Confirm Password"
        />
      </Form.Item>

      {/* A JSX comment */}
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Sign up
        </Button>
        Already have an account? <Link to="/login">Login</Link>
      </Form.Item>
    </Form>
  );

}

export default SignUp;
