import axios from 'axios';
import User from '../models/User.js';

// Base URL for the dummy API
const DUMMY_API_URL = 'https://dummyjson.com/users';

export const userService = {
  /**
   * Fetch users from the dummy API and store them in our database
   */
  async fetchAndStoreUsers(limit = 20) {
    try {
      // Fetch users from the dummy API
      const response = await axios.get(`${DUMMY_API_URL}?limit=${limit}`);
      const { users } = response.data;

      // Store users in our database (upsert to avoid duplicates)
      for (const user of users) {
        await User.findOneAndUpdate(
          { id: user.id },
          {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            gender: user.gender,
            image: user.image,
            age: user.age,
            phone: user.phone,
            birthDate: user.birthDate
          },
          { upsert: true, new: true }
        );
      }

      // Return the users from our database
      return await User.find().sort({ id: 1 }).limit(limit);
    } catch (error) {
      console.error('Error fetching and storing users:', error);
      throw new Error('Failed to fetch and store users');
    }
  },

  /**
   * Get all users from our database
   */
  async getAllUsers(limit = 20) {
    try {
      // Check if we have users in our database
      const count = await User.countDocuments();
      
      // If we don't have users, fetch them from the dummy API
      if (count === 0) {
        return await this.fetchAndStoreUsers(limit);
      }
      
      // Return users from our database
      return await User.find().sort({ id: 1 }).limit(limit);
    } catch (error) {
      console.error('Error getting all users:', error);
      throw new Error('Failed to get users');
    }
  },

  /**
   * Get a user by ID
   */
  async getUserById(id) {
    try {
      // Try to find the user in our database
      let user = await User.findOne({ id: Number(id) });
      
      // If we don't have the user, fetch it from the dummy API
      if (!user) {
        const response = await axios.get(`${DUMMY_API_URL}/${id}`);
        const userData = response.data;
        
        // Store the user in our database
        user = await User.findOneAndUpdate(
          { id: userData.id },
          {
            id: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            gender: userData.gender,
            image: userData.image,
            age: userData.age,
            phone: userData.phone,
            birthDate: userData.birthDate
          },
          { upsert: true, new: true }
        );
      }
      
      return user;
    } catch (error) {
      console.error(`Error getting user with ID ${id}:`, error);
      throw new Error(`Failed to get user with ID ${id}`);
    }
  }
};