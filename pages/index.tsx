import { useEffect, useState } from 'react'
import book_list from './book_list.json'

type Book = { title: string; author: string; check: boolean }

export default function Home() {
  const [data, setData] = useState<Book[]>([])

  useEffect(() => {
    const localData: Book[] = JSON.parse(localStorage.getItem('book_list') || '[]')
    const oldCheck = localData.filter(book => book.check).map(book => book.title + book.author)
    setData(book_list.map(book =>
      oldCheck.includes(book.title + book.author)
        ? { ...book, check: true }
        : book
    ))
  }, [])

  return (
    <div className='flex flex-col gap-4 px-6 py-4'>
      <h1 className='text-xl font-bold'>豆瓣读书 {data.filter(book => book.check).length}/250</h1>
      <div className='flex flex-col gap-2'>
        {data.map((book, i) =>
          <div key={i} className='w-96 flex items-center gap-4'>
            <input type='checkbox' checked={book.check}
              className='cursor-pointer w-3.5 h-3.5'
              onChange={() => {
                const newData = [...data]
                newData[i].check = !newData[i].check
                setData(newData)
                localStorage.setItem('book_list', JSON.stringify(newData))
              }}
            />
            <div>{book.title}</div>
            <div>{book.author}</div>
          </div>
        )}
      </div>
    </div>
  )
}
