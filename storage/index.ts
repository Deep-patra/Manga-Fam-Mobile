import AsyncStorage from '@react-native-async-storage/async-storage';
import ReadManga from './readManga';
import type { READMANGA } from './readManga';

const readMangaKey = 'READ_MANGA';

const JSONToValue = (value: any) => {
  try {
    const result = JSON.parse(value);

    return result;
  } catch (error) {
    return null;
  }
};

class Storage {
  static async getReadMangas(): Promise<ReadManga[]> {
    const value = await AsyncStorage.getItem(readMangaKey);
    let mangas: ReadManga[] = [];

    const result = JSONToValue(value) as READMANGA[];

    if (!result) return [];

    if (result.length > 0) {
      for (const item of result) {
        const {
          mangaID,
          title,
          relationships,
          inLibrary,
          chapterBeingRead,
          readChapters,
          lastRead,
        } = item;

        mangas.push(
          new ReadManga(
            mangaID,
            title,
            relationships,
            inLibrary,
            chapterBeingRead,
            readChapters,
            lastRead
          )
        );
      }
    }

    return mangas;
  }

  static async setReadMangas(readMangas: ReadManga[]): Promise<void> {
    await AsyncStorage.setItem(readMangaKey, JSON.stringify(readMangas))
  }
}

export default Storage;
