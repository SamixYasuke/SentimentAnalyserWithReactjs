import React, { useState } from "react";
import "./App.css";
import Axios from "axios";
import Response from "./Response";
import Loader from "./Loader";
import Error from "./Error";

const App = () => {
  const positive_img = "./Assets/DALL·E 2023-07-21 12.58.45.png";
  const negative_img = "./Assets/negative gif.png";
  const neutral_img = "./Assets/neutal emoji.jpg";

  const [input, setInput] = useState("");
  const [sentiment, setSentiment] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleGetSentiment = async () => {
    setLoader(true);
    setSentiment(null);
    const apiKey = 'HP9r7jHtOMuqg4pe7NY1Ig==2V1iCTCutkI4ZZeN';
    const apiUrl = `https://api.api-ninjas.com/v1/sentiment?text=${encodeURIComponent(input)}`;
    try {
      const response = await Axios.get(apiUrl, {
        headers: {
          'X-Api-Key': apiKey
        }
      });
      setSentiment(response.data);
      setInput("");
      setLoader(false);
      setError(false);
    } catch (error) {
      setError(true);
      setSentiment(null);
      setLoader(null);
      console.error('Request failed:', error.message);
    }
  };

  const getEmotionImage = () => {
    if (sentiment.sentiment === "POSITIVE") {
      return positive_img;
    } else if (sentiment.sentiment === "NEGATIVE") {
      return negative_img;
    } else {
      return neutral_img;
    }
  };

  return (
    <>
      <h1>SAMIXX SENTIFY</h1>
      {sentiment && <Response sentiment={sentiment} getEmotionImage ={getEmotionImage}/>}
      {loader && <Loader/>}
      {error && <Error />}
      <div className="submit-div">
        <textarea
          cols="70"
          rows="6"
          placeholder="Enter a text here"
          onChange={handleInput}
          value={input}
        ></textarea>
        <button onClick={handleGetSentiment}>Check</button>
      </div>
    </>
  );
};

export default App;
