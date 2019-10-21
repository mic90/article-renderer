import PropTypes from "prop-types";
import React from "react";
import ReactHtmlParser from "react-html-parser";
import ArticleModel from "../services/article/article";

import "../style.css";

function Article({ data }) {
  return (
    <div className="mx-auto flex flex-col font-sans subpixel-antialiased">
      <img className="w-full rounded-lg" src={data.image} alt="Sunset in the mountains" />
      <p className="text-4xl font-title leading-tight mt-5 text-left">{data.heading}</p>
      <div className="flex justify-end">
        <p className="text-sm text-gray mb-5 text-gray-600 flex-grow">
          @
          {data.author}
        </p>
        <p className="text-sm text-gray mb-5 text-gray-600 justify-around text-right">{data.timestamp}</p>
      </div>
      {data.body.map((text) => (
        // eslint-disable-next-line react/jsx-key
        <div className="text-justify break-words my-2">
          { ReactHtmlParser(text)}
        </div>
      ))}
    </div>
  );
}

Article.propTypes = {
  data: PropTypes.instanceOf(ArticleModel).isRequired,
};

export default Article;
