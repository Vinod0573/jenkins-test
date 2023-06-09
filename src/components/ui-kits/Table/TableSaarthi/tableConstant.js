import React from 'react';

// This is the table constant/settings which needed to render table elements
export const tableConstants = (handleEdit) => {
  return [
    {
      title: 'ID',
      render: rowData => {
        return <span>{rowData.id}</span>;
      },
    },
    {
      title: 'Name',
      render: rowData => {
        return <span>{rowData.name}</span>;
      },
    },
    {
      title: 'Username',
      render: rowData => {
        return <span>{rowData.username}</span>;
      },
    },
    {
      title: 'Email',
      render: rowData => {
        return <span>{rowData.email}</span>;
      },
    },
    {
      title: 'Phone',
      render: rowData => {
        return <span>{rowData.phone}</span>;
      },
    },
    {
      title: 'Language',
      render: rowData => {
        return <span>{rowData.language}</span>;
      },
    },
    {
      title: 'Role',
      render: rowData => {
        return <span>{rowData.role}</span>;
      },
    },
    {
      title: 'Project',
      render: rowData => {
        return <span>{rowData.project}</span>;
      },
    },
    {
      title: 'Status',
      render: rowData => {
        return <span>{rowData.status}</span>;
      },
    },

    {
      title: 'Website',
      render: rowData => {
        return <span>{rowData.website}</span>;
      },
    },
    {
      title: 'Action',
      render: rowData => {
        return <button className='btn btn-warning' onClick={handleEdit(rowData)}>Edit</button>
      },
    },
  ];
};