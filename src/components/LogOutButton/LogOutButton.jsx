import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function LogOutButton(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  function pushToHome() {

    history.push('/')
  }

  function resetProviderLanding() {

    dispatch({
      type: 'RESET_PROVIDER_LANDING_OBJ'
    })
  }

  // function resetAdmin() {

  //   dispatch({
  //     type: 'RESET_ADMIN_OBJ'
  //   })
  // }

  return (
    <button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      onClick={() => dispatch({ type: 'LOGOUT', pushToHome: pushToHome, resetProviderLanding: resetProviderLanding})}
    >
      Log Out
    </button>
  );
}

export default LogOutButton;
