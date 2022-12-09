import { useEffect, useState } from 'react'
import book_list from './book_list.json'

export default function Home() {
  const [data, setData] = useState(book_list)

  useEffect(() => {
    const localData = localStorage.getItem('book_list')
    localData && setData(JSON.parse(localData))
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
