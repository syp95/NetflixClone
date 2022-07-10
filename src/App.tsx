import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    BrowserRouter,
} from 'react-router-dom';
import Header from './Components/Header';
import Home from './Routes/Home';
import Search from './Routes/Search';
import Tv from './Routes/Tv';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/movies/new/:id' element={<Home />}></Route>
                <Route path='/movies/top/:id' element={<Home />}></Route>
                <Route path='/movies/up/:id' element={<Home />}></Route>
                <Route path='/tv' element={<Tv />}></Route>
                <Route path='/tv/new/:id' element={<Tv />}></Route>
                <Route path='/tv/top/:id' element={<Tv />}></Route>
                <Route path='/tv/up/:id' element={<Tv />}></Route>
                <Route path='/search' element={<Search />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
