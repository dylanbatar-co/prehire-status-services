import { celebrate } from 'celebrate';

const SCHEMA_OPTIONS = {
  abortEarly: false,
  allowUnknow: true,
};

export const validateContract = (contract: any) => {
  return celebrate(contract, SCHEMA_OPTIONS);
};
