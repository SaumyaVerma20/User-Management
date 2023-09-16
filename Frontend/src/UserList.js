import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers, deleteUser } from './store/userSlice';

const UserList = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  const styles = {
    container: {
      margin: '20px auto',
      maxWidth: '600px',
      padding: '20px',
      backgroundColor: '#f8f8f8',
      borderRadius: '4px',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: '24px',
      marginBottom: '20px',
    },
    addUserBtn: {
      display: 'inline-block',
      padding: '8px 16px',
      backgroundColor: '#4caf50',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '4px',
      marginBottom: '16px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '16px',
    },
    tableHeader: {
      backgroundColor: '#2196f3',
      color: 'white',
      padding: '12px 16px',
      textAlign: 'left',
    },
    tableRow: {
      borderBottom: '1px solid #ccc',
    },
    tableCell: {
      padding: '12px 16px',
    },
    actionLink: {
      marginRight: '10px',
      color: '#2196f3',
      textDecoration: 'none',
    },
    deleteBtn: {
      padding: '4px 8px',
      backgroundColor: '#f44336',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>User List</h1>
      <Link to="/add-user" style={styles.addUserBtn}>
        Add User
      </Link>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableRow}>
            <th style={styles.tableHeader}>ID</th>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={styles.tableRow}>
              <td style={styles.tableCell}>{user.id}</td>
              <td style={styles.tableCell}>{user.name}</td>
              <td style={styles.tableCell}>
                <Link to={`/view-user/${user.id}`} style={styles.actionLink}>
                  View
                </Link>
                <Link to={`/edit-user/${user.id}`} style={styles.actionLink}>
                  Edit
                </Link>
                <button onClick={() => handleDeleteUser(user.id)} style={styles.deleteBtn}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
