import axios from "axios";

const show = () => axios.get("/user");

const usersApi = {
  show,
};

export default usersApi;
