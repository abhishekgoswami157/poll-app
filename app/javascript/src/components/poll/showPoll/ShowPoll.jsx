import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import pollsApi from "../../../apis/polls";
import Poll from "../../dashboard/Poll";
import Layout from "../../layout";
import PageLoader from "../../PageLoader";
import Options from "./Options";

function ShowPoll() {
  const { id } = useParams();
  let [poll, setPoll] = useState(null);
  let [pollOptions, setPollOptions] = useState(null);
  // let [currentUser, setCurrentUser] = useState(null);

  async function fetchPoll() {
    try {
      const response = await pollsApi.show(id);
      console.log(response.data.poll);
      setPoll(response.data.poll);
      setPollOptions(response.data.options);
      // setCurrentUser(response.data.current_user);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log("entered useeffect");
    fetchPoll();
  }, []);

  if (!poll || !pollOptions) {
    return <PageLoader />;
  }
  return (
    <Layout>
      <section className="polls-wrapper">
        <h2 className="font-semibold text-4xl mt-16 text-center p-1 text-gray-600">
          Vote Now
        </h2>
        <div className="mt-4 py-8 px-6 bg-gray-100 shadow-md rounded">
          <p className="font-semibold text-lg text-gray-800 ml-32">
            {poll.title}
          </p>
          <Options
            poll={poll}
            pollOptions={pollOptions}
            setPollOptions={setPollOptions}
            fetchPoll={fetchPoll}
          />
        </div>
      </section>
    </Layout>
  );
}

export default ShowPoll;
