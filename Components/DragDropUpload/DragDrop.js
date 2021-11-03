import React, { useState } from "react";
import { FileDrop } from "react-file-drop";

// const DragDrop = () => {
//   const [image, setImage] = useState(null);
//   const handleDropUpload = (files) => {
//     console.log("comes");
//     console.log(files["0"]);
//     let base64String = "";
//     const reader = new FileReader();
//     reader.readAsDataURL(files["0"]);
//     reader.onload = function () {
//       base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
//       console.log(base64String);
//     };
//   };
//   return (
//     <div>
//       <h1>React File Drop demo</h1>
//       <div>
//         <FileDrop
//           onDragOver={() => {
//             console.log("here");
//           }}
//           onDrop={(files, event) => console.log("heredrop")}
//         >
//           Drop some files here!
//         </FileDrop>
//       </div>
//     </div>
//   );
// };

export default function DragDrop() {
  const handleInputChange = () => {};

  return (
    <div
      className="dropzone"
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
      onChange={handleInputChange}
    >
      <div className="sub-header">Drag your audio file here:</div>
      <div className="draggable-container">
        <input
          type="file"
          className="file-browser-input"
          style={{ display: "none" }}
          id="drag-drop"
        />
      </div>
    </div>
  );
}

// export default DragDrop;
