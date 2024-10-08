import React, { useState } from "react";
import axios from "axios";
import Input from "../components/Input";
import Button from "../components/Button";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.length < 3) {
      errors.name = "Name must be at least 3 characters long.";
    }

    if (!emailPattern.test(email)) {
      errors.email = "Invalid email address.";
    }

    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Clear any previous errors

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const registerResponse = await axios.post(
        "http://localhost:3001/auth/register",
        {
          name,
          email,
          password,
          vip: false,
        }
      );

      console.log("User registered successfully:", registerResponse.data);

      localStorage.setItem("name", registerResponse.data.name);
      localStorage.setItem("email", registerResponse.data.email);

      const loginResponse = await axios.post(
        "http://localhost:3001/auth/login",
        {
          email,
          password,
        }
      );

      const token = loginResponse.data.token;
      localStorage.setItem("Token", token);
      console.log("Logged in successfully with token:", token);

      window.location.href = "/";
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError("The email is already registered.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <Input
              id="name"
              label="Name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
            />
            {formErrors.name && (
              <div className="text-red-600 text-sm">{formErrors.name}</div>
            )}
          </div>

          <div className="mb-4">
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
            {formErrors.email && (
              <div className="text-red-600 text-sm">{formErrors.email}</div>
            )}
          </div>

          <div className="mb-4">
            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
            {formErrors.password && (
              <div className="text-red-600 text-sm">{formErrors.password}</div>
            )}
          </div>

          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>

        <div className="text-center mt-4">
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
