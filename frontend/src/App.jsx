import logo from './assets/images/logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';


// Importing User Define Components/Utils.
import Layout from './Components/Layout/Layout';


// Default React Home Page.
function DefaultReactHome() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <h2>Hello Reactjs</h2>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    )
}


// Creating All Router and Define All Route.
const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />}>
        <Route index element={<DefaultReactHome />} />
    </Route>
))


// Expose the Created Router using RouterProvider (It Comes From react-router-dom).
export default function App() {
    return (
        <RouterProvider router={router} />
    );
}

