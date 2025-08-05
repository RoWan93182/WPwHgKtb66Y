// 代码生成时间: 2025-08-05 18:53:22
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache: Map<string, { data: any; expiresAt: number }> = new Map();

  constructor() {}

  /**
   * Set an item in the cache with a given TTL in milliseconds.
   * @param key The unique key for the cache entry.
   * @param data The data to be cached.
   * @param ttl Time to live in milliseconds.
   */
  set(key: string, data: any, ttl: number = 3600000): void {
    const now = Date.now();
    const expiresAt = now + ttl;
    this.cache.set(key, { data, expiresAt });
  }

  /**
   * Get an item from the cache if it exists and is not expired.
   * @param key The unique key for the cache entry.
   * @returns An Observable with the cached data if available, or an error if not.
   */
  get<T>(key: string): Observable<T> {
    const now = Date.now();
    const cachedItem = this.cache.get(key);

    if (cachedItem && cachedItem.expiresAt > now) {
      return of(cachedItem.data as T);
    } else if (cachedItem) {
      // Cache entry is expired, remove it from the cache
      this.cache.delete(key);
    }

    return of(undefined); // Return undefined or throw an error if you prefer
  }

  /**
   * Invalidates an item in the cache.
   * @param key The unique key for the cache entry.
   */
  invalidate(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clears the entire cache.
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Checks if an item exists in the cache and is not expired.
   * @param key The unique key for the cache entry.
   * @returns A boolean indicating whether the item exists in the cache.
   */
  has(key: string): boolean {
    const now = Date.now();
    const cachedItem = this.cache.get(key);
    return cachedItem && cachedItem.expiresAt > now;
  }
}
