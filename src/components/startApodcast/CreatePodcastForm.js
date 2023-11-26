import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../common/input/Input";
import Button from "../common/button/Button";
import FileInput from "../common/input/FileInput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const CreatePodcastForm = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (title && desc && displayImage && bannerImage) {
      setLoading(true);
      try {
        const bannerImageRef = ref(
          storage,
          `podcast/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(bannerImageRef, bannerImage);
        const bannerImageUrl = await getDownloadURL(bannerImageRef);
        toast.success("Banner Image Uploded");

        const displayImageRef = ref(
          storage,
          `podcast/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(displayImageRef, displayImage);
        const displayImageUrl = await getDownloadURL(displayImageRef);
        toast.success("Display Image Uploded");
        // console.log(bannerImageUrl);
        setLoading(false);
        const podcastData = {
          title: title,
          description: desc,
          bannerImage: bannerImageUrl,
          displayImage: displayImageUrl,
          createdBy: auth.currentUser.uid,
        };
        const docRef = await addDoc(collection(db, "podcast"), podcastData);
        setTitle("");
        setDesc("");
        setBannerImage(null);
        setDisplayImage(null);
        toast.success("podcast created");
      } catch (error) {
        toast.error(error.message);
        console.log(error);
        setLoading(false);
      }
    } else {
      toast.error("please enter all values");
    }
  };
  const displayImageHandle = (file) => {
    setDisplayImage(file);
  };
  const bannerImageHandle = (file) => {
    setBannerImage(file);
  };

  return (
    <>
      <Input
        state={title}
        setState={setTitle}
        placeholder="Enter podcast name"
        type="text"
        required={true}
      />
      <Input
        state={desc}
        setState={setDesc}
        placeholder="Describe your podcast"
        type="text"
        required={true}
      />
      <FileInput
        accept={"image/*"}
        id="display-image-input"
        fileHandelFnc={displayImageHandle}
        text={"Upload display image"}
      />
      <FileInput
        accept={"image/*"}
        id="banner-image-input"
        fileHandelFnc={bannerImageHandle}
        text={"Upload banner image"}
      />
      <Button
        text={loading ? "Loading..." : "Create Podcast"}
        disabled={loading}
        onClick={handleSubmit}
      />
    </>
  );
};

export default CreatePodcastForm;
