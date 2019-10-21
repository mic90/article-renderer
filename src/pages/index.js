import ErrorPage from "next/error";
import PropTypes from "prop-types";
import React from "react";
import Layout from "../components/layout";
import Article from "../components/article";
import ArticleModel from "../services/article/article";
import { retrieveArticleById } from "../services/article";

const id = "a9eabd0d-9b1d-4801-b686-0815860d9520";

function Home(props) {
  const { statusCode, article, errorMessage } = props;
  return (
    statusCode === 200 ? (
      <Layout>
        <Article data={article} />
      </Layout>
    ) : <ErrorPage statusCode={statusCode} title={errorMessage} />
  );
}

Home.propTypes = {
  statusCode: PropTypes.number.isRequired,
  errorMessage: PropTypes.string.isRequired,
  article: PropTypes.instanceOf(ArticleModel).isRequired,
};

Home.getInitialProps = async () => {
  try {
    const article = await retrieveArticleById(id);
    return {
      statusCode: 200,
      errorMessage: "",
      article,
    };
  } catch (err) {
    return {
      statusCode: err.code,
      errorMessage: err.message,
      article: null,
    };
  }
};

export default Home;
