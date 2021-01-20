import axios from "axios";

const create = (payload) => axios.post("/api/v1/votes", payload);

const votesApi = {
  create,
};

export default votesApi;
