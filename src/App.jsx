import "./App.css";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import notice from "../src/notification.mp3";
import ReactAudioPlayer from "react-audio-player";
import ReactPlayer from "react-player";

const socket = io.connect("https://web-socket-server-8k3j.onrender.com");

function App() {
  const [recieveMsg, setRecieveMsg] = useState(null);
  const [user, setUser] = useState("");
  const [audioPlayed, setAudioPlayed] = useState(false);

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

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setAudioPlayed(true);
      setRecieveMsg(data);
      // console.log(data);
    });
  }, [socket]);

  // useEffect(() => {
  //   setAudioPlayed(true);
  //   if (recieveMsg?.music === 1) {
  //     console.log("ishlad");
  //   }
  // }, [recieveMsg]);


  // console.log(audioPlayed);
  const login = localStorage.getItem("login");

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
            <div className="sentence2">
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
            // <ReactAudioPlayer src={notice} autoPlay={audioPlayed} />
            <ReactAudioPlayer
              src={notice}
              autoPlay={audioPlayed}
              onEnded={() => {
                setAudioPlayed(false);
              }}
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
