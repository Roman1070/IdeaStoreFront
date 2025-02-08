import LandingPage from "../LandingPage/LandingPage";
import { GetCookie } from "../utils";
import Homepage from "./Homepage";

export default function HomepageWrapper() {
  var loggedIn = GetCookie("token");
  if (loggedIn) return <Homepage></Homepage>;
  else return <LandingPage></LandingPage>;
}
