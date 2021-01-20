import axios from "axios";
const list = () => axios.get("/api/v1/polls");

const create = (payload) => axios.post("/api/v1/polls", payload);

const show = (id) => axios.get(`/api/v1/polls/${id}`);

const pollsApi = {
  list,
  create,
  show,
};

export default pollsApi;
