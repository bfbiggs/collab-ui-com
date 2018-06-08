import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { SideNav, List, ListItem } from '@collab-ui/react';

class SideNavContainer extends React.PureComponent {
  render() {
    const { error, loading, routes } = this.props;
    const createNavLinks = routes.map((item, idx) => {
      if (item.children) {
        item.children.map((child, idx) => {
          return (
            <ListItem
              key={`${child.id}${idx}`}
              label={child.title}
              customAnchorNode={<Link to={`/${item.path}/${child.path}`} />}
            />
          );
        });
      }
      return (
        <ListItem
          key={`${item.id}${idx}`}
          label={item.title}
          customAnchorNode={<NavLink to={`/${item.path}`} />}
        />
      );
    });

    return (
        <List>
          {/* {createNavLinks} */}
          <Link to="/components">Components</Link>
          <Link to="/design-principles">Design Principles</Link>
        </List>
    );
  }
}

const mapStateToProps = state => ({
  routes: state.routes.routes,
  loading: state.routes.loading,
  error: state.routes.error,
});

export default connect(mapStateToProps)(SideNavContainer);
