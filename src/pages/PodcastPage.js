import React, { useEffect, useState } from "react";
import Header from "../components/common/header/Header";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setPodcasts } from "../slices/podcastSlice";
import PodcastCard from "../components/common/podcasts/podcastCard/PodcastCard";
import Input from "../components/common/input/Input";

const PodcastPage = () => {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcast")),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(podcastsData));
      },
      (error) => {
        console.error("Error featching poadcasts:", error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  const filteredPodcast = podcasts.filter((item) =>
    item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
  );
  return (
    <>
      <Header />
      <div className="input-wrapper" style={{ marginTop: "0.5rem" }}>
        <h1>Podcasts</h1>
        <Input
          state={search}
          setState={setSearch}
          placeholder="Search by title"
          type="text"
        />
        {filteredPodcast.length > 0 ? (
          <div className="podcast-flex" style={{ marginTop: "1.5rem" }}>
            {filteredPodcast.map((item) => {
              return (
                <PodcastCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  displayImage={item.displayImage}
                />
              );
            })}
          </div>
        ) : (
          <p>{search ? "Podcast not found" : "NO PODCASTES AVILABLE"}</p>
        )}
        
      </div>
    </>
  );
};

export default PodcastPage;
