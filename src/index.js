import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './components/pages/login/Login';
import Welcome from './components/pages/welcome/Welcome';
import Catalog from './components/pages/catalog/Catalog';
import ClearCookie from './components/pages/common/ClearCookie';
import Logout from './components/pages/logout/Logout';
import Timeout from './components/pages/timeout/Timeout';
import AccessDenied from './components/pages/accessdenied/AccessDenied';
import PageNotFound from './components/pages/pagenotfound/PageNotFound';

ReactDOM.render(
		<BrowserRouter>
			<div>
				<Switch>
					<Route exact path="/" component={Login} ></Route>
					<Route path="/login" component={Login} ></Route>
					<Route path="/welcome" component={Welcome} ></Route>
					<Route path="/catalog" component={Catalog} ></Route>
					<Route path="/clearcookie" component={ClearCookie} ></Route>
					<Route path="/logout" component={Logout} ></Route>
					<Route path="/timeout" component={Timeout} ></Route>
					<Route path="/accessdenied" component={AccessDenied} ></Route>
					<Route path="*" component={PageNotFound} status={404}/>		
				</Switch>
			</div>
		</BrowserRouter>,
document.getElementById('root'));

