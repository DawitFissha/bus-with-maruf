import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import NavLeft from './NavLeft';
import NavRight from './NavRight';
import { ConfigContext } from '../../../contexts/ConfigContext';
import * as actionType from '../../../store/actions';
import {useDispatch ,useSelector} from 'react-redux';
import { dashboardActions } from '../../../store/dashboard-slice';

const NavBar = () => {
    const configContext = useContext(ConfigContext);
    const { collapseMenu } = configContext.state;
    const dispatc=useDispatch()
    const { dispatch } = configContext;
    let headerClass = ['navbar', 'pcoded-header', 'navbar-expand-lg', 'navbar-default'];
    let toggleClass = ['mobile-menu'];
    if (collapseMenu) {
        toggleClass = [...toggleClass, 'on'];
    }
    console.log("maruf")
    const navToggleHandler = () => {
        console.log("toggle")
        dispatch({ type: actionType.COLLAPSE_MENU});
        dispatc(dashboardActions.toggleShow())
    };
    const stateShow = useSelector((state) => state.dashboard);
    console.log(stateShow)
    let collapseClass = ['collapse navbar-collapse'];
    let navBar = (
        <React.Fragment>
            <div className="m-header">
                <Link to="#" className={toggleClass.join(' ')} id="mobile-collapse" onClick={navToggleHandler}>
                    <span />
                </Link>
                <Link to="#" className="b-brand">
                    <div className="b-bg">
                        <i className="feather icon-trending-up" />
                    </div>
                    <span className="b-title">Admin Dashboard</span>
                </Link>
            </div>
            <div className={collapseClass.join(' ')}>
                <NavLeft />
                <NavRight />
            </div>
        </React.Fragment>
    );
    return (
        <React.Fragment>
            <header style={{boxShadow:' rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset'}} className={headerClass.join(' ')}>{navBar}</header>
        </React.Fragment>
    );
};

export default NavBar;
