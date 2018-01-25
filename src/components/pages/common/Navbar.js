import React, { Component } from 'react';
import Cookies from 'universal-cookie';

class Navbar extends Component {
	
	render() {
		const cookies = new Cookies();
		const tokenCookie = cookies.get('TOKEN');
		const registerType = cookies.get('REGISTER_TYPE');
		
		let register = true;
		if(registerType == "G") {
			register = false;
		}
		
	    return (
    	    <nav className="navbar navbar-expand-md">
    	      <div className="container"><a href="/" className="navbar-brand"> <img src="/img/logo-new.png" alt="logo"></img></a>
    	        <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler navbar-toggler-right">Menu <i className="fa fa-bars"></i></button>
    	        <div id="navbarSupportedContent" className="collapse navbar-collapse">
    	        	<ul className="navbar-nav ml-auto d-md-flex flex-md-row align-items-md-center">
    	        		<li className="list-inline-item"><a href="/catalog" className="nav-link">CATALOG</a></li>
    	        		<li className="list-inline-item"><a href="#" className="nav-link">PROMOTION</a></li>
    	        		<li className="list-inline-item"><a href="#" className="nav-link">ORDER</a></li>
    	        		<li className="list-inline-item"><a href="#" className="nav-link">USERS</a></li>
    	        	</ul>
    	        </div>
    	      </div>
    	    </nav>
	    );
	}
}

export default Navbar;