import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ViewUser = () => {
  const { id } = useParams();
  const { users } = useSelector(state => state.user);
  const user = users.find(user => String(user.id) === String(id));

  const styles = {
    container: {
      margin: '16px auto',
      padding: '16px',
      maxWidth: '400px',
      backgroundColor: '#f8f8f8',
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    heading: {
      marginBottom: '16px',
      textAlign: 'center',
      fontSize: '24px',
      fontWeight: 'bold'
    },
    label: {
      marginBottom: '8px',
      fontSize: '16px',
      fontWeight: 'bold'
    },
    info: {
      marginBottom: '8px',
      fontSize: '14px'
    }
  };

  if (!user) {
    return <div style={styles.container}>User not found</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>User Details</h1>
      <p style={styles.label}>ID:</p>
      <p style={styles.info}>{user.id}</p>
      <p style={styles.label}>Name:</p>
      <p style={styles.info}>{user.name}</p>
      <p style={styles.label}>Email:</p>
      <p style={styles.info}>{user.email}</p>
      <p style={styles.label}>Phone:</p>
      <p style={styles.info}>{user.phone}</p>
    </div>
  );
};

export default ViewUser;
