import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Navbar from '../common/Navbar.js'
import Topbar from '../common/Topbar.js'
import Cookies from 'universal-cookie';
import axios from 'axios';
import CatalogSidePanel from './CatalogSidePanel';

class Catalog extends Component {
	
	constructor() {
        super();
        this.state = {
        	data: [],
        	id: '',
			identifier : "",
			url : "",
			published : false,
			display : false,
			sequence : '',
			topnav  : false,
			topCategory  : false,
			description : [],
			name : '',
			shortdescription : '',
			longdescription : '',
			responseReceived : true,
			products : [],
			catentrydata : [],
			displayCategoryDetails : false
        };
        this.onClickCategory = this.onClickCategory.bind(this);
    }
	
	componentWillMount() {
		document.title = "Catalog";
		
		const cookies = new Cookies();
		const token = cookies.get('TOKEN');

	    const api = axios.create({
	    	headers: {'Authorization': 'Bearer '+token},
	    	withCredentials: true
	    });
	    
	    let getTopCategories = process.env.REACT_APP_ADMIN_CATALOG_APP_GET_TOP_CATEGORIES_URL;
	    
	    api.get(getTopCategories)
	    .then((response) => {
            this.setState({
            	data : response.data
            });
	    })
	    .catch((error) => {
	    	if (error.response) {
				this.setState({
					responseReceived : true
		        });		
		    	if(error.response.status === 403) {
		    		if (null == token) {
		    			this.props.history.push("/clearcookie#accessdenied");
		    		} else {
		    			this.props.history.push("/clearcookie#timeout");	
		    		}
		    	}
	    	}
	    });
	}

	onClickCategory(e) {
		var categories = this.state.data;
		const category = categories.filter(record =>
	    {
	        return record.identifier === e.target.title;
	    });
		
        this.setState({
        	displayCategoryDetails : true
        });
        
		this.setState(category[0]);
		this.setState(category[0].description);
		
		if(category[0].products) {
			this.setState({
	        	products : category[0].products
	        });
			this.fetchProducts(category[0].url);
		}
	}
	
	onChange = (e) => {
	    const state = this.state
	    state[e.target.name] = e.target.value;
	    if(e.target.name == 'published') {
	    	state[e.target.name] = e.target.checked;
	    }
	    this.setState(state);
	}
	
	onSubmit(e) {
		e.preventDefault();
	}
	
	renderCategoryDetails() {
		const {id, identifier, description, published, display, sequence, topnav, topCategory, url, lastupdate, name, shortdescription, longdescription} = this.state;
		
	    return (
	    	<div className="tab-pane fade in show active" id="category" role="tabpanel">
				<div className="col-lg-12">
					<div className="padding-top-2x mt-2 hidden-lg-up"></div>
					<h4>Category Details</h4>
					<hr className="padding-bottom-1x"/>
					<form className="row" onSubmit={this.onSubmit}>
						<div className="col-md-6">
							<div className="form-group">
								<label for="account-company">Category Identifier</label>
								<input className="form-control" type="text" id="identifier" name="identifier" value={identifier} onChange={this.onChange}/>
							</div>
						</div>
						<div className="col-md-6">
							<div className="form-group">
								<label for="account-company">Name</label>
								<input className="form-control" type="text" id="name" name="name" value={name} onChange={this.onChange}/>
							</div>
						</div>
						<div className="col-md-6">
							<div className="form-group">
								<label for="account-company">Short Description</label>
								<input className="form-control" type="text" id="shortdescription" name="shortdescription" value={shortdescription} onChange={this.onChange}/>
							</div>
						</div>
						<div className="col-md-6">
							<div className="form-group">
								<label for="account-company">Category URL</label>
								<input className="form-control" type="text" id="url" name="url" value={url} onChange={this.onChange}/>
							</div>
						</div>
						<div className="col-md-6">
							<div className="form-group">
								<label className="custom-control custom-checkbox d-block">
									<input className="custom-control-input" type="checkbox" checked={published ? 'checked': null} defaultChecked={published} ref="published" name="published" onChange={this.onChange}/><span className="custom-control-indicator"></span><span className="custom-control-description">Published</span>
								</label>
								<label className="custom-control custom-checkbox d-block">
									<input className="custom-control-input" type="checkbox" checked={display ? 'checked': null} defaultChecked={display} ref="display" name="display" onChange={this.onChange}/><span className="custom-control-indicator"></span><span className="custom-control-description">Display</span>
								</label>
								<label className="custom-control custom-checkbox d-block">
									<input className="custom-control-input" type="checkbox" checked={topnav ? 'checked': null} defaultChecked={topnav} ref="topnav" name="topnav" onChange={this.onChange}/><span className="custom-control-indicator"></span><span className="custom-control-description">Visible in Top Navigation</span>
								</label>
								<label className="custom-control custom-checkbox d-block">
									<input className="custom-control-input" type="checkbox" checked={topCategory ? 'checked': null} defaultChecked={topCategory} ref="topCategory" name="topCategory" onChange={this.onChange}/><span className="custom-control-indicator"></span><span className="custom-control-description">Top Category</span>
								</label>
							</div>
						</div>
					</form>
				</div>
			</div>
	    );
	}
	
