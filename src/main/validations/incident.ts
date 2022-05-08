import { Segments, Joi } from 'celebrate';

export const getIncidentHistoryValidation = {
  [Segments.PARAMS]: Joi.object().keys({
    date: Joi.date().required()
  }),
  [Segments.QUERY]: Joi.object().keys({
    limit: Joi.number().optional()
  })
};
