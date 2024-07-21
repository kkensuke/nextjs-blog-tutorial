export default function AboutPage() {
  return (
    <div className="mx-auto max-w-screen-md">
      <div className="mt-16">
        <h1 className="text-4xl text-slate-600">Publications</h1>
        
        <div className="mt-12 ml-8">
          <h2 className="text-2xl text-slate-600">Title 1</h2>
          <p className="mt-4 ml-8 text-lg text-gray-700">Description 1</p>
        </div>
        <div className="mt-8 ml-8">
          <h2 className="text-2xl text-slate-600">Title 2</h2>
          <p className="mt-4 ml-8 text-lg text-gray-700">Description 2</p>
        </div>
        <div className="mt-8 ml-8">
          <h2 className="text-2xl text-slate-600">Title 3</h2>
          <p className="mt-4 ml-8 text-lg text-gray-700">Description 3</p>
        </div>
      </div>
      
      <div className="mt-24">
        <h1 className="text-4xl text-slate-600">Photos</h1>
      </div>
    </div>
  )
}