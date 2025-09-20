// 代码生成时间: 2025-09-20 20:42:01
import { Injectable } from '@angular/core';
import { Pool, PoolConfig } from 'pg';

// Interface for database connection configuration
interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

// Injectable service to manage database connection pool
@Injectable({
  providedIn: 'root'
})
export class DatabasePoolService {

  // Configuration for the database connection
  private config: DatabaseConfig;
  private pool: Pool | null = null;

  constructor(private configService: ConfigService) {
    // Assuming ConfigService provides the database configuration
    this.config = this.configService.getDatabaseConfig();
    this.initializePool();
  }

  // Initialize the database connection pool
  private initializePool(): void {
    const poolConfig: PoolConfig = {
      max: this.config.maxConnections, // Assuming maxConnections is provided
      min: this.config.minConnections, // Assuming minConnections is provided
      idleTimeoutMillis: this.config.idleTimeout, // Assuming idleTimeout is provided
    };

    // Create the pool with the given configuration
    this.pool = new Pool(poolConfig);
  }

  // Get a client from the pool
  public async getClient(): Promise<PoolClient> {
    try {
      const client = await this.pool?.connect();
      if (client) {
        return client;
      }
      throw new Error('Failed to get a client from the pool');
    } catch (error: any) {
      console.error('Error getting a client from the pool:', error);
      throw error;
    }
  }

  // Release a client back to the pool
  public releaseClient(client: PoolClient): void {
    // Release the client back to the pool
    client.release();
  }

  // Close the pool and end all connections in the pool
  public async closePool(): Promise<void> {
    try {
      if (this.pool) {
        await this.pool.end();
        this.pool = null;
      }
    } catch (error: any) {
      console.error('Error closing the pool:', error);
      throw error;
    }
  }

  // Example usage of the service (e.g., in a component or another service)
  // public async performDatabaseOperation() {
  //   try {
  //     const client = await this.getClient();
  //     // Use the client to perform database operations
  //     const result = await client.query('SELECT * FROM some_table');
  //     // Process the result
  //     console.log(result.rows);
  //     this.releaseClient(client);
  //   } catch (error) {
  //     console.error('Error performing database operation:', error);
  //   }
  // }
}

// Please note that for the above service to work, you'll need to install the 'pg' npm package
// and ensure that the ConfigService provides the necessary database configuration.
