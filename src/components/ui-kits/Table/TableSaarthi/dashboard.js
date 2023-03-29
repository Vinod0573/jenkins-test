import React from 'react';

import Table from './TableSaarthi';
import { data } from './mockData';
import { tableConstants } from './tableConstant';


const Dashboard = () => {

  const handleEdit = (item) => () => {
    // write your logic
  }

  return (
    <div className='row'>
      <div className=''>
        <h4>Default Table</h4>
        <Table cols={tableConstants(handleEdit)} data={data} />
      </div>
    </div >

  )
}

export default Dashboard;