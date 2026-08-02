import React, { useState } from "react";
import "./App.css";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [showShortId, setShowShortId] = useState(true);
  const [shortLink, setShortLink] = useState("");

  const handleShorten = async () => {
    if (!originalUrl) {
      return;
    }
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    try {
      const res = await axios.post(`${BASE_URL}/url/shorten`, {
        //Agar backend response ka status code 4xx ya 5xx ho (jaise 400, 401, 404, 409, 500), to axios automatically catch block chalayega — chahe response ke andar valid JSON data ho ya na ho.
        originalUrl: originalUrl,
      });
      setShortLink(res.data.shortUrl);
      setShowShortId(false);
    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.message || "Something went wrong", {
        className: "custom-toast-fail",
      });
    }
  };
  const copyHandler = () => {
    try {
      navigator.clipboard.writeText(shortLink); // line for copying the text inside the given file (shortLinnk)
      toast.success("Copied to Clipboard", {
        className: "custom-toast",
        style: {
          width: "450px",
          height: "40px",
          backgroundColor: "green",
          fontSize: "15px",
          fontFamily: "Press Start 2P , Arial",
        },
      });
    } catch (err) {
      console.log(error);
    }
  };

  return (
    <div className="landingDiv">
      {showShortId ? (
        <>
          <p>URL SHORTNER</p>
          <div className="urlInputButtonContainer">
            <input placeholder="Enter URL"
              type="text"
              onChange={(e) => setOriginalUrl(e.target.value)}  // always remember div ya <> </> use krna h condition wali return statement pe.
            />
            <button onClick={handleShorten}>Shorten</button>
          </div>
        </>
      ) : (
        <div className="secCard">
          <p>Your Short Link:</p>
          <div className="linkDiv">
            <input className="shortLink" value={shortLink} readOnly/>
            <button className="copyButton" onClick={copyHandler}>
              copy
            </button>
          </div>
          <div className="qrContainer">
            <p>Scan QR Code:</p>
            <QRCodeCanvas value={shortLink} />
          </div>
          <button className="DownloadQrButton">Download QR Code</button>
        </div>
      )}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default App;
