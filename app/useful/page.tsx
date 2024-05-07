export default function UsefulPage() {
  
  return (
    <div>
      <div className="my-12 text-center">
        <h1 className="text-2xl text-slate-600">Useful</h1>
        <p className="mt-2 text-slate-400">This is a useful page</p>
      </div>
      
      <div className="prose mx-auto max-w-screen-md">
        <p>Here are some useful links:</p>
        <ul>
          <li><a href="https://www.google.com/">Google</a></li>
          <li><a href="https://www.bing.com/">Bing</a></li>
          <li><a href="https://www.yahoo.com/">Yahoo</a></li>
        </ul>
      </div>
    </div>
  )
}
