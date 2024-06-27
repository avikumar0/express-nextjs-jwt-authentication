"use client"
import Link from "next/link";
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { loginSchema } from '../../../validation/schemas';

// hooks
import useAuth from "../../../hooks/useAuth";

const initialValues = {
  email: "",
  password: ""
}

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { handleLogin } = useAuth();
  const router = useRouter();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      console.log(values);
      const data = await handleLogin(values);
      if (data.status === "success") {
        router.push("/user/profile");
        console.log("Login successful", data.message);
        setLoading(false);
      } else {
        data.message && setErrorMessage(data.message);
        setLoading(false);
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
              placeholder="Enter your email"
            />
            {formik.errors.email && <div className="text-red-500">{formik.errors.email}</div>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
              placeholder="Enter your password"
            />
            {formik.errors.password && <div className="text-red-500">{formik.errors.password}</div>}
          </div>
          <p className="text-sm text-gray-600 p-1">
            <Link href="/account/reset-password-link" className="text-indigo-500 hover:text-indigo-600 transition duration-300 ease-in-out">Forgot Password?</Link>
          </p>
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:bg-gray-400"
            disabled={loading || formik.isSubmitting}>Login
          </button>
          {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
        </form>
        <p className="text-sm text-gray-600 p-1">
          Not a User? <Link href="/account/register" className="text-indigo-500 hover:text-indigo-600 transition duration-300 ease-in-out">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

