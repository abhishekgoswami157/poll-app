import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import authApi from "../../apis/auth";
import { validateSignup } from "../../utils/validateLogic";
import UserContext from "../Context/UserContext";
import Layout from "../layout";

function Signup({ history }) {
  let [authErr, setAuthErr] = useState("");
  let [loading, setLoading] = useState(false);
  let context = useContext(UserContext);

  const {
    values,
    errors,
    handleSubmit,
    handleBlur,
    handleChange,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: validateSignup,
    onSubmit: async (values, actions) => {
      try {
        let response = await authApi.signup({
          user: {
            name: values.name,
            email: values.email,
            password: values.password,
            password_confirmation: values.confirmPassword,
          },
        });
        console.log(response, "RESPONE IN SIGNUP");
        context.setCurrentUser(response.data.current_user);
        actions.setSubmitting(false);
        history.push("/");
      } catch (error) {
        setAuthErr(error?.response?.data?.errors);
      }
    },
  });

  return (
    <Layout>
      <section className="bg-gray-50 h-screen">
        <div className="pt-20 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md flex justify-center">
            <h2 className="text-4xl font-semibold text-gray-700 mb-4">
              Sign up
            </h2>
          </div>

          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <small className="mb-2 text-red-800 font-lg font-semibold">
                {authErr && authErr}
              </small>
              <form onSubmit={handleSubmit}>
                <div>
                  <label
                    for="name"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      type="text"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      className={`rounded-md shadow-sm appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 
                ${
                  errors.name
                    ? ` focus:border-red-700`
                    : ` focus:border-green-700`
                }`}
                    />
                    <small className="block text-red-700">
                      {errors && errors.name && touched.name && errors.name}
                    </small>
                  </div>
                </div>

                <div className="mt-6">
                  <label
                    for="email"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1 ">
                    <input
                      id="email"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className={`rounded-md shadow-sm appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5
                ${
                  errors.email
                    ? ` focus:border-red-700`
                    : ` focus:border-green-700`
                }`}
                    />
                    <small className="block text-red-700">
                      {errors && errors.email && touched.email && errors.email}
                    </small>
                  </div>
                </div>

                <div className="mt-6">
                  <label
                    for="password"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      className={`rounded-md shadow-sm appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 
                      ${
                        errors.password
                          ? ` focus:border-red-700`
                          : ` focus:border-green-700`
                      }`}
                    />

                    <small className="block text-red-700">
                      {errors &&
                        errors.password &&
                        touched.password &&
                        errors.password}
                    </small>
                  </div>
                </div>

                <div className="mt-6">
                  <label
                    for="confirmPassword"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="confirmPassword"
                      type="Password"
                      name="confirmPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      className={`rounded-md shadow-sm appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 
                      ${
                        errors.confirmPassword
                          ? ` focus:border-red-700`
                          : ` focus:border-green-700`
                      }`}
                    />
                    <small className="block text-red-700">
                      {errors &&
                        errors.confirmPassword &&
                        touched.confirmPassword &&
                        errors.confirmPassword}
                    </small>
                  </div>
                </div>

                <div className="mt-6">
                  <span className="block w-full rounded-md shadow-sm">
                    <button
                      type="submit"
                      className={`${
                        isSubmitting
                          ? "cursor-not-allowed bg-gray-600 "
                          : "bg-gray-600 "
                      } w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white  hover:bg-gray-700 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out`}
                    >
                      {isSubmitting ? "signing up" : "signup"}
                    </button>
                  </span>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm leading-5"></div>
                </div>

                <div className="flex justify-center items-center pt-6 text-sm text-trello-blue">
                  <p>Already a Member?</p>
                  <span className="ml-2 text-gray-600 underline text-base hover:text-gray-800">
                    <Link to="/login">Login</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Signup;
