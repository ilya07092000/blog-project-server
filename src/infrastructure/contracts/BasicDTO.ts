import { SnakelizeKeys } from '../types/common/camelToSnake';
import { CamelizeKeys } from '../types/common/camelizeKeys';

/**
 * abstract class for dto
 */
abstract class BasicDto {
  /**
   * make all keys from snake_case to camelCase
   */
  present(): CamelizeKeys<this> {
    return Object.keys(this).reduce((acc, propName) => {
      const camelKey = propName.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
      if (['createdAt', 'updatedAt'].includes(camelKey)) {
        return acc;
      }

      acc[camelKey] = this[propName];
      return acc;
    }, {}) as CamelizeKeys<this>;
  }

  /**
   * make all keys from camelCase to snake_case
   */
  data(): SnakelizeKeys<this> {
    return Object.keys(this).reduce((acc, propName) => {
      const camelKey = propName.replace(
        /([A-Z])/g,
        (_, c) => '_' + c.toLowerCase(),
      );
      acc[camelKey] = this[propName];
      return acc;
    }, {}) as SnakelizeKeys<this>;
  }

  abstract clone<T>(data: object): T;
}

export { BasicDto };
