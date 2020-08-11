import buildClient from "../api/build-client";
const LandingPage = ({ currentUser }) => {
  console.log("currentUser", currentUser);
  return currentUser ? (
    <h1>You are signed innnnnnn! </h1>
  ) : (
    <h1>You are not signed inn! </h1>
  );
};

LandingPage.getInitialProps = async (context) => {
  const client = await buildClient(context);
  const { data } = await client.get("/api/users/currentuser");
  console.log("Data",data)
  return data;
};
export default LandingPage;
