import React from 'react'
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { useAuthStore } from 'store';

import LoginPage from 'pages/LoginPage';

function App() {
    const authenticated = useAuthStore((state) => state.authenticated);

    return (
        <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
            <div className='app-wrapper'>
                <BrowserRouter>
                    {!authenticated ? <LoginPage /> : <>LoggedIn</>}
                </BrowserRouter>
            </div>
        </MantineProvider>

    )
}

export default App;