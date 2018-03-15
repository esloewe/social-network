import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function ProfilePicUpload(props) {
    function upload(e) {
        console.log(e.target, e.target.files);
        var fd = new FormData();
        fd.append("file", e.target.files[0]);
        axios.post("/upload", fd).then(resp => {
            props.setNewImage(resp.data.profilePic);
        });
    }
    return (
        <div>
            <p>X</p>
            <h4>want to change your profile picture?</h4>
            <input type="file" onChange={upload} />
            <button onClick={props.handleSubmit}>Upload</button>
        </div>
    );
}
