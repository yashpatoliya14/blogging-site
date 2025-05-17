import { Outlet } from "react-router";
import Footer from "./components/Home/Footer";
import Header from "./components/Home/Header";

export default function Layout(){
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}