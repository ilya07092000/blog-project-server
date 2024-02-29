import { SnakelizeKeys } from '../types/common/camelToSnake';

/**
 * abstract class for dto
 */
abstract class BasicDto<T extends object> {
  /**
   * make all keys from snake_case to camelCase
   */
  present() {
    return Object.keys(this).reduce((acc, propName) => {
      const camelKey = propName.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
      if (['createdAt', 'updatedAt'].includes(camelKey)) {
        return acc;
      }

      acc[camelKey] = this[propName];
      return acc;
    }, {});
  }

  /**
   * make all keys from camelCase to snake_case
   */
  data(): SnakelizeKeys<T> {
    return Object.keys(this).reduce((acc, propName) => {
      const camelKey = propName.replace(
        /([A-Z])/g,
        (_, c) => '_' + c.toLowerCase(),
      );
      acc[camelKey] = this[propName];
      return acc;
    }, {}) as SnakelizeKeys<T>;
  }
}

export { BasicDto };
