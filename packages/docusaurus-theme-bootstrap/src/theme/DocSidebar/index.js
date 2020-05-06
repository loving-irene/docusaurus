/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import {NavItem, Nav} from 'reactstrap';
import classNames from 'classnames';

import './index.css';

const DocSidebarItem = ({item, onItemClick, collapsible, ...props}) => {
  const {items, href, label, type} = item;

  switch (type) {
    case 'category':
      return (
        items.length > 0 && (
          <div>
            <h4 className="ml-2">{label}</h4>
            {items.map((childItem) => (
              <DocSidebarItem
                key={childItem.label}
                item={childItem}
                onItemClick={onItemClick}
              />
            ))}
          </div>
        )
      );

    case 'link':
    default:
      return (
        <li key={label}>
          <Link
            className="m-4"
            to={href}
            {...(isInternalUrl(href)
              ? {
                  isNavLink: true,
                  activeClassName: 'menu__link--active',
                  exact: true,
                  onClick: onItemClick,
                }
              : {
                  target: '_blank',
                  rel: 'noreferrer noopener',
                })}
            {...props}>
            {label}
          </Link>
        </li>
      );
  }
};

const DocSidebar = (props) => {
  const {docsSidebars, sidebar: currentSidebar, sidebarCollapsible} = props;

  if (!currentSidebar) {
    return null;
  }

  const sidebarData = docsSidebars[currentSidebar];

  if (!sidebarData) {
    throw new Error(
      `Cannot find the sidebar "${currentSidebar}" in the sidebar config!`,
    );
  }

  return (
    <div className={classNames('sidebar', {'is-open': props.sidebarShown})}>
      <div className="sidebar-header">
        <button
          color="info"
          type="button"
          onClick={props.handleSidebarToggle}
          style={{color: '#fff'}}>
          &times;
        </button>
        <h3>Sidebar</h3>
      </div>
      <div className="side-menu">
        <Nav vertical className="list-unstyled pb-3 mr-auto">
          <NavItem>
            {sidebarData.map((item) => (
              <DocSidebarItem
                key={item.label}
                item={item}
                onItemClick={(e) => {
                  e.target.blur();
                }}
                collapsible={sidebarCollapsible}
              />
            ))}
          </NavItem>
        </Nav>
      </div>
    </div>
  );
};

export default DocSidebar;