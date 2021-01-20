import { has } from "ramda";
import React, { useEffect, useState } from "react";
import votesApi from "../../../apis/votes";

export default function Options({
  poll,
  pollOptions,
  setPollOptions,
  fetchPoll,
}) {
  let [hasVoted, setHasVoted] = useState(false);
  let [totalVote, setTotalVote] = useState(0);
  let [authErr, setAuthErr] = useState("");

  useEffect(() => {
    let sum = pollOptions.reduce((acc, option) => {
      acc += option.vote_count;
      return acc;
    }, 0);
    setTotalVote(sum);
  }, [pollOptions]);

  async function fetchVotes(option) {
    try {
      await votesApi.create({
        vote: {
          poll_id: poll.id,
          option_id: option.id,
        },
      });
      fetchPoll();
      if (hasVoted) {
        alert("you have alreadey voted");
      }
      setHasVoted(true);
    } catch (error) {
      setAuthErr(error?.response?.data?.errors);
    }
  }

  function handleVote(option, e) {
    return fetchVotes(option);
  }

  function convertVotesToPercentage(option) {
    let percentageVotes = (option.vote_count / totalVote) * 100;
    return Math.round(percentageVotes * 100) / 100;
  }

  return (
    <div class="p-8 flex justify-center">
      <div class="w-full max-w-xl mx-auto">
        <small className="mb-2 text-red-800 font-lg font-semibold">
          {authErr && authErr}
        </small>
        <fieldset>
          <ul
            class="space-y-4"
            role="radiogroup"
            aria-labelledby="radiogroup-label"
          >
            {pollOptions?.map((option) => {
              return (
                <li
                  id="radiogroup-option-1"
                  tabindex="-1"
                  role="radio"
                  aria-checked="true"
                  className={`group relative bg-white rounded-lg shadow-sm cursor-pointer focus:rounded-lg`}
                  onClick={(e) => {
                    handleVote(option, e);
                  }}
                >
                  <div className="rounded-lg border border-gray-300 bg-white px-6 py-4 hover:border-gray-400 sm:flex sm:justify-between">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">
                          {option.name}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right">
                      {hasVoted ? (
                        <div className="font-xl text-red-700 font-bold">
                          {convertVotesToPercentage(option)} %
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div
                    className="border-transparent absolute inset-0 rounded-lg border-2 pointer-events-none"
                    aria-hidden="true"
                  ></div>
                </li>
              );
            })}
          </ul>
        </fieldset>
      </div>
    </div>
  );
}
