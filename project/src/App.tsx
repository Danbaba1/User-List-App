import React, { useEffect, useState } from 'react';
import { fetchUsers, fetchUserById } from './api';
import { User } from './types';
import { UserList } from './components/UserList';
import { UserDetails } from './components/UserDetails';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data.users);
      } catch (err) {
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleSelectUser = async (user: User) => {
    try {
      setLoadingDetails(true);
      // Fetch the full user details from the API
      const userDetails = await fetchUserById(user.id);
      setSelectedUser(userDetails);
    } catch (err) {
      setError(`Failed to load details for ${user.firstName} ${user.lastName}`);
    } finally {
      setLoadingDetails(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-lg">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">User Directory</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow">
            <UserList
              users={users}
              onSelectUser={handleSelectUser}
              selectedUserId={selectedUser?.id}
            />
          </div>
          {loadingDetails ? (
            <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center">
              <p className="text-lg">Loading user details...</p>
            </div>
          ) : selectedUser ? (
            <div>
              <UserDetails user={selectedUser} />
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center">
              <p className="text-gray-500">Select a user to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;