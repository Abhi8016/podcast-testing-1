import React from "react";
import Header from "../components/common/header/Header";
import CreatePodcastFrom from "../components/startApodcast/CreatePodcastForm";

const CreateAPodcast = () => {
  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>Create a Podcast</h1>
        <CreatePodcastFrom />
      </div>
    </div>
  );
};

export default CreateAPodcast;
