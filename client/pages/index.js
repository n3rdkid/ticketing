import axios from "axios";

const LandingPage = ({ currentUser }) => {
  console.log("currentUser", currentUser);
  return <h1> Landing Page </h1>;
};

LandingPage.getInitialProps = async () => {
  if (typeof window === "undefined") {
    //We are on the server
    //request should be made to http://ingress-nginx.ingress-nginx.
    //http://Service_Name.NAMESPACE.svc.cluster.local
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser"
    ,{
        headers:{
            //Specifying domain in ingress-nginx
            Host:"ticketing.dev"
        }
    });
    return data;
  } else {
    //we are on the client
    //request should be made with base url ""
    const { data } = await axios.get("/api/users/currentuser");
    return data;
  }
  return {};
};
export default LandingPage;
