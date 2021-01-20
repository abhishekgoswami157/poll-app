import axios from "axios";
import { either, isEmpty, isNil } from "ramda";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pollsApi from "../../apis/polls";
import Layout from "../layout";
import PageLoader from "../PageLoader";
import Poll from "./Poll";
// import polls from "../data/polls";

function Dashboard() {
  let [polls, setPolls] = useState([]);
  let [currentUser, setCurrentUser] = useState(null);
  let [loading, setLoading] = useState(true);
  // console.log(currentUser);
  async function fetchPolls() {
    try {
      const response = await pollsApi.list();
      // console.log(response);
      setPolls(response.data.polls);
      setCurrentUser(response.data.current_user);
      setLoading(false);
    } catch (error) {
      // logger.error(error);
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    // console.log("USE EFFECT CALLED");
    fetchPolls();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  if (!either(isNil, isEmpty)(polls)) {
    return (
      <Layout currentUser={currentUser} setCurrentUser={setCurrentUser}>
        <section className="polls-wrapper">
          <div>
            <Link to="/polls/create">
              <button className="btn mt-8">Create Polls</button>
            </Link>
            <h2 className="font-semibold text-2xl mt-10 bg-gray-200 p-1">
              All Polls
            </h2>
            {polls.map((poll) => {
              return <Poll poll={poll} />;
            })}
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-xl leading-5 text-center">
        You have no polls to show 😔
      </h1>
    </Layout>
  );
}

export default Dashboard;
