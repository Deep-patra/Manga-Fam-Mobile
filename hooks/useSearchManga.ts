import { useEffect, useState, useRef } from 'react'

import API, { Manga } from '../repository/Mangadex'

const useSearchManga = (value: string): { mangas: Manga[], loading: boolean } => {
 let clearid = useRef<any>(null).current

 const [mangas, setMangas] = useState<Manga[]>([])
 const [loading, setLoading] = useState<boolean>(false)

 useEffect(() => {
  
  if (value === "") setMangas([])

  if (value !== "") {
    clearid = setTimeout(() => {
     setLoading(true)

     API.getMangasByName(value)
      .then((data: Manga[] | null) => {
       console.log(data)
       if (data && data.length > 0) setMangas(data)
      })
      .catch(console.error)
      .finally(() => {
       setLoading(false)
      })

    }, 2000)
  }

  return () => {
   if (clearid) clearTimeout(clearid)
  }
 }, [value])

 return { loading, mangas }
}

export { useSearchManga }