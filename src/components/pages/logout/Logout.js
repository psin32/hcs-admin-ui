import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Navbar from '../common/Navbar.js'
import Topbar from '../common/Topbar.js'

class Logout extends Component {

	constructor() {
		super();
	}
	
	componentWillMount() {
		document.title = "Logout";
	}

	render() {
	    return (
			<div>
			  <Topbar />
		      <Navbar />
		      <section>
		        <div className="container">
		          <header className="mb-5">
		            <h2 className="heading-line">Successfully Logout</h2>
		          </header>
		        </div>
		      </section>	  
		    </div>
	    );
	}
}

export default withRouter(Logout);