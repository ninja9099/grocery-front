import {environment} from '../../../environments/environment';

export interface TYPE {
  TYPE_NAME: string;
  INPUT_TYPE: number;
  VALIDATION: string;
}
export const INPUT = {
  TEXT: 0,
  SELECT: 1,
  FILE: 2,
  BOOL: 3,
  MULTI: 4
};
export class Constants {
  public static readonly DATA_URL: string = `${environment.baseUrl}/api/v1/load-master-data/ai/`;
  public static readonly DATA_TYPES: TYPE[] = [
    { TYPE_NAME: 'float or array of floats', INPUT_TYPE: INPUT.TEXT, VALIDATION: '' },
    { TYPE_NAME: 'float', INPUT_TYPE: INPUT.TEXT, VALIDATION: '' },
    { TYPE_NAME: 'float or None', INPUT_TYPE: INPUT.TEXT, VALIDATION: '' },
    { TYPE_NAME: 'int', INPUT_TYPE: INPUT.TEXT, VALIDATION: '' },
    { TYPE_NAME: 'integer', INPUT_TYPE: INPUT.TEXT, VALIDATION: '' },
    { TYPE_NAME: 'int or None', INPUT_TYPE: INPUT.TEXT, VALIDATION: '' },
    { TYPE_NAME: 'integer or None', INPUT_TYPE: INPUT.TEXT, VALIDATION: '' },
    { TYPE_NAME: 'boolean', INPUT_TYPE: INPUT.BOOL, VALIDATION: '' },
    { TYPE_NAME: 'bool', INPUT_TYPE: INPUT.BOOL, VALIDATION: '' },
    { TYPE_NAME: 'str', INPUT_TYPE: INPUT.TEXT, VALIDATION: '' },
    { TYPE_NAME: 'array', INPUT_TYPE: INPUT.TEXT, VALIDATION: '' },
    { TYPE_NAME: 'numpy array', INPUT_TYPE: INPUT.TEXT, VALIDATION: '' },
    { TYPE_NAME: 'dropdown', INPUT_TYPE: INPUT.SELECT, VALIDATION: '' },
    { TYPE_NAME: 'select', INPUT_TYPE: INPUT.SELECT, VALIDATION: '' }
  ];
}
