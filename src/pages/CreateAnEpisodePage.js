import React, { useState } from "react";
import Header from "../components/common/header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Input from "../components/common/input/Input";
import FileInput from "../components/common/input/FileInput";
import Button from "../components/common/button/Button";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const CreateAnEpisodePage = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [audioFile, setAudioFile] = useState();
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const audioFileHandle = async (file) => {
    setAudioFile(file);
  };

  const handleSubmit = async () => {
    if (title && desc && audioFile && id) {
      setloading(true);
      try {
        const audioRef = ref(
          storage,
          `podcast-episode/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(audioRef, audioFile);

        const audioUrl = await getDownloadURL(audioRef);
        const episodeData = {
          title: title,
          description: desc,
          audioFile: audioUrl,
        };
        await addDoc(collection(db, "podcast", id, "episode"), episodeData);
        setloading(false);
        toast.success("Episode has been uploaded")
        navigate(`/podcast/${id}`)
        setTitle('')
        setDesc('')
        setAudioFile();
      } catch (e) {
        toast.error(e.message);
        setloading(false);
      }
    } else {
      toast.warning("Please Enter all Fields");
      setloading(false);
    }
  };
  

  return (
    <>
      <Header />
      <div className="input-wrapper">
        <h1>Create an episode</h1>
        <Input
          state={title}
          setState={setTitle}
          placeholder="Enter episode title"
          type="text"
          required={true}
        />
        <Input
          state={desc}
          setState={setDesc}
          placeholder="Description"
          type="text"
          required={true}
        />
        <FileInput
          accept={"audio/*"}
          id="audio-file-input"
          fileHandelFnc={audioFileHandle}
          text={"Upload audio file"}
        />
        <Button
          text={loading ? "Loading..." : "Create Episode"}
          disabled={loading}
          onClick={handleSubmit}
        />
      </div>
    </>
  );
};

export default CreateAnEpisodePage;
