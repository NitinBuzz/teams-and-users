import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import Teams from '../teams'
import Team from '../team'
import About from '../about'

const App = () => (
  <div>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/teams" component={Teams} />
      <Route exact path="/team/:id" component={Team} />
      <Route exact path="/about-us" component={About} />
    </main>
  </div>
)

export default App
