import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import ReadManga from '../storage/readManga'
import API, { Manga } from '../repository/Mangadex'

type SORT = "ASC" | "DESC"
type ReturnType = {
 loading: boolean,
 mangas: Manga[],
 order: "ASC" | "DESC",
 toggleOrder: () => void,
}

const getAddedMangasFromStore = (state: any): ReadManga[] => {
 const mangas = state.readManga.mangas

 const addedMangas = mangas.filter((item: ReadManga) => {
  if (item.inLibrary) return item
 })

 return addedMangas
}


export const useGetAddedMangas = (): ReturnType  => {
  const [loading, setLoading] = useState<boolean>(false)
  const [order, setOrder] = useState<SORT>("ASC")
  const [mangas, setMangas] = useState<Manga[]>([])

  const addedMangas: ReadManga[] = useSelector(getAddedMangasFromStore)

  const toggleOrder = () => {
   setOrder(order === "ASC" ? "DESC" : "ASC")
  }

  useEffect(() => {
    setLoading(true)

    const addedMangaID: string[] = []

   if (addedMangas.length === 0) {
    setMangas([])
    return () => {}
   }

    addedMangas.forEach((item: ReadManga) => {
     addedMangaID.push(item.mangaID)
    })

    API.getMangaByIds(addedMangaID)
      .then((value: Manga[] | null) => {
        console.log(value)
        if (value && value.length) setMangas(value)
      })
      .catch(console.error)
      .finally(() => { setLoading(false) })

  }, [addedMangas])


  useEffect(() => {
   if (mangas.length > 1) {
    if (order === "ASC") {
     const sorted_mangas = mangas.sort((a, b) => {
      return a.getUpdatedDate().getTime() < b.getUpdatedDate().getTime() ? -1 : 1
     })

     setMangas(sorted_mangas)
    } else if (order === "DESC") {
     const sorted_mangas = mangas.sort((a, b) => {
      return a.getUpdatedDate().getTime() < b.getUpdatedDate().getTime() ? 1 : -1
     })

     setMangas(sorted_mangas)
    }
   }
  }, [order])

  return { loading, mangas, order, toggleOrder }
}