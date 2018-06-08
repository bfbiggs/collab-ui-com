import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, NavLink, withRouter, Switch, Redirect } from 'react-router-dom';

import fetchRoutes from './actions';
import NotFoundPage from '../NotFound';
import HomeContainer from '../Home';
import AboutPage from '../About';
import ParentContainer from '../containers/Parent';
import HomePage from '../Home';

class Routes extends React.Component {
  componentDidMount() {
    // this.props.fetchRoutes();
  }

  render() {
    const { error, loading, routes } = this.props;
    const createRoutes = routes.map((item, idx) => {
      if (item.children) {
        item.children.map((child, idx) => {
          return (
            <Route
              key={`${child.id}${idx}`}
              exact
              path={`/${item.path}/${child.path}`}
              render={() => <ParentContainer />}
            />
          );
        });
      }

      return (
        <Route
          key={`${item.id}${idx}`}
          exact
          path={`/${item.path}`}
          render={props => <ParentContainer {...props} data={item} />}
        />
      );
    });

    return (
      <Switch>
        {/* <Route exact path="/" component={HomeContainer} /> */}
        <Route key={'home0'} path="/" exact component={HomeContainer} />} />
        {/* {routes && (!loading || !error) && createRoutes} */}
        <Route
          key={`design0`}

          path="/design-principles"
          component={AboutPage}
          // render={() => <ParentContainer title="Design Principles" />}
        />
        <Route
          key={`components0`}

          path="/components"
          component={HomePage}
          // render={() => <ParentContainer title="Components" />}
        />
        {/* <Route key={'NoMatch0'} component={NotFoundPage} /> */}
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  routes: state.routes.routes,
  loading: state.routes.loading,
  error: state.routes.error,
});

export default connect(
  mapStateToProps,
  { fetchRoutes }
)(Routes);
