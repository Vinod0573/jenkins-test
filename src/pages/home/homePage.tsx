import React from 'react';
import Button from '../../components/button/button';
import { useSelector, useDispatch } from 'react-redux';
import { loadHomeAction,getButtonData } from '../../actions/homeActions';
import { IAppState } from '../../store/store';
// import { CircularProgress } from '@material-ui/core';


const HomePage = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: IAppState) => state.homeState.loading);
  const errorMessage = useSelector((state: IAppState) => state.homeState.errorMessage);
  const reducerData=useSelector((state: IAppState)=>state.homeState)

  return (
     <div onClick={() => {
       dispatch(loadHomeAction(true))
       dispatch(getButtonData("priya"))
       }}>
        <Button buttonName="Add Data"/>
        {/* {loading? <CircularProgress size="80px" color="primary"></CircularProgress> : ''} */}
        {errorMessage && !loading? <span>Error</span> : ''}
        
    </div>
  );
}

export default HomePage;