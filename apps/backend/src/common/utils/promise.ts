import { Logger } from "@nestjs/common";

export const promiseSettledHelper = async <T = any[]>(promises: Promise<any>[]): Promise<T> => {
  const logger = new Logger('PromiseSettledHelper');

  const settledPromises = await Promise.allSettled(promises);

  const solved = settledPromises.map((promise) => {
    if (promise.status === 'fulfilled') {
      return promise.value;
    } else {
      logger.error(promise.reason);
      return null;
    }
  });

  return solved as T;
}