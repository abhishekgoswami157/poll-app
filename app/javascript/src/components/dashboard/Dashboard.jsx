import axios from "axios";
import { either, isEmpty, isNil } from "ramda";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pollsApi from "../../apis/polls";
import UserContext from "../Context/UserContext";
import Layout from "../layout";
import PageLoader from "../PageLoader";
import Poll from "./Poll";

function Dashboard() {
  let [polls, setPolls] = useState([]);
  let context = useContext(UserContext);
  let [loading, setLoading] = useState(true);
  async function fetchPolls() {
    try {
      const response = await pollsApi.list();
      setPolls(response.data.polls);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPolls();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  if (!either(isNil, isEmpty)(polls)) {
    return (
      <Layout
        currentUser={context.currentUser}
        setCurrentUser={context.setCurrentUser}
      >
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
