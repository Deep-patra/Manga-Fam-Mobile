import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import API, { Genre, Manga } from '../repository/Mangadex';

import { updateManga, pushManga } from '../redux/actions/mangas.action';

const getSelectedValues = (values: Record<string, boolean>) => {
  const selectedValues: string[] = [];

  Object.entries(values).forEach(([value, selected]: [string, boolean]) => {
    if (selected) selectedValues.push(value);
  });

  return selectedValues;
};

const getGenreIds = (genre: Record<string, boolean>): string[] => {
  const ids: string[] = [];

  Object.entries(genre).forEach(([value, selected]) => {
    if (selected && Genre.has(value)) ids.push(Genre.get(value) as string);
  });

  return ids;
};

export const useGetMangas = (
  refreshing: boolean,
  reachBottom: boolean,
  setRefreshing: (value: boolean) => void
) => {
  const dispatch = useDispatch();

  const { status, rating, publication, genre, mangas } = useSelector((state: any) => ({
    status: state.filter.status,
    rating: state.filter.contentRating,
    publication: state.filter.publicationDemographic,
    genre: state.filter.genre,
    mangas: state.manga.mangas,
  }));

  const genreIDs = getGenreIds(genre);

  const fetchMangas = async (offset: number): Promise<Manga[] | null> => {
    const new_mangas = await API.getMangas({
      limit: 30,
      offset: offset,
      status: getSelectedValues(status),
      rating: getSelectedValues(rating),
      publication: getSelectedValues(publication),
      includedTags: genreIDs,
    }).catch(console.error);

    if (new_mangas) return new_mangas;
    return null;
  };

  useEffect(() => {
    // fetch mangas when first mount
    if (mangas.length === 0) {
      fetchMangas(mangas.length)
        .then((mangas: Manga[] | null) => {
          // console.log(mangas)
          if (mangas) dispatch(updateManga(mangas));
        })
        .catch(console.error);
    }
  }, []);

  useEffect(() => {
    // fetch mangas when refreshed
    if (refreshing) {
      fetchMangas(0)
        .then((mangas: Manga[] | null) => {
          console.log(mangas?.length);
          if (mangas) dispatch(updateManga(mangas));
        })
        .catch(console.error)
        .finally(() => {
          console.log('refreshed');
          // set refreshing to false
          setRefreshing(false);
        });
    }
  }, [refreshing]);

  useEffect(() => {
    // fetch more mangas when reach the bottom
    if (reachBottom) {
      fetchMangas(mangas.length)
        .then((mangas: Manga[] | null) => {
          if (mangas) dispatch(pushManga(mangas));
        })
        .catch(console.error);
    }
  }, [reachBottom]);
};
