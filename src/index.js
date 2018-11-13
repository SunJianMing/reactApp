
import {HashRouter as Router,Route} from 'react-router-dom';
import Frame from 'layout/frame/Frame'

//nodes.microbu.com
import 'semantic/dist/semantic.min.css'
import 'semantic/dist/semantic.min'

//assets pllugins
import 'plugins/plugin'

ReactDom.render(
    <Router basename='/'>
      <Route path='/' component={Frame}/>
    </Router>
  ,document.getElementById('root'))
