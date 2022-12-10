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
    <div className='flex flex-col gap-5 px-6 py-4'>
      <h1 className='sr-only'>豆瓣250</h1>
      <div className='whitespace-nowrap flex flex-col gap-2'>
        {data.map((book, i) =>
          <div key={i} className='w-96 flex items-center gap-4'>
            <input type='checkbox' checked={book.check}
              className='appearance-none cursor-pointer w-3.5 h-3.5 border checked:bg-neutral-200 transition-colors rounded-sm shrink-0'
              onChange={() => {
                const newData = [...data]
                newData[i].check = !newData[i].check
                setData(newData)
                localStorage.setItem('book_list', JSON.stringify(newData))
              }}
            />
            <div className={`${book.check && 'text-neutral-400'}`}>{book.title}</div>
            <div className={`${book.check ? 'text-neutral-400' : 'text-neutral-600'}`}>{book.author}</div>
          </div>
        )}
      </div>
      <div className='text-neutral-500 font-serif text-xl font-bold'>豆瓣250 <span className='text-neutral-600'>{data.filter(book => book.check).length}/250</span></div>
    </div>
  )
}
