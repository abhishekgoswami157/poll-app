import { has } from "ramda";
import React, { useEffect, useState } from "react";
import votesApi from "../../../apis/votes";

export default function Options({
  poll,
  pollOptions,
  setPollOptions,
  fetchPoll,
}) {
  console.log(pollOptions, "Options in poll");
  let [hasVoted, setHasVoted] = useState(false);
  let [totalVote, setTotalVote] = useState(0);

  let [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    let sum = pollOptions.reduce((acc, option) => {
      acc += option.vote_count;
      return acc;
    }, 0);
    console.log(sum, "TOTALVOTE");
    setTotalVote(sum);
  }, [pollOptions]);

  async function fetchVotes(option) {
    console.log(option.id);
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
      // if (!hasVoted) {
      //   let updatedOptions = pollOptions.map((opt) => {
      //     if (opt.id == option.id) {
      //       opt.vote_count += 1;
      //     }
      //     return opt;
      //   });
      //   setPollOptions(updatedOptions);
      //   setHasVoted(true);
      // }
    } catch (error) {
      console.log("called in catch");
      console.log(error);
    }
  }

  function handleVote(option, e) {
    setIsFocus(true);
    return fetchVotes(option);
  }

  function convertVotesToPercentage(option) {
    // let totalVote = pollOptions.reduce((acc, option) => {
    //   acc += option.vote_count;
    //   return acc;
    // }, 0);
    let percentageVotes = (option.vote_count / totalVote) * 100;
    return Math.round(percentageVotes * 100) / 100;
  }

  return (
    <div class="p-8 flex justify-center">
      <div class="w-full max-w-xl mx-auto">
        <fieldset>
          <ul
            class="space-y-4"
            role="radiogroup"
            aria-labelledby="radiogroup-label"
          >
            {/* <li
              id="radiogroup-option-0"
              tabindex="0"
              role="radio"
              aria-checked="true"
              class="group relative bg-white rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <div class="rounded-lg border border-gray-300 bg-white px-6 py-4 hover:border-gray-400 sm:flex sm:justify-between">
                <div class="flex items-center">
                  <div class="text-sm">
                    <p class="font-medium text-gray-900">Hobby</p>
                    <div class="text-gray-500">
                      <p class="sm:inline">8GB / 4 CPUs</p>
                      <span class="hidden sm:inline sm:mx-1" aria-hidden="true">
                        ·
                      </span>
                      <p class="sm:inline">160 GB SSD disk</p>
                    </div>
                  </div>
                </div>
                <div class="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right">
                  <div class="font-medium text-gray-900">$40</div>
                  <div class="ml-1 text-gray-500 sm:ml-0">/mo</div>
                </div>
              </div>
              <div
                class="border-indigo-500 absolute inset-0 rounded-lg border-2 pointer-events-none"
                aria-hidden="true"
              ></div>
            </li> */}

            {pollOptions?.map((option) => {
              console.log(option, "option contents");
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
                      {/* <div className="ml-1 text-gray-500 sm:ml-0">/mo</div> */}
                    </div>
                  </div>
                  <div
                    className="border-transparent absolute inset-0 rounded-lg border-2 pointer-events-none"
                    aria-hidden="true"
                  ></div>
                </li>
              );
            })}

            {/* <li
                id="radiogroup-option-2"
                tabindex="-1"
                role="radio"
                aria-checked="false"
                className="group relative bg-white rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <div class="rounded-lg border border-gray-300 bg-white px-6 py-4 hover:border-gray-400 sm:flex sm:justify-between">
                  <div class="flex items-center">
                    <div class="text-sm">
                      <p class="font-medium text-gray-900">Business</p>
                      <div class="text-gray-500">
                        <p class="sm:inline">16GB / 8 CPUs</p>
                        <span class="hidden sm:inline sm:mx-1" aria-hidden="true">
                          ·
                        </span>
                        <p class="sm:inline">512 GB SSD disk</p>
                      </div>
                    </div>
                  </div>
                  <div class="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right">
                    <div class="font-medium text-gray-900">$160</div>
                    <div class="ml-1 text-gray-500 sm:ml-0">/mo</div>
                  </div>
                </div>
                <div
                  class="border-transparent absolute inset-0 rounded-lg border-2 pointer-events-none"
                  aria-hidden="true"
                ></div>
              </li>
  
              <li
                id="radiogroup-option-3"
                tabindex="-1"
                role="radio"
                aria-checked="false"
                class="group relative bg-white rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <div class="rounded-lg border border-gray-300 bg-white px-6 py-4 hover:border-gray-400 sm:flex sm:justify-between">
                  <div class="flex items-center">
                    <div class="text-sm">
                      <p class="font-medium text-gray-900">Enterprise</p>
                      <div class="text-gray-500">
                        <p class="sm:inline">32GB / 12 CPUs</p>
                        <span class="hidden sm:inline sm:mx-1" aria-hidden="true">
                          ·
                        </span>
                        <p class="sm:inline">1024 GB SSD disk</p>
                      </div>
                    </div>
                  </div>
                  <div class="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right">
                    <div class="font-medium text-gray-900">$240</div>
                    <div class="ml-1 text-gray-500 sm:ml-0">/mo</div>
                  </div>
                </div>
                <div
                  class="border-transparent absolute inset-0 rounded-lg border-2 pointer-events-none"
                  aria-hidden="true"
                ></div>
              </li> */}
          </ul>
        </fieldset>
      </div>
    </div>
  );
}
