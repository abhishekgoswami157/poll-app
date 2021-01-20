import React from "react";
function CreateOption({
  handleBlur,
  handleChange,
  errors,
  values,
  touched,
  no,
}) {
  let option = "option" + no;
  return (
    <div className="mb-6">
      <label
        for={option}
        className="block text-sm font-medium leading-5 text-gray-700"
      >
        Enter {option}
      </label>
      <div className="mt-1">
        <input
          id={option}
          type="text"
          name={option}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.option}
          className={`rounded-md shadow-sm rounded-md shadow-sm appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 
                  ${
                    errors.option
                      ? ` focus:border-red-700`
                      : ` focus:border-green-700`
                  }`}
        />
        <small className="block text-red-700">
          {errors && errors.option && touched.option && errors.option}
        </small>
      </div>
    </div>
  );
}

export default CreateOption;
