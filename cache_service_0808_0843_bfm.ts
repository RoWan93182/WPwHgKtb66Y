// 代码生成时间: 2025-08-08 08:43:05
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private cache: Map<string, any> = new Map<string, any>();

  /**
   * Stores the provided data in the cache under the given key.
   * @param key The key under which the data will be stored.
   * @param data The data to be stored in the cache.
   * @returns The cached data.
   */
  public set(key: string, data: any): any {
    if (!key) {
      throw new Error('CacheService: Key cannot be empty.');
    }

    this.cache.set(key, data);
    return data;
  }

  /**
   * Retrieves the data stored under the given key from the cache.
   * @param key The key under which the data is stored.
   * @returns The cached data or undefined if the key does not exist.
   */
  public get(key: string): any {
    if (!key) {
      throw new Error('CacheService: Key cannot be empty.');
    }

    return this.cache.get(key);
  }

  /**
   * Removes the data stored under the given key from the cache.
   * @param key The key under which the data is stored.
   * @returns The removed data or undefined if the key does not exist.
   */
  public remove(key: string): any {
    if (!key) {
      throw new Error('CacheService: Key cannot be empty.');
    }

    return this.cache.delete(key);
  }

  /**
   * Clears all data stored in the cache.
   */
  public clear(): void {
    this.cache.clear();
  }

  /**
   * Checks if the cache contains data under the given key.
   * @param key The key to check in the cache.
   * @returns True if the key exists in the cache, false otherwise.
   */
  public has(key: string): boolean {
    if (!key) {
      throw new Error('CacheService: Key cannot be empty.');
    }

    return this.cache.has(key);
  }
}
