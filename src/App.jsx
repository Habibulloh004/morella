import "./App.css";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import notice from "../src/notification.mp3";
import ReactAudioPlayer from "react-audio-player";
import ReactPlayer from "react-player";

const socket = io.connect("https://web-socket-server-8k3j.onrender.com");

function App() {
  const [recieveMsg, setRecieveMsg] = useState(null);
  const [user, setUser] = useState("");
  const [audioPlayed, setAudioPlayed] = useState(false);
  const audioPlayerRef = useRef(null);

  const joinRoom = () => {
    if (user !== "") {
      socket.emit("join_room", user);
      localStorage.setItem("login", JSON.stringify(user));
    }
  };

  useEffect(() => {
    const getUser = localStorage.getItem("login");
    socket.emit("join_room", getUser);
  }, []);

  const click = () => setAudioPlayed(true);
  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setRecieveMsg(data);
      // console.log("res",data);
    });

  }, [socket]);

  useEffect(() => {
    socket.on("music_recieve_message", (data) => {
      click();
      // console.log("mus",data);
    });
  }, [socket]);

  // useEffect(() => {
  //   if (recieveMsg?.music === 1) {
  //     // Ensure audioPlayed is true
  //     // Try ReactAudioPlayer playback (if used)
  //     if (audioPlayerRef.current) {
  //       try {
  //         setAudioPlayed(true)
  //         audioPlayerRef.current.play(); // Attempt to play
  //       } catch (error) {
  //         console.error("ReactAudioPlayer error:", error);
  //       }
  //     } else {
  //       console.warn("ReactAudioPlayer ref not available");
  //     }
  //   }
  // }, [recieveMsg, audioPlayed, audioPlayerRef]);

  // console.log(audioPlayed);
  const login = localStorage.getItem("login");

  // console.log(audioPlayed);
  return (
    <main className="flex-container">
      {!login && (
        <div className="loginCont">
          <input
            placeholder="Room..."
            onChange={(e) => setUser(e.target.value)}
          />
          <button onClick={joinRoom}>Join room</button>
        </div>
      )}
      {login && (
        <>
          <section className="section-half-first">
            <div className="sentence1">
              <span className="word1">Tayyorlanyapti |</span>
              <span className="word1"> Готовиться</span>
            </div>
            <ul className="ul-text-center1">
              {recieveMsg &&
                recieveMsg.list_1 &&
                recieveMsg.list_1.map(
                  (item, idx) =>
                    item !== undefined && (
                      <li className="bg-blue1" key={idx}>
                        {item}
                      </li>
                    )
                )}
            </ul>
          </section>
          <section className="section-half-second">
            <div
              onClick={() => setAudioPlayed(true)}
              style={{ cursor: "pointer" }}
              className="sentence2"
            >
              <span className="word2">Tayyor |</span>
              <span className="word2"> Готов</span>
            </div>
            <ul className="ul-text-center2">
              {recieveMsg &&
                recieveMsg.list_2 &&
                recieveMsg.list_2.map(
                  (item, idx) =>
                    item !== undefined && (
                      <li className="bg-blue2" key={idx}>
                        {item}
                      </li>
                    )
                )}
            </ul>
          </section>
          {audioPlayed && (
            <ReactAudioPlayer
              ref={audioPlayerRef} // Add ref for later control
              src={notice}
              autoPlay={audioPlayed}
              onEnded={() => {
                setAudioPlayed(false);
              }}
              // Include error handling
              onError={(error) => console.error("Audio error:", error)}
            />
            // <ReactAudioPlayer
            //   src={notice}
            //   autoPlay
            //   onEnded={handleAudioEnded}
            // />
            // <audio src={notice} autoPlay={audioPlayed} onEnded={() => setAudioPlayed(false)} />
          )}
        </>
      )}
    </main>
  );
}

export default App;
