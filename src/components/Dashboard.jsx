import React, { useEffect, useContext } from "react";
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";
import { GifContext } from "../context/GifContext";
import "../styles/app.scss";
import RefreshIcon from "../../public/refresh.svg";
import DashboardButton from "./DashboardButton";
import { throttleCallback } from "../utils/helpers";

const Dashboard = () => {
  const { gifData, loading, fetchGifs } = useContext(GifContext);

  useEffect(() => {
    fetchGifs();
    window.addEventListener("keydown", throttleCallback(fetchGifs, 1000));

    return () => {
      window.removeEventListener("keydown", throttleCallback(fetchGifs, 1000));
    };
  }, []);

  return (
    <div>
      <div className="dashboard">
        <h1 className="dashboard__title">Giphy</h1>
        <div className="dashboard__grid">
          {loading ? (
            <>
              {Array.from({ length: 12 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </>
          ) : (
            gifData.map((gif) => (
              <Card
                key={gif.id}
                id={gif.id}
                url={gif.url}
                import_datetime={gif.import_datetime}
              />
            ))
          )}
        </div>
        <DashboardButton
          onClick={fetchGifs}
          loading={loading}
          icon={RefreshIcon}
        />
      </div>
    </div>
  );
};

export default Dashboard;
