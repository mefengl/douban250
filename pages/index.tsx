import { useEffect, useState } from 'react'
import book_list from './book_list.json'

type Book = { title: string; author: string; check: boolean }

export default function Home() {
  const [data, setData] = useState<Book[]>([]);

  useEffect(() => {
    const localData: Book[] = JSON.parse(localStorage.getItem('book_list') || '[]');
    const oldCheck = localData.filter(book => book.check).map(book => book.title);
    setData(book_list.map(book => oldCheck.includes(book.title)
      ? { ...book, check: true }
      : book
    ));
  }, [])

  return (
    <div className='flex flex-col gap-5 px-6 py-4'>
      <h1 className='sr-only'>豆瓣250</h1>
      <div className='whitespace-nowrap sm:gap-2 flex flex-col gap-4'>
        {data.map((book, i) =>
          <div key={i} className='w-96 flex items-center gap-4 cursor-pointer'
            onClick={() => {
              const newData = [...data];
              newData[i].check = !newData[i].check;
              setData(newData);
              localStorage.setItem('book_list', JSON.stringify(newData));
            }} >
            <input type='checkbox' checked={book.check} className='sm:w-4 sm:h-4 checked:hidden shrink-0 w-5 h-5 border rounded-sm appearance-none cursor-pointer' />
            <div className={`text-xl sm:text-base ${book.check && 'text-neutral-400 line-through'}`}>{book.title}</div>
            <div className={`text-xl sm:text-base ${book.check ? 'text-neutral-300' : 'text-neutral-600'}`}>{book.author}</div>
          </div>
        )}
      </div>
      {!data.length ? ""
        : <div className='text-neutral-500 font-serif text-xl font-bold'> 豆瓣250 <span className='text-neutral-600'> {data.filter(book => book.check).length}/250 </span> </div>
      }
    </div>
  )
}
