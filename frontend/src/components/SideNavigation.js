import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

class SideNavigation extends React.Component {
	render() {
		return (
			<div className="sidebar-fixed position-fixed">
				<a href="/" className="logo-wrapper waves-effect">
					
					<h1> Company </h1>
				</a>
				<MDBListGroup className="list-group-flush">
					<NavLink to="/dashboard" onClick={() => this.props.setActive('dashboard')} activeClassName="activeClass">
						<MDBListGroupItem>
							<MDBIcon icon="users" className="mr-3"/>
							Employees
						</MDBListGroupItem>
					</NavLink>
					<NavLink to="/maps" onClick={() => this.props.setActive('maps')} activeClassName="activeClass">
						<MDBListGroupItem>
							<MDBIcon icon="map" className="mr-3"/>
							Maps
						</MDBListGroupItem>
					</NavLink>
					<NavLink to="/search" onClick={() => this.props.setActive('organisation')} activeClassName="activeClass">
						<MDBListGroupItem>
							<MDBIcon icon="building" className="mr-3"/>
							Organisation
						</MDBListGroupItem>
					</NavLink>
				</MDBListGroup>
			</div>
		);
	}
}

export default SideNavigation;
