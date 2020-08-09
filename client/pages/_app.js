import "bootstrap/dist/css/bootstrap.css";
//Importing global css
// All componets will pass through this component

export default ({ Component, pageProps }) => {
    return <Component {...pageProps }
    />
}