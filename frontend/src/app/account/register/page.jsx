
"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import { useFormik } from 'formik';
import { registerSchema } from '../../../validation/schemas';
import { useRouter } from 'next/navigation';

// hooks
import useAuth from "../../../hooks/useAuth";

const initialValues = {
  name: "",
  email: "",
  password: "",
  password_confirmation: ""
};

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { handleRegister, error } = useAuth();
  const router = useRouter();

  const formik = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      const data = await handleRegister(values);
      console.log('Registration Response:', data);
      if (data.status === "success") {
        router.push("/account/login");
      } else {
        data.message && setErrorMessage(data.message);
      }
      setLoading(false);
      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {!loading && (
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                placeholder="Enter your name"
              />
              {formik.errors.name && <div className="text-sm text-red-500 px-2">{formik.errors.name}</div>}
            </div>
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
              {formik.errors.email && <div className="text-sm text-red-500 px-2">{formik.errors.email}</div>}
            </div>
            <div className="mb-4">
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
              {formik.errors.password && <div className="text-sm text-red-500 px-2">{formik.errors.password}</div>}
            </div>
            <div className="mb-6">
              <label htmlFor="password_confirmation" className="block font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                value={formik.values.password_confirmation}
                onChange={formik.handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                placeholder="Confirm your password"
              />
              {formik.errors.password_confirmation && <div className="text-sm text-red-500 px-2">{formik.errors.password_confirmation}</div>}
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 disabled:bg-gray-400"
              disabled={loading || formik.isSubmitting}
            >
              Register
            </button>
          </form>
          <p className="text-sm text-gray-600 p-1">
            Already a User? <Link href="/account/login" className="text-indigo-500 hover:text-indigo-600 transition duration-300 ease-in-out">Login</Link>
          </p>
          {errorMessage && <div className="text-sm text-red-500 font-semibold px-2 text-center">{errorMessage}</div>}
        </div>
      )}
    </div>
  );
}

export default Register;
