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

    let navItemClass = ['nav-item'];
    if (windowSize.width <= 575) {
        navItemClass = [...navItemClass, 'd-none'];
    }

    return (
        <React.Fragment>
            <ListGroup as="ul" bsPrefix=" " className="navbar-nav mr-auto">
                <ListGroup.Item variant={'link'} as="li" bsPrefix=" " className={navItemClass.join(' ')}>
                            {'Hello '+ userinfo.username}     
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix=" " className="nav-item">
                    <NavSearch windowWidth={windowSize.width} />
                </ListGroup.Item>
            </ListGroup>
        </React.Fragment>
    );
};

export default NavLeft;
