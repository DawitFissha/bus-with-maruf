import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ConfigContext } from '../../../../contexts/ConfigContext';
import * as actionType from '../../../../store/actions';
import { useDispatch } from 'react-redux';
import { dashboardActions } from '../../../../store/dashboard-slice';
const NavLogo = () => {
    const configContext = useContext(ConfigContext);
    const { collapseMenu } = configContext.state;
    const { dispatch } = configContext;
    const dispatc=useDispatch()
    const HandleClick=()=>{
        console.log("click")
        dispatch({ type: actionType.COLLAPSE_MENU })
        dispatc(dashboardActions.toggleShow())

    }
    let toggleClass = ['mobile-menu'];
    if (collapseMenu) {
        toggleClass = [...toggleClass, 'on'];
    }

    return (
        <React.Fragment>
            <div className="navbar-brand header-logo">
                <Link to="/dashboard" className="b-brand">
                    <div className="b-bg">
                        <i className="feather icon-trending-up" />
                    </div>
                    <span className="b-title">Admin Dashboard</span>
                </Link>
                <Link
                    to="#"
                    className={toggleClass.join(' ')}
                    id="mobile-collapse"
                    onClick={HandleClick}
                >
                    <span />
                </Link>
            </div>
        </React.Fragment>
    );
};

export default NavLogo;
