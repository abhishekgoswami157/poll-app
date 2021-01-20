import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import Layout from "../../layout";
import CreateOption from "./CreateOption";
import pollsApi from "../../../apis/polls";
import { validateCreatePoll } from "../../../utils/validateLogic";
import UserContext from "../../Context/UserContext";
import Errors from "../../../utils/Errors";

function CreatePoll({ history }) {
  let context = useContext(UserContext);
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
      title: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
    },
    // validate: validateCreatePoll,

    onSubmit: async (values, actions) => {
      try {
        await pollsApi.create({
          poll: {
            title: values.title,
            options_attributes: [
              { name: values.option1 },
              { name: values.option2 },
              { name: values.option3 },
              { name: values.option4 },
            ],
          },
        });
        actions.setSubmitting(false);
        history.push("/");
      } catch (error) {
        setAuthErr(error?.response?.data?.errors);
        actions.setSubmitting(false);
      }
    },
  });
  return (
    <Layout
      currentUser={context.currentUser}
      setCurrentUser={context.setCurrentUser}
    >
      <section className="polls-wrapper">
        <h2 className="mt-12 mb-10 text-center text-gray-700 text-3xl font-semibold">
          Cretae Poll
        </h2>

        <div className="bg-gray-100 shadow-md px-6 py-8">
          {authErr ? <Errors authErr={authErr} /> : ""}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                for="title"
                className="block text-sm font-semibold font-medium leading-5 text-gray-700"
              >
                Title
              </label>
              <div className="mt-1">
                <input
                  id="title"
                  type="title"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  className={`rounded-md shadow-sm rounded-md shadow-sm appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 
                  ${
                    errors.title
                      ? ` focus:border-red-700`
                      : ` focus:border-green-700`
                  }`}
                />
                <small className="block text-red-700">
                  {errors && errors.title && touched.title && errors.title}
                </small>
              </div>
            </div>

            <CreateOption
              handleBlur={handleBlur}
              handleChange={handleChange}
              values={values}
              errors={errors}
              touched={touched}
              no={1}
            />
            <CreateOption
              handleBlur={handleBlur}
              handleChange={handleChange}
              values={values}
              errors={errors}
              touched={touched}
              no={2}
            />
            <CreateOption
              handleBlur={handleBlur}
              handleChange={handleChange}
              values={values}
              errors={errors}
              touched={touched}
              no={3}
            />
            <CreateOption
              handleBlur={handleBlur}
              handleChange={handleChange}
              values={values}
              errors={errors}
              touched={touched}
              no={4}
            />

            <div className="mt-8">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  className={`${
                    isSubmitting
                      ? "cursor-not-allowed bg-gray-700"
                      : "bg-gray-700"
                  } w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white  hover:bg-gray-800 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out`}
                >
                  {isSubmitting ? "Creating Poll" : "Create Poll"}
                </button>
              </span>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}

export default CreatePoll;
