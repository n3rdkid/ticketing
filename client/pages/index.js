import buildClient from "../api/build-client";
const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed innnnnnn! </h1>
  ) : (
    <h1>You are not signed inn! </h1>
  );
};

LandingPage.getInitialProps = async (context) => {

    console.log("LANDING PAGE CALLED")
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");
  return data;
};
export default LandingPage;
