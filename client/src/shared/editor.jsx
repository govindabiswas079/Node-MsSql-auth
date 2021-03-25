import React from 'react';
import SunEditor from "suneditor-react";
import axios from "axios";
import 'suneditor/dist/css/suneditor.min.css';
const Editor = ({ handleChange }) => {
    const uploader =async (file) => {
        let data = new FormData();
        data.append("image", file);
      let response= await axios.post("http://192.168.0.109/upload/image", data)
        .then(result =>result.data.data)
        .catch(err => ({errorMessage:"Something happened"+err }));
        return response;
    }
    return (
        <div>
            <SunEditor
                onChange={handleChange}
                height="50vh"
                lang="en"
                onImageUploadBefore={async(files, info, uploadHandler) => {
                    let response = await uploader(files[0]);
                    uploadHandler(response);
                }}
                setOptions={{
                    mode: "classic",
                    charCounter: true,
                    imageUploadUrl:"http://192.168.0.109/upload/image",
                    imageGalleryUrl:"http://192.168.0.109/upload/images",
                    buttonList: [
                        ["undo",
                            "redo"],
                        ["bold",
                            "underline",
                            "italic",
                            "strike",
                            "subscript",
                            "superscript",
                            "removeFormat"],
                        ["outdent",
                            "indent"],
                        ["blockquote"],
                        ["align",
                            "font",
                            "textStyle",
                            "fontColor",
                            "hiliteColor",
                            "fontSize",
                            "formatBlock",
                            "paragraphStyle"],
                        ["horizontalRule",
                            "lineHeight"],
                        ["list",
                            "table"],
                        ["image",
                            "link",
                            "video",
                            "audio"],
                            ["imageGallery"],
                            ["codeView",
                            "preview"],
                        ["showBlocks"]

                    ]
                }} placeholder="Escribe algo genial..." />
        </div>
    );
}
export default Editor;