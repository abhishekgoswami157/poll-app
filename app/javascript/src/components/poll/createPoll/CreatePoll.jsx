import React from "react";
import { useFormik } from "formik";
// import { validateLogin } from "../../utils/validateLogic";
import Layout from "../../layout";
import CreateOption from "./CreateOption";
import pollsApi from "../../../apis/polls";
import { validateCreatePoll } from "../../../utils/validateLogic";

function CreatePoll({ history }) {
  // let [title, setTitle] = useState("")
  // let [option1, setOption1] = useState("")
  // let [option2, setOption2]
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
    validate: validateCreatePoll,

    //   onSubmit: async (values, actions) => {
    //     try {
    //       console.log("ENTERED");
    //       // setLoading(true);
    //       await authApi.login({
    //         user: {
    //           email: values.email,
    //           password: values.password,
    //         },
    //       });
    //       actions.setSubmitting(false);
    //       history.push("/");
    //     } catch (error) {
    //       history.push("/");
    //       console.log(error);
    //       // logger.error(erorr);
    //     }
    //   },
    // });

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
        // history.push("/polls/create")
        console.log(error);
        actions.setSubmitting(false);
      }
    },
  });
  return (
    <Layout>
      <section className="polls-wrapper">
        <h2 className="mt-12 mb-10 text-center text-gray-700 text-3xl font-semibold">
          Cretae Poll
        </h2>
        <div className="bg-gray-100 shadow-md px-6 py-8">
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
            {/* <div className="mb-6">
              <label
                for="option1"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Enter Option1
              </label>
              <div className="mt-1">
                <input
                  id="option1"
                  type="option1"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.option1}
                  className={`rounded-md shadow-sm rounded-md shadow-sm appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 
                  ${
                    errors.option1
                      ? ` focus:border-red-700`
                      : ` focus:border-green-700`
                  }`}
                />
                <small className="block text-red-700">
                  {errors &&
                    errors.option1 &&
                    touched.option1 &&
                    errors.option1}
                </small>
              </div>
            </div>
            <div className="mb-6">
              <label
                for="option2"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Enter Option2
              </label>
              <div className="mt-1">
                <input
                  id="option2"
                  type="option2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.option2}
                  className={`rounded-md shadow-sm rounded-md shadow-sm appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 
                  ${
                    errors.option2
                      ? ` focus:border-red-700`
                      : ` focus:border-green-700`
                  }`}
                />
                <small className="block text-red-700">
                  {errors &&
                    errors.option2 &&
                    touched.option2 &&
                    errors.option2}
                </small>
              </div>
            </div>
            <div className="mb-6">
              <label
                for="option3"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Enter Option3
              </label>
              <div className="mt-1">
                <input
                  id="option3"
                  type="option3"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.option3}
                  className={`rounded-md shadow-sm rounded-md shadow-sm appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 
                  ${
                    errors.option3
                      ? ` focus:border-red-700`
                      : ` focus:border-green-700`
                  }`}
                />
                <small className="block text-red-700">
                  {errors &&
                    errors.option3 &&
                    touched.option3 &&
                    errors.option3}
                </small>
              </div>
            </div>
            <div className="mb-6">
              <label
                for="option4"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Enter Option4
              </label>
              <div className="mt-1">
                <input
                  id="option4"
                  type="option4"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.option4}
                  className={`rounded-md shadow-sm rounded-md shadow-sm appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 
                  ${
                    errors.option4
                      ? ` focus:border-red-700`
                      : ` focus:border-green-700`
                  }`}
                />
                <small className="block text-red-700">
                  {errors &&
                    errors.option4 &&
                    touched.option4 &&
                    errors.option4}
                </small>
              </div>
            </div> */}

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
                  // disabled={isSubmitting}
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
