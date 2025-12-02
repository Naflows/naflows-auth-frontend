"use client";

import '@/public/root/components/loader.scss';
import { useEffect, useState } from 'react';

const Loader = ({
  loading,
  title,
  message
}: {
  loading: boolean,
  title?: string,
  message?: string
}) => {

  // Loop that goes from "." to "..." for the loading message
  const [dots, setDots] = useState(".");

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : "."));
    }, 500);

    return () => clearInterval(interval);
  }, [loading]);

  if (loading) {
    return (
      <div className="nass__page__loader">
        <img src="https://naflows.com/public/assets/naflows_small_logotype.png" alt="Loading..." className="loader__image" />
        <div className="content">
          {title && <h3>{title}{dots}</h3>}
          {message && <p>{message}</p>}
        </div>
        <div
          className="naflows__button__loader"
          style={{
            display: loading ? "block" : "none",
          }}
        >
          <div className="naflows__button__loader__content"></div>
        </div>
      </div>
    );
  }
};


export default Loader;