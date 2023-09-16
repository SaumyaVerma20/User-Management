import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addUser, updateUser } from './store/userSlice';

const AddEditUser = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.user);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (id) {
      const user = users.find(user => String(user.id) === String(id));
      if (user) {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
      }
    }
  }, [id, users]);

  const handleSubmit = e => {
    e.preventDefault();

    const newUser = {
      id: id ? id : String(Date.now()),
      name,
      email,
      phone
    };

    if (id) {
      dispatch(updateUser(newUser));
    } else {
      dispatch(addUser(newUser));
    }

    history.push('/');
  };

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
    form: {
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      marginBottom: '8px',
      fontSize: '16px',
      fontWeight: 'bold'
    },
    input: {
      marginBottom: '16px',
      padding: '8px',
      fontSize: '14px',
      borderRadius: '4px',
      border: '1px solid #ccc'
    },
    button: {
      padding: '8px 16px',
      backgroundColor: '#4caf50',
      color: 'white',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>{id ? 'Edit User' : 'Add User'}</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Name:
          <input type="text" value={name} onChange={e => setName(e.target.value)} style={styles.input} />
        </label>
        <label style={styles.label}>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={styles.input} />
        </label>
        <label style={styles.label}>
          Phone:
          <input type="text" value={phone} onChange={e => setPhone(e.target.value)} style={styles.input} />
        </label>
        <button type="submit" style={styles.button}>
          {id ? 'Update User' : 'Add User'}
        </button>
      </form>
    </div>
  );
};

export default AddEditUser;
