// 代码生成时间: 2025-08-10 12:09:01
import * as fs from 'fs';
import * as path from 'path';

interface FolderStructure {
  folders: string[];
  files: string[];
}

class FolderOrganizer {
  constructor(private rootPath: string) {}

  /**
   * Scans the directory and returns its structure.
   * @returns FolderStructure
   */
  public getFolderStructure(): FolderStructure {
    const folders: string[] = [];
    const files: string[] = [];
    const items = fs.readdirSync(this.rootPath);

    for (const item of items) {
      const itemPath = path.join(this.rootPath, item);
      const stats = fs.lstatSync(itemPath);

      if (stats.isDirectory()) {
        folders.push(item);
      } else if (stats.isFile()) {
        files.push(item);
      }
    }

    return { folders, files };
  }

  /**
   * Creates a new directory at the specified path.
   * @param {string} dirPath - The path of the directory to be created.
   * @returns void
   */
  public createDirectory(dirPath: string): void {
    try {
      fs.mkdirSync(dirPath, { recursive: true });
    } catch (error) {
      console.error(`Error creating directory: ${error.message}`);
      throw error;
    }
  }

  /**
   * Moves a file or directory to a new location.
   * @param {string} source - The source path of the file or directory.
   * @param {string} destination - The destination path of the file or directory.
   * @returns void
   */
  public moveItem(source: string, destination: string): void {
    try {
      fs.renameSync(source, destination);
    } catch (error) {
      console.error(`Error moving item: ${error.message}`);
      throw error;
    }
  }
}

// Example usage:
const organizer = new FolderOrganizer('./example-directory');
const structure = organizer.getFolderStructure();
console.log('Folders:', structure.folders);
console.log('Files:', structure.files);
