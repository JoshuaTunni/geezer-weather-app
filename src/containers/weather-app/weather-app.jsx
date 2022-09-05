import { useState, useEffect, useRef } from "react";

import axios from "axios";

import { DisplayContext } from "components/display-context/display-context";
import { SearchBar } from "components/search-bar/search-bar";
import { DisplayContent } from "components/display-content/display-content";
import { errorData } from "assets/prepared-data/error-msg";
import { extractedContent } from "assets/prepared-data/extracted-content";

import "assets/styles/reset.css";
import "assets/styles/global/global.css";
import styles from "containers/weather-app/weather-app.module.css";

export const WeatherApp = () => {
  const isFirstRender = useRef(true);

  const [data, setData] = useState({});
  const [city, setCity] = useState("london");

  useEffect(() => {
    if (city === "" || city.trim().length === 0) {
      return;
    }

    const fetchData = async () => {
      axios
        .get(`http://localhost:8000/weather/?city=${city}`)
        .then((response) => {
          for (const type in extractedContent) {
            if (type.includes(response.data.weather[0].main)) {
              const weatherType = extractedContent[type];
              const randComment = Math.floor(
                Math.random() * weatherType.comments.length
              );

              setData({
                date: new Date(response.data.dt * 1000).toLocaleDateString(
                  "en-GB"
                ),
                location: response.data.name + ", " + response.data.sys.country,
                temp: Math.round(response.data.main.temp),
                type: weatherType.type,
                comment: weatherType.comments[randComment],
                link: weatherType.link,
              });

              break;
            }
          }

          setCity("");
          console.log(response.data);
        })
        .catch((error) => {
          setData(errorData);
        });
    };

    if (isFirstRender.current) {
      isFirstRender.current = false;
      fetchData();

      return;
    }

    const timer = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => {
      // clear if user still typing
      clearTimeout(timer);
    };
  }, [city]);

  if (isFirstRender.current) {
    return <h1>Loading...</h1>;
  }

  return (
    <article className={styles.container}>
      <div className={["pad-inline", styles.flex].join(" ")}>
        <DisplayContext date={data.date} location={data.location} />
        <SearchBar currentCity={city} changeCity={setCity} />
      </div>
      <DisplayContent
        temp={data.temp}
        type={data.type}
        comment={data.comment}
        link={data.link}
      />
    </article>
  );
};
