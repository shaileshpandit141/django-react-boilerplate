import React from 'react' 
import ReactDOM from 'react-dom/client' 
import { store } from './config/store' 
import { Provider } from 'react-redux' 
import { HelmetProvider } from 'react-helmet-async' 
import App from './App' 

const root = ReactDOM.createRoot(document.getElementById('root')) 
root.render(
    <Provider store={store}>
        <HelmetProvider>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </HelmetProvider>
    </Provider>
) 

