import React from "react";

const Response = ({sentiment, getEmotionImage})=>{
    return(
        <main className="response-div">
            <img src={require(`${getEmotionImage()}`)} alt="emotion_img" />
            <h2>Text: {sentiment.text}</h2>
            <h2>Text Status: {sentiment.sentiment}</h2>
        </main>
    )
}

export default Response;