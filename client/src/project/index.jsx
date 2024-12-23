import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { GlobalStyles } from "./styled"
import { MyHeader } from "./components"
import { AboutPage, DoctorsPage, MyContact, MyDoctorsPage, MyEquipments, MyHomePage, Operator, PolicyPage, PricePage, SearchPage, ServicesPage, ServicesParts } from "./containers"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { MyEquipmentsPage } from "./containers/equipmentsPage"


export const App = () => {
    const routes = [
        { components: <MyHomePage />, path: "/" },
        { components: <MyContact />, path: "/contact" },
        { components: <ServicesPage />, path: "/:id" },
        { components: <ServicesParts />, path: "/:id/:index" },
        { components: <MyEquipments />, path: "/equipments/:id" },
        { components: <MyEquipmentsPage />, path: "/equipments" },
        { components: <PricePage />, path: "/price" },
        { components: <MyDoctorsPage />, path: "/doctors" },
        { components: <DoctorsPage />, path: "/doctors/:id" },
        { components: <SearchPage />, path: "/search" },
        { components: <PolicyPage />, path: "/policy" },
        { components: <AboutPage />, path: "/about" },
        { components: <Operator />, path: "/operator" },
    ]
    return (
        <>
            <Router>
                <GlobalStyles />
                <MyHeader />
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Routes>
                    {routes.map((e, i) => {
                        return (
                            <Route element={e.components} path={e.path} key={i} />
                        )
                    })}
                </Routes>
            </Router>
        </>
    )
}

