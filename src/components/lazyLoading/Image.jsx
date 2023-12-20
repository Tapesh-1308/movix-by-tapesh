import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

const Image = ({ src, className = "" }) => {
  return <LazyLoadImage src={src} className={className} alt="" effect="opacity" />;
};

export default Image;
