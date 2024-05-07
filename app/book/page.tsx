const BookPage = () => {
  return (
    <div>
      <div className="my-12 text-center">
        <h1 className="text-2xl text-slate-600">Book</h1>
        <p className="mt-2 text-slate-400">This is a book page</p>
      </div>
      
      <div className="prose mx-[5em] max-w-screen-md">
        <p>Here are some interesting books</p>
        <ul>
          <li>asdf</li>
          <li>asdf</li>
          <li>asdf</li>
        </ul>
      </div>
    </div>
  )
}

export default BookPage