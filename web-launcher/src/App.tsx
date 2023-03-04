import React, { useEffect } from 'react'
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { useAuthStore, useIpcStore } from 'store';

import LoginPage from 'pages/LoginPage';
import { initIpc } from 'ipc';
import GamePage from 'pages/GamePage';


function App() {
    const authenticated = useAuthStore((state) => state.authenticated);
    const verifyToken = useAuthStore((state) => state.verifyToken);
    const { setDevice } = useIpcStore();

    useEffect(() => {
        setDevice(initIpc().device);
        verifyToken();
    }, [])
    
    return (
        <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
            <div className='app-wrapper'>
                <BrowserRouter>
                    {!authenticated ? <LoginPage /> : <GamePage />}
                </BrowserRouter>
            </div>
        </MantineProvider>

    )
}

export default App;