	fetchProducts(url) {
	    const api = axios.create({
	    	withCredentials: true
	    });
	    
	    const categoryDetailsURL = process.env.REACT_APP_CATALOG_APP_GET_CATEGORY_DETAILS_URL;
	    
	    api.get(categoryDetailsURL + url)
	    .then((response) => {
            this.setState({
            	catentrydata : response.data.catentries
            });
	    })
	    .catch((error) => {
	    	if (error.response) {
		    	if(error.response.status === 404) {
		            this.setState({
		    			pagenotfound : true
		            });
		    	}
	    	}
	    });
	}
	
	renderProductDetails() {
		
		const products = this.state.catentrydata.map((alldata, index) => {
			return (
	    		  <div className="row pt-3 pb-3 items-ordered">
	    		  	<div className="col col-lg-3 col-md-3 col-sm-12 col-12">
	    		  		{alldata.type}
	    		  	</div>
	    		  	<div className="col col-lg-2 col-md-2 col-sm-12 col-12">
		  		  		{alldata.partnumber}
		  		  	</div>	    		  
	    		  	<div className="col col-lg-3 col-md-3 col-sm-12 col-12">
	    		  		{alldata.description.name}
	    		  	</div>
	    		  	<div className="col col-lg-2 col-md-2 col-sm-12 col-12">
						<label className="custom-control custom-checkbox">
							<input className="custom-control-input" type="checkbox" checked={alldata.published ? 'checked': null} defaultChecked={alldata.published} ref="published" name="published" /><span className="custom-control-indicator"></span>
						</label>
	    		  	</div>	    		  	
	    		  	<div className="col col-lg-2 col-md-2 col-sm-12 col-12">
						<label className="custom-control custom-checkbox">
							<input className="custom-control-input" type="checkbox" checked={alldata.buyable ? 'checked': null} defaultChecked={alldata.buyable} ref="buyable" name="buyable" /><span className="custom-control-indicator"></span>
						</label>
	    		  	</div>	    		  	
	    		  </div>
			);
		});
		
		return (
			<div className="tab-pane fade" id="product" role="tabpanel">
				<section className="cart">
					<div>
						<div className="cart-heading text-center">
							<div className="row">
								<div className="col-3">Type</div>
								<div className="col-2">Partnumber</div>
								<div className="col-3">Name</div>
								<div className="col-2">Published</div>
								<div className="col-2">Buyable</div>
							</div>
						</div>
						<div className="cart-body text-center">
							{products}
						</div>
					</div>
				</section>
			</div>
		);
	}

	render() {
		let subcategories = null;
		if(this.state.responseReceived && this.state.data && this.state.data.length>0) {
	    	subcategories = <CatalogSidePanel data={this.state.data} onClick={this.onClickCategory}/>
		}
		
		let categoryContent = null;
		let productContent = null;
		let tab = null;
		let tabContent = null;
		if(this.state.displayCategoryDetails) {
			categoryContent = this.renderCategoryDetails();
			
			let productTab = null;
			if(this.state.products &&  this.state.products.length > 0) {
				productContent = this.renderProductDetails();
				productTab = (
				    <li className="nav-item">
				        <a className="nav-link" data-toggle="tab" href="#product" role="tab"><strong>Products</strong></a>
				    </li>
				);
			}
			
			tab = (
				<ul className="nav nav-tabs nav-justified">
				    <li className="nav-item">
				        <a className="nav-link active" data-toggle="tab" href="#category" role="tab"><strong>Category</strong></a>
				    </li>
				    {productTab}
			    </ul>
			);
			
			tabContent = (
					<div className="tab-content card">
						{categoryContent}
						{productContent}
					</div>
			);
		}
		
	    return (
			<div>
			  <Topbar />
		      <Navbar />
		      <section>
		        <div className="container">
		          <header className="mb-5">
		            <h2 className="heading-line">Categories</h2>
		          </header>
		          <div className="row">
			          <div className="col-md-4">
			          	{subcategories}
			          </div>
			          <div className="col-md-8">
			          	{tab}
			          	{tabContent}
			          </div>
		          </div>
		        </div>
		      </section>
		    </div>
	    );
  	}
}

export default withRouter(Catalog);