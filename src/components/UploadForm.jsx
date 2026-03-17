import { useState } from "react";
import axios from "axios";

import "../App.css";

function UploadForm() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    setLoading(true);

    const res = await axios.post("https://csv-node-backend.onrender.com/", formData);

    setResult(res.data);

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>CSV Sales Processor</h1>

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button onClick={uploadFile}>Upload CSV</button>

        {loading && <p>Processing CSV...</p>}

        {result && (
          <div>
            <p>Departments: {result.departments}</p>

            <p>Processing Time: {result.processingTime}</p>

            <a href={result.downloadUrl}>Download Result</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadForm;
