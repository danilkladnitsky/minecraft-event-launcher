import React, { ReactNode, useEffect } from 'react'
import { Loader, MantineProvider } from '@mantine/core';
import { useAuthStore, useIpcStore } from 'store';

import LoginPage from 'pages/LoginPage';
import { initIpc } from 'ipc';
import GamePage from 'pages/GamePage';
import MapBackground from 'shared/ui/MapBackground';


function App() {
    const { authenticated, verifyToken, verifyStatus } = useAuthStore();
    const { setDevice } = useIpcStore();

    useEffect(() => {
        setDevice(initIpc().device);
        verifyToken();
    }, []);

    if (verifyStatus === "loading") {
        return <Loader size="xl" variant="dots" />;
    }
    
    if (!authenticated) {
        return <LoginPage />;
    }

    return <GamePage />;
    
}

function MantineWrapper({ children }: { children: ReactNode }) {
    return (
        <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
            <div className='app-wrapper'>
                    {children}
            </div>
        </MantineProvider>
    );
}


export default () => <MantineWrapper>
    <App />
    <MapBackground />
</MantineWrapper>;