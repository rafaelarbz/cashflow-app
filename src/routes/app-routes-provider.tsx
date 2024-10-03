import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotFound as NotFoundPage } from '@/pages/not-found'; 
import { IRoute, useRoutes } from './routes'

export function AppRoutesProvider() {
    const routes = useRoutes()

    return (
        <Router>
            <Routes>
                {routes.map((route: IRoute, index: number) => (
                    <Route 
                        key={index} 
                        path={route.path} 
                        element={<route.element/>}/>
                ))}
                <Route path='*' element={<NotFoundPage/>} />
            </Routes>
        </Router>
    )
}