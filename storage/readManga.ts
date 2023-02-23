import { Manga } from '../repository/Mangadex';
import { MangaAttributes } from '../repository/Mangadex/src/types';
import { Relationship } from '../repository/Mangadex/src/types';

export interface READMANGA {
  mangaID: string;
  chapterBeingRead: string | null;
  readChapters: string[];
  lastRead: Date | null;
  inLibrary: boolean;
  title: string;
  relationships: Relationship[];
}

class ReadManga implements READMANGA {
  readonly mangaID: string;
  readonly title: string;
  readonly relationships: Relationship[];
  lastRead: Date | null;
  inLibrary: boolean;
  chapterBeingRead: string | null;
  readChapters: string[];

  /**
   * 
   * @param {string} mangaID 
   * @param {string} title 
   * @param {Relationship[]} relationships 
   * @param {boolean} inLibrary 
   * @param {string | undefined} chapterBeingRead 
   * @param {string[] | undefined} readChapters 
   * @param {Date | undefined} lastRead 
   */
  constructor(
    mangaID: string,
    title: string,
    relationships: Relationship[],
    inLibrary: boolean = false,
    chapterBeingRead?: string | null,
    readChapters?: string[],
    lastRead?: Date | null,
  ) {
    this.mangaID = mangaID;
    this.title = title;
    this.relationships = relationships;
    this.inLibrary = inLibrary;
    this.lastRead = lastRead ? lastRead : chapterBeingRead ? new Date() : null;
    this.chapterBeingRead = chapterBeingRead ? chapterBeingRead : null;
    this.readChapters = readChapters
      ? readChapters
      : chapterBeingRead
      ? [chapterBeingRead]
      : [];
  }

  // Add to the Library
  addToLibrary() {
    this.inLibrary = true;
  }

  // Remove from the Library
  removeFromLibrary() {
    this.inLibrary = false;
  }

  // update the Last Reading time of the manga
  updateLastRead() {
    this.lastRead = new Date();
  }

  addReadChapters(chapterID: string) {
    this.readChapters.push(chapterID);
  }

  updateChapterBeingRead(chapterID: string) {
    this.addReadChapters(chapterID)
    this.chapterBeingRead = chapterID;
  }
}

export default ReadManga;
