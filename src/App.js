import React from "react"
import { BrowserRouter as Router } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { UserProfileProvider } from "./Providers/UserProfileProviders";
import history from "./history";

function App() {
  return (
   
      <Router history={history}>
        <UserProfileProvider>
          <ApplicationViews />
        </UserProfileProvider>
      </Router>
  );
}

export default App;