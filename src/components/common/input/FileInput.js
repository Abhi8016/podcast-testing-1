import React, { useState } from "react";
import "./style.css";
function FileInput({ accept, id, fileHandelFnc, text }) {
  const [fileSelected, setFileSelected] = useState("");
  const onChange = (e) => {
    console.log(e.target.files);
    setFileSelected(e.target.files[0].name);
    fileHandelFnc(e.target.files[0]);
  };
  return (
    <div className="file-Input">
      <label
        htmlFor={id}
        className={`custom-input ${!fileSelected ? "lable-input" : "active"}`}
      >
        {fileSelected ? `The File ${fileSelected} was Selected` : text}
      </label>
      <input
        type="file"
        accept={accept}
        id={id}
        style={{ display: "none" }}
        onChange={onChange}
      />
    </div>
  );
}

export default FileInput;
