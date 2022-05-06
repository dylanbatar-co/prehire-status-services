import { Joi, Segments } from 'celebrate';

export const registerServiceValidation = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    url: Joi.string().required(),
    owner: Joi.string().required(),
    status: Joi.string().default('pass')
  })
};

export const getStatusServicesValidation = {
  [Segments.PARAMS]: Joi.object().keys({
    owner: Joi.string().required()
  })
};
