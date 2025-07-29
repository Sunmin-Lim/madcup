import React, {useState, Suspense, lazy} from 'react'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import './App.css'
const Main = lazy(() => import("./pages/main/Main"))

function App() {
  return (
    <>
		<BrowserRouter>
			<Suspense>
				<Routes>
					<Route path='/' element={<Main/>}/>
				</Routes>
			</Suspense>
		</BrowserRouter>
    </>
  )
}

export default App
