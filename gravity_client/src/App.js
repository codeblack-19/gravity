import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom"
import Chat from "./Component/Chats/Chats";
import Join from "./Component/Join/Join";

const App = () => (
    <Router>
        <Route exact path="/" component ={Join} />
        <Route path="/chat" component={Chat} />
    </Router>
);

export default App;