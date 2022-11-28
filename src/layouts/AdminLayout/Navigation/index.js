import React, { useContext } from 'react';
import { ConfigContext } from '../../../contexts/ConfigContext';
import useWindowSize from '../../../hooks/useWindowSize';
import NavLogo from './NavLogo';
import NavContent from './NavContent';
import navigation from '../../../menu-items';
import { useSelector} from 'react-redux';
import { role } from '../../../role';
const Navigation = () => {
    const configContext = useContext(ConfigContext);
    const { collapseMenu } = configContext.state;
    const windowSize = useWindowSize();
    const profile=useSelector(state=>state.userinfo)
    let item_list=navigation.items
    if(profile.role===role.SUPERAGENT)
    {
        item_list=navigation.items.map(e=>{
            if(e.title==='Manage Trip')
            {
                return {...e,children:[...(e.children.filter(e=>e.id==='ticket'||e.id==='user'))]}
            }
            return e
        })
    }
    if(profile.role===role.CASHERAGENT)
    {
        item_list=navigation.items.map(e=>{
            if(e.title==='Manage Trip')
            {
                return {...e,children:[...(e.children.filter(e=>e.id==='ticket'))]}
            }
            return e
        })
    }
    if(profile.role===role.CASHER)
    {
        item_list=navigation.items.map(e=>{
            if(e.title==='Manage Trip')
            {
                return {...e,children:[...(e.children.filter(e=>e.id==='ticket'||e.id==='shedule'))]}
            }
            return e
        })
    }

    let navClass = [
        'pcoded-navbar',
        'menupos-static',
        'menu-dark',
        'navbar-default',
        'brand-default',
        'drp-icon-style1',
        'menu-item-icon-style1',
        'active-default',
        'title-default'
    ];

    if (windowSize.width < 992 && collapseMenu) {
        navClass = [...navClass, 'mob-open'];
    } else if (collapseMenu) {
        navClass = [...navClass, 'navbar-collapsed'];
    }

    let navStyle;

    let navBarClass = ['navbar-wrapper'];
    // profile.role!==role.CASHER
    let navContent = (
        <div className={navBarClass.join(' ')}>
            <NavLogo />
            <NavContent navigation={item_list} />
        </div>
    );
    if (windowSize.width < 992) {
        navContent = (
            <div className="navbar-wrapper">
                <NavLogo />
                <NavContent navigation={item_list} />
            </div>
        );
    }
    return (
        <React.Fragment>
            <nav className={navClass.join(' ')} style={navStyle}>
                {navContent}
            </nav>
        </React.Fragment>
    );
};

export default Navigation;
