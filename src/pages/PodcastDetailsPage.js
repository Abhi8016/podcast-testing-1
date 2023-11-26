import React, { useEffect, useState } from "react";
import Header from "../components/common/header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import Button from "../components/common/button/Button";
import EpisodDetails from "../components/common/podcasts/episodeDetails/EpisodDetails";
import AudioPlayer from "../components/common/podcasts/audioPlayer/AudioPlayer";

const PodcastDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState({});
  const [episode, setEpisode] = useState({});
  const [playingFile, setPlayingFile] = useState();

  const getData = async () => {
    try {
      const docRef = doc(db, "podcast", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log(docSnap.data());
        setPodcast({ id: id, ...docSnap.data() });
      } else {
        console.log("error");
        navigate("/podcasts");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcast", id, "episode")),
      (querySnapshot) => {
        const episodData = [];
        querySnapshot.forEach((doc) => {
          episodData.push({ id: doc.id, ...doc.data() });
        });
        setEpisode(episodData);
      },
      (error) => {
        console.error("Error featching poadcasts:", error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [id]);

  
  // useEffect((file) => {
  //   handleFile(file);
  // }, [playingFile])
  return (
    <div>
      <Header />
      <div className="input-wrapper" style={{ marginTop: "0rem" }}>
        {podcast.id && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <h1 className="podcast-title-heading">{podcast.title}</h1>
              {podcast.createdBy === auth.currentUser.uid && (
                <Button
                  width={"200px"}
                  text={"Create Episode"}
                  onClick={() => {
                    navigate(`/podcast/${id}/create-episode`);
                  }}
                />
              )}
            </div>

            <div className="banner-wrapper">
              <img src={podcast.bannerImage} alt="" />
            </div>
            <p className="podcast-description">{podcast.description}</p>
            <h1 className="podcast-title-heading">Episodes</h1>
            {episode.length > 0 ? (
              <>
                {episode.map((episode, index) => (
                  <EpisodDetails
                    key={index}
                    index={index + 1}
                    title={episode.title}
                    description={episode.description}
                    audioFile={episode.audioFile}
                    onClick={(file) => setPlayingFile(file)}
                  />
                ))}
              </>
            ) : (
              <p>NO EPISODES</p>
            )}
          </>
        )}
      </div>
      {playingFile && (
        <AudioPlayer audioSrc={playingFile} image={podcast.displayImage} />
      )}
    </div>
  );
};

export default PodcastDetailsPage;
