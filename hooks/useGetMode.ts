import { useSelector } from 'react-redux'

export const useGetMode = (): "light" | "dark" => {
  const mode = useSelector((state: any) => state.theme.mode)

  return mode
}
