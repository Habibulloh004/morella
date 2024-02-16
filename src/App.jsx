import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setInterval(async () => {
          const response = await axios.get("https://morella.replit.app/");
          setData(response.data);
        }, 3000);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (!data || data === null || !data.set1) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex-container">
      <section className="section-half-first">
        <div className="sentence">
          <span className="word">Tayyorlanyapti |</span>
          <span className="word"> Готовиться</span>
        </div>
        <ul className="ul-text-center">
          {data.set1.map((item, idx) => (
            <li className="bg-blue" key={idx}>
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className="section-half-second">
        <div className="sentence">
          <span className="word">Tayyor |</span>
          <span className="word"> Готов</span>
        </div>
        <ul className="ul-text-center">
          {data.set2.map((item, idx) => (
            <li className="bg-blue" key={idx}>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
