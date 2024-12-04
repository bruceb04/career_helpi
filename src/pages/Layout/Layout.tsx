import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";
import React from "react";

export function Layout(): JSX.Element {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </>
    );
}