import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Chapter, Manga, Volume } from '../repository/Mangadex'

const findChapter = (chapterID: string, manga: Manga): Chapter | null => {
  const volumes = manga.volumes
  let chapter: Chapter | null = null

  volumes.forEach((volume: Volume) => {
    const foundChapter = volume.chapters.find((ch: Chapter) => ch.id === chapterID)
    if (foundChapter) chapter = foundChapter
  })

  return chapter
}

const findManga = (mangaID: string, mangas: Manga[]): Manga | null => {
  const manga = mangas.find((item: Manga) => item.id === mangaID)

  return manga ? manga : null
}


const useGetPages = (mangaID: string, chapterID: string) => {
  const mangas = useSelector((state: any) => state.manga.mangas)

  const [loading, setLoading] = useState<boolean>(false)
  const [manga, setManga] = useState<Manga | null>(null)
  const [chapter, setChapter] = useState<Chapter | null>(null)

  useEffect(() => {
    
    async function getPages() {
      if (chapterID && mangaID) {
        const selectedManga = findManga(mangaID, mangas)
        if (selectedManga) {
          setManga(selectedManga)

          if (!selectedManga.volumes) await selectedManga.getChapters()
  
          const currentChapter = findChapter(chapterID, selectedManga)

          if (currentChapter) {
            await currentChapter?.getPages()
            setChapter(currentChapter)
          }
        }
      }
    }

    setLoading(true)

    getPages()
      .catch(console.error)
      .finally(() => { setLoading(false) })

  }, [chapterID, mangaID])

  return { loading, manga, chapter }
}

export { useGetPages }