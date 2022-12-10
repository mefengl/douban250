import { useEffect, useState } from 'react'
import movie_list from './movie_list.json'

type Movie = { title: string; check: boolean }

export default function Home() {
  const [data, setData] = useState<Movie[]>([]);

  useEffect(() => {
    const localData: Movie[] = JSON.parse(localStorage.getItem('movie_list') || '[]');
    const oldCheck = localData.filter(movie => movie.check).map(movie => movie.title);
    setData(movie_list.map(movie => oldCheck.includes(movie.title)
      ? { ...movie, check: true }
      : movie
    ));
  }, [])

  return (
    <div className='flex flex-col gap-5 px-6 py-4'>
      <h1 className='sr-only'>豆瓣电影250</h1>
      <div className='whitespace-nowrap sm:gap-2 flex flex-col gap-4'>
        {data.map((movie, i) =>
          <div key={i} className='w-96 flex items-center gap-4 cursor-pointer'
            onClick={() => {
              const newData = [...data];
              newData[i].check = !newData[i].check;
              setData(newData);
              localStorage.setItem('movie_list', JSON.stringify(newData));
            }} >
            <input type='checkbox' checked={movie.check} className='sm:w-4 sm:h-4 checked:hidden shrink-0 w-5 h-5 border rounded-sm appearance-none cursor-pointer' />
            <div className={`text-xl sm:text-base ${movie.check && 'text-neutral-400 line-through'}`}>{movie.title}</div>
            <div className={`text-xl sm:text-base ${movie.check ? 'text-neutral-300' : 'text-neutral-600'}`}>{movie.author}</div>
          </div>
        )}
      </div>
      {!data.length ? ""
        : <div className='text-neutral-500 font-serif text-xl font-bold'> 豆瓣电影250 <span className='text-neutral-600'> {data.filter(movie => movie.check).length}/250 </span> </div>
      }
    </div>
  )
}
