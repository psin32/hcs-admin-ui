import React, { Component } from 'react';
import LoginForm from '../../forms/LoginForm.js'
import Navbar from '../common/Navbar.js'
import Topbar from '../common/Topbar.js'
import Cookies from 'universal-cookie';

class Login extends Component {
	
	componentWillMount() {
		document.title = "Login";
		const cookies = new Cookies();
		const token = cookies.get('TOKEN');
		
		if(token) {
			this.props.history.push("/welcome");
		}
	}

	render() {
	    return (
			<div>
			  <Topbar />
		      <Navbar />
		      <section>
		        <div className="container">
		          <header className="mb-5">
		            <h2 className="heading-line">Welcome to HCS Admin Tool</h2>
		          </header>
		          <div className="row col-md-6">
		              <LoginForm />
		          </div>
		        </div>
		      </section>	  
		    </div>
	    );
  	}
}

export default Login;