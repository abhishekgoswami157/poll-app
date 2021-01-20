import React from "react";
import { Link } from "react-router-dom";

function Poll({ poll }) {
  return (
    <div className="pt-6 py-6 border-b-2 border-gray-200">
      <h3 className="font-semibold text-sm">{poll.title}</h3>
      <Link
        to={`/polls/${poll.id}`}
        exact
        className="text-red-500 font-semibold text-sm"
      >
        Vote Now {" >>"}
      </Link>
    </div>
  );
}

export default Poll;
