function Sidebar( { children } ) {
  return(
    <>
      <div className="h-[calc(100vh_-_80px)] z-10">
        { children }
      </div>
    </>
  )
}

export default Sidebar