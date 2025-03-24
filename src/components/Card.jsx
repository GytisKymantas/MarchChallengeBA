import React, { useState } from "react";
import "../styles/app.scss";
import LockIcon from "../../public/lock.svg";
import {
  removeLocalStorageItem,
  setLocalStorageItem,
  getLocalStorageItem,
} from "../utils/helpers";
import { HASHTAGS } from "../utils/constants";

const Card = ({ import_datetime, url, id }) => {
  const [clicked, setClicked] = useState(Boolean(getLocalStorageItem(id)));

  const handleClick = () => {
    if (clicked) {
      removeLocalStorageItem(id);
      setClicked(false);
    } else {
      setLocalStorageItem(id, { id, url, import_datetime });
      setClicked(true);
    }
  };

  return (
    <div onClick={handleClick} className={`card ${clicked && "card--clicked"}`}>
      <img className="card__image" src={url} alt="animated gif" />
      <p className="card__date">{import_datetime}</p>
      <p className="card__hashtags">{HASHTAGS}</p>
      {clicked && (
        <div className="card__lock-icon">
          <img src={LockIcon} alt="lock icon" />
        </div>
      )}
    </div>
  );
};

export default Card;
