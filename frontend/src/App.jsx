import React from 'react' 
import Routes from './routes/Routes' 
import { Helmet } from 'react-helmet-async' 
import './sass/index.scss' 

// App entry point.
export default function App() {
    return (
        <>
            <Helmet>
                {/* Set the page title */}
                <title>Django React</title>
                {/* Set the author of the page */}
                <meta name="author" content="Shailesh Pandit" />
            </Helmet>

            {/* Render the Routes component. */}
            <Routes />
        </>
    ) 
}
