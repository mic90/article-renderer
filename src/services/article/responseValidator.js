import Joi from "@hapi/joi";

const elementsTextSchema = Joi.object().keys({
  elementType: Joi.string().valid("text").required(),
  value: Joi.string(),
}).unknown();
const elementsBodySchema = Joi.object().keys({
  elementType: Joi.string().valid("formattedtext").required(),
  values: Joi.array().items(Joi.string()),
}).unknown();
const elementsMainImageSchema = Joi.object().keys({
  value: Joi.object().keys({
    leadImage: Joi.object().keys({
      renditions: Joi.object().keys({
        lead: Joi.object().keys({
          source: Joi.string().required(),
        }).unknown(),
      }).unknown(),
    }).unknown(),
  }).unknown(),
}).unknown();

const schema = (id) => Joi.object().keys({
  type: Joi.string().valid("Article").required(),
  classification: Joi.string().valid("content").required(),
  locale: Joi.string().required(),
  elements: Joi.object().keys({
    heading: elementsTextSchema,
    author: elementsTextSchema,
    body: elementsBodySchema,
    mainImage: elementsMainImageSchema,
  }).unknown(),
  name: Joi.string().required(),
  id: Joi.string().valid(id).required(),
  lastModified: Joi.string().required(),
}).unknown();

export function validateResponse(json, id) {
  const { error } = schema(id).validate(json);
  return {
    error,
    result: error === undefined,
  };
}

export default validateResponse;
