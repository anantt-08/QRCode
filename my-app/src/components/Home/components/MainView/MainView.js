import React from 'react';
import * as s from './MainView.styles';
import UserPage from "../../../Adminpage/UserPage";
const MainView = () => {
  return (
  	<>
    <s.MainViewContainer>
      <UserPage />
    </s.MainViewContainer>
  </>
  )
}

export default MainView