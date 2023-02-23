import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Storage from '../storage'
import ReadManga from '../storage/readManga'

import { setReadMangas } from '../redux/actions/readManga.action'

const useInitializeReadManga = () => {
 const dispatch = useDispatch()

 useEffect(() => {
  Storage.getReadMangas()
   .then((mangas: ReadManga[]) => {
    if (mangas && mangas.length > 0) dispatch(setReadMangas(mangas))
   })
   .catch(console.error)
 }, [])
}

export { useInitializeReadManga }