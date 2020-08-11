import axios from "axios";
export default ({ req }) => {
    if (typeof window === "undefined") {
        //We are on the server
        //request should be made to 
        //http://Service_Name.NAMESPACE.svc.cluster.local

        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        });
    } else {
        //we are on the client
        //request should be made with base url ""
        return axios.create({
            baseURL: '/',
        });
    }
}