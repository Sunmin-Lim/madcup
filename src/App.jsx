import React, {useState, Suspense, lazy} from 'react'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import './App.css'
const Main = lazy(() => import("./pages/main/Main"))
const Select = lazy(() => import("./pages/select/Select"))

function App() {
  return (
    <>
		<BrowserRouter>
			<Suspense>
				<Routes>
					<Route path='/' element={<Main/>}/>
					<Route path='/:id' element={<Select/>}/>
				</Routes>
			</Suspense>
		</BrowserRouter>
    </>
  )
}

export default App
