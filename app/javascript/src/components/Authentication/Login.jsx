import { useFormik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import authApi from "../../apis/auth";
import { validateLogin } from "../../utils/validateLogic";
import Layout from "../layout";

function Login({ history }) {
  let [authErr, setAuthErr] = useState("");

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
    validate: validateLogin,
    onSubmit: async (values, actions) => {
      try {
        console.log("ENTERED");
        // setLoading(true);
        await authApi.login({
          user: {
            email: values.email,
            password: values.password,
          },
        });
        actions.setSubmitting(false);
        history.push("/");
      } catch (error) {
        history.push("/");
        console.log(error);
        // logger.error(erorr);
      }
    },
  });

  return (
    <Layout>
      <section className="bg-gray-50 h-screen">
        <div className="pt-20 flex flex-col justify-center sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md flex justify-center">
            {/* <img
      className="w-32 h-32"
      src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/76ceb1faa939ede03abacb6efacdde16/trello-logo-blue.svg"
      alt="trello-logo"
    /> */}
            <h2 className="text-4xl font-semibold text-gray-800 mb-4">
              Log in
            </h2>
          </div>

          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form onSubmit={handleSubmit}>
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
                      {(errors &&
                        errors.email &&
                        touched.email &&
                        errors.email) ||
                        authErr}
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
                      // type={showPassword ? "text" : "password"}
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
                    {/* {showPassword ? (
              <HidePassword setShowPassword={setShowPassword} />
            ) : (
              <ShowPassword setShowPassword={setShowPassword} />
            )} */}
                    <small className="block text-red-700">
                      {errors &&
                        errors.password &&
                        touched.password &&
                        errors.password}
                    </small>
                  </div>
                </div>

                {/* <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <label
                    for="remember_me"
                    className="ml-2 block text-sm leading-5 text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm leading-5">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div> */}

                <div className="mt-6">
                  <span className="block w-full rounded-md shadow-sm">
                    <button
                      type="submit"
                      className={`${
                        isSubmitting
                          ? "cursor-not-allowed bg-dark-green "
                          : "bg-gray-600 "
                      } w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white  hover:bg-gray-700 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out`}
                    >
                      {isSubmitting ? "Logging in" : "log in"}
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
                  <span className="ml-2 text-gray-600 underline text-base hover:text-gray-700">
                    <Link to="/signup">Signup</Link>
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

export default Login;
