"use client";
import { useState } from "react";
import axios from "axios";

export default function Downloader() {
  const [url, setUrl] = useState("");
  const [quality, setQuality] = useState("720p");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<null | string>(null);

  const handleDownload = async () => {
    setLoading(true);
    setProgress(0);
    setError(null);

    try {
      const response = await axios({
        url: "https://api.rapidyt.com/download",
        method: "POST",
        responseType: "blob", // Important for downloading binary data
        data: {
          url,
          quality,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onDownloadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          }
        },
      });

      if (response.headers["content-type"].includes("application/json")) {
        // Handle error response that comes as JSON
        const reader = response.data.text();
        const errorData = JSON.parse(await reader);
        throw new Error(errorData.error);
      }

      // Create a download link and trigger it
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `downloaded_video_${quality}.mp4`;
      link.click();
    } catch (err: any) {
      setError(
        err.message || err.error ||
          "Failed to download video. Please check the URL and try again."
      );
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>YouTube Video Downloader</h1>
      <input
        type="text"
        placeholder="Enter YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        disabled={loading}
      />
      <select
        value={quality}
        onChange={(e) => setQuality(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        disabled={loading}
      >
        <option value="360p">360p</option>
        <option value="480p">480p</option>
        <option value="720p">720p</option>
        <option value="1080p">1080p</option>
        <option value="1440p">1440p</option>
        <option value="2160p">2160p</option>
      </select>
      <button
        onClick={handleDownload}
        disabled={loading || !url}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: loading ? "#999" : "#0070f3",
          color: "white",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? `Downloading... ${progress}%` : "Download"}
      </button>
      {loading && (
        <div
          style={{
            marginTop: "10px",
            width: "100%",
            backgroundColor: "#e0e0e0",
            borderRadius: "4px",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "10px",
              backgroundColor: "#0070f3",
              borderRadius: "4px",
            }}
          />
        </div>
      )}
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
}
