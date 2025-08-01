"use client";
import Image from "next/image";
import image from "@/public/joke-pic.jpg"; // Ensure this path is correct
import { useState, useEffect } from "react";

export default function Home() {
  const [joke, setJoke] = useState({});
  const [showJoke, setShowJoke] = useState(false);

  const apiUrl = "https://official-joke-api.appspot.com/random_joke";
  const fetchJoke = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jokeData = await response.json();
      console.log(jokeData);

      setJoke(jokeData);
    } catch (error) {
      console.error("Error fetching joke:", error);
      alert("Failed to fetch a joke. Please try again later.");
    }
  };
  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <>
      <div className="flex mt-14 items-center justify-center">
        <div className="flex-col bg-blue-50 border-2 sm:w-[50%] sm:h-[50%] w-full p-3  ">
          <h1 className="text-2xl font-bold text-center my-8  ">
            Random Jokes Generator
          </h1>
          <div className="flex justify-center mb-8">
            <Image
              className="rounded-full shadow-lg"
              src={image}
              alt="Joke Icon"
              width={300}
              height={300}
              placeholder="blur"
              blurDataURL=""
            />
          </div>
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold mb-2">{joke.setup} </h2>
            {showJoke ? (
              <div>
                <p className="text-2xl">{joke.punchline}</p>
                <button
                  onClick={() => setShowJoke(false)}
                  className="bg-foreground text-white px-4 py-2 rounded hover:shadow-lg"
                >
                  Hide Answer
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowJoke(true)}
                className="bg-foreground text-white px-4 py-2 rounded hover:shadow-lg"
              >
                Show Answer
              </button>
            )}
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={() => {
                setShowJoke(false);
                fetchJoke();
              }}
              className="bg-foreground text-white px-4 py-2 rounded hover:shadow-lg "
            >
              Next
            </button>
          </div>
          <p className="text-lg text-center">
            Click the button to get a random joke!
          </p>
        </div>
      </div>
    </>
  );
}
