import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import API, { Manga, Volume } from '../repository/Mangadex';

const useGetMangaWithVolume = (mangaID: string | null | undefined) => {
  const mangas = useSelector((state: any) => state.manga.mangas);

  const [manga, setManga] = useState<Manga | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  /**
   *
   * @param {string} id Unique Id of the manga
   * @returns {Promise<Manga>}
   */
  const getManga = async (id: string): Promise<Manga> => {
    let _manga: Manga | void | null = mangas.find((item: Manga) => item.id === id);

    // Fetch manga, if not found in the redux store
    if (!_manga) _manga = await API.getMangaById(id).catch(console.error);

    if (!_manga) throw new Error(`Cannot get the manga with id "${id}"`);

    await _manga.getChapters().catch(console.error);

    return _manga;
  };

  useEffect(() => {
    if (mangaID) {
      // Set the loading state to true
      setLoading(true);
      getManga(mangaID)
        .then((result: Manga) => {
          if (result) setManga(result);
        })
        .catch(console.error)
        // Set the loading state to false
        .finally(() => {
          setLoading(false);
        });
    }
  }, [mangaID]);

  return { manga, loading };
};

export { useGetMangaWithVolume };
