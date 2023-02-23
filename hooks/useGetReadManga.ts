import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setReadMangas } from '../redux/actions/readManga.action'
import ReadManga from '../storage/readManga'
import Storage from '../storage'

export const useGetReadManga = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    Storage.getReadMangas()
      .then((mangas: ReadManga[]) => {
        if (mangas) dispatch(setReadMangas(mangas))
      })
      .catch(console.error)
  }, [])
}

