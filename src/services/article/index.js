import "isomorphic-fetch";
import fetch from "fetch-retry";
import { validateResponse } from "./responseValidator";
import { validateStatus } from "./statusValidator";
import ArticleError from "./error";
import Article from "./article";

import { baseURL } from "../../../config.json";

const retryOptions = {
  retryDelay(attempt) {
    // exponential rates
    return attempt ** 2 * 1000;
  },
  retryOn(attempt, error, response) {
    // do not retry on 404 or 400 codes
    if (attempt >= 3) {
      return false;
    }
    return error !== null || response.status >= 429;
  },
};

export async function retrieveArticleById(id) {
  const response = await fetch(`${baseURL}/delivery/v1/content/${id}`, retryOptions);
  if (!validateStatus(response.status)) {
    throw new ArticleError(`Failed to retrieve article data for id=${id}`, response.status);
  }
  const json = await response.json();
  const { error, result } = validateResponse(json, id);
  if (!result) {
    throw new ArticleError(error, 500);
  }
  const image = `${baseURL}/${json.elements.mainImage.value.leadImage.renditions.lead.source}` || "";
  const heading = json.elements.heading.value || "";
  const author = json.elements.author.value || "";
  const timestamp = new Date(json.elements.date.value).toDateString() || "";
  const body = json.elements.body.values || [];
  return new Article(image, heading, author, timestamp, body);
}

export default retrieveArticleById;
