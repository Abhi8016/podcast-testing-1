import React from "react";
import Button from "../../button/Button";

const EpisodDetails = ({ index, title, description, audioFile, onClick }) => {
  return (
    <div style={{width:"100%"}}>
      <h1 style={{ marginBottom: "0", textAlign: "left" }}>{index}. {title}</h1>
      <p className="podcast-description" style={{marginLeft: "1rem"}}>{description}</p>
      <Button
        text={"Play"}
        onClick={() => onClick(audioFile)}
        width={"200px"}
      />
    </div>
  );
};

export default EpisodDetails;
