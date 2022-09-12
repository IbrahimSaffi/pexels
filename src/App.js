import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  let [images, setImages] = useState([])
  let [page, setPage] = useState(1)
  let [Q, setQ] = useState("")
  let inp = useRef(null)
  function search(q) {
    if (q.length > 0) {
      console.log(q)
      fetch(`https://api.pexels.com/v1/search?query=${q}&per_page=25&page=${page}&size=small`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          authorization: "563492ad6f91700001000001f600d4b0691a48db9dc1fb4924dc754d",
        }
      }).then(res => res.json()).then(data => {
        console.log(data)
        setImages(data.photos)
        setQ(q)
      })
    }
  }
  function trending() {
    fetch(`https://api.pexels.com/v1/curated?per_page=25&page=${page}&size=small`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        authorization: "563492ad6f91700001000001f600d4b0691a48db9dc1fb4924dc754d",
      }
    }).then(res => res.json()).then(data => {
      setImages(data.photos)
    })
  }
  useEffect(() => {
    trending()
  }, [])
  useEffect(() => {
    if (Q.length === 0) {
      trending()
    }
    else {
      search(Q)
    }
  }, [page])
  return (
    <div className='app' >
      <div>
        <input ref={inp} type="text" required />
        <button onKeyDown={(e) => {
          if (
            e.code === "enter"

          ) {
            setPage(1)
            setQ(inp.current.value)
            search(inp.current.value)
          }

        }} onClick={() => {
          setPage(1)
          setQ(inp.current.value)
          search(inp.current.value)
        }
        } >Search</button>
      </div>
      <div className='images'>
        {images.map((ele, i) => {
          return <img key={i} src={ele.src.medium} alt="" />
        })}
      </div>
      <button onClick={() => {
        let currPage = page
        setPage(currPage + 1)
      }} >Next Page</button>
    </div>
  )
}

export default App;
