import { ReactComponent as Profile } from './icons/user.svg'
import {ReactComponent as Plus} from './icons/plus.svg'
import {ReactComponent as Cog } from './icons/cog.svg'
import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

function LogMenu() {
  return (
    <div>
      
    <Navbar>

      <NavItem id="profile" icon={<Profile />}/>
      <NavItem icon={<Plus></Plus>}/>
      <NavItem icon={<Cog></Cog> }/>
    </Navbar>
    </div>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);
  let href = '#'
  // getting things to work by id
  if(props.id === "chat"){
    href = './chatmenu'
  }


  return (
    <li className="nav-item">
      <a href={href} className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

export default LogMenu;