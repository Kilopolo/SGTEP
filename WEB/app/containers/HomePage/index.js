/**
 *
 * HomePage
 *
 */

import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Alert,
  Button,
  Container,
  Nav,
  Navbar,
  NavItem,
  NavbarBrand,
} from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Email and Google as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

export function HomePage({ loading, error  }) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  const [isSignedIn, setSignedIn] = useState(false);

  useEffect(() => {
    // componentDidMount
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(firebaseUser => {
        setSignedIn(!!firebaseUser);
      });

    // componentWillUnmount
    return () => {
      unregisterAuthObserver();
    };
  }, []);

  function logout() {
    firebase.auth().signOut();
  }

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand>Home</NavbarBrand>
        {isSignedIn && (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Button color="danger" type="button" onClick={logout}>
                Logout
              </Button>
            </NavItem>
          </Nav>
        )}
      </Navbar>
      <Container className="mt-3" fluid>
        {loading ? (
          <Alert color="info">Loading...</Alert>
        ) : (
          <div>
            {isSignedIn ? (
              <>
                {error && <Alert color="danger">{error.message}</Alert>}
                <h3>
                  Welcome {firebase.auth().currentUser.displayName}! You are now
                  signed-in!
                </h3>
              </>
            ) : (
              <>
                <h5 className="text-center">Login:</h5>
                <StyledFirebaseAuth
                  uiConfig={uiConfig}
                  firebaseAuth={firebase.auth()}
                />
              </>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
