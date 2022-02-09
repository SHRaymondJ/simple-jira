import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import { AuthenticatedApp } from './authenticated-app'
import { useAuth } from './context/AuthContext'
import UnauthenticatedApp from './screens/unauthenticated-app'

function App() {
    const { user } = useAuth()
    return (
        <div className="App">
            <Router>
                {user ? (
                    <AuthenticatedApp></AuthenticatedApp>
                ) : (
                    <UnauthenticatedApp></UnauthenticatedApp>
                )}
            </Router>
        </div>
    )
}

export default App
