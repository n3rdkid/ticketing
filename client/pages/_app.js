import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client"
import { Component } from "react";
//Importing global css
// All componets will pass through this component

const AppComponent = ({ Component, pageProps, currentUser }) => {

    return <>
        <h1>{currentUser.email}</h1>
        <Component {...pageProps} />
    </>
}
//Outside of pages in next we get (Component,ctx:{req,res}) for getInitialProps()
AppComponent.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx);
    const { data } = await client.get("/api/users/currentuser");
    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    return { ...data, pageProps };
};

export default AppComponent