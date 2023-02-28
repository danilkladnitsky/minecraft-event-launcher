import { AppShell, Header, Navbar } from '@mantine/core';
import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

function App() {
    return (
        <BrowserRouter>
            <AppShell
                padding="md"
                styles={(theme) => ({
                    main: { backgroundColor: theme.colors.dark[8] },
                })}>
                <LoginPage />
            </AppShell>
        </BrowserRouter>
    )
}

export default App;