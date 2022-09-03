import React from 'react';
import { ListGroup, Dropdown, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useWindowSize from '../../../../hooks/useWindowSize';
import NavSearch from './NavSearch';

const NavLeft = () => {
    const windowSize = useWindowSize();
  const userinfo=useSelector(state=>state.userinfo)
    let dropdownRightAlign = false;
    const loginState = useSelector((state) => state.login);
    const { isAuthenticated ,isOrgCodeValid,organizationName} = loginState;
    let navItemClass = ['nav-item'];
    if (windowSize.width <= 575) {
        navItemClass = [...navItemClass, 'd-none'];
    }

    return (
        <React.Fragment>
            <ListGroup as="ul" bsPrefix=" " className="navbar-nav mr-auto">
                <ListGroup.Item style={{textTransform: 'capitalize'}} variant={'link'} as="li" bsPrefix=" " className={navItemClass.join(' ')}>
                <h4 style={{position:'relative',top:'20px',textTransform: 'capitalize'}}>{organizationName}</h4>
                            {'Hello '+ userinfo.username}  
                </ListGroup.Item>
                {/* <ListGroup.Item as="li" bsPrefix=" " className="nav-item">
                    <NavSearch windowWidth={windowSize.width} />
                </ListGroup.Item> */}
            </ListGroup>
            
        </React.Fragment>
    );
};

export default NavLeft;
