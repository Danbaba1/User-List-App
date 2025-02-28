import { userService } from '../services/userService.js';

export const userController = {
  /**
   * Get all users
   */
  async getUsers(req, res) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 20;
      const users = await userService.getAllUsers(limit);
      
      return res.status(200).json({
        users,
        total: users.length,
        skip: 0,
        limit
      });
    } catch (error) {
      console.error('Error in getUsers controller:', error);
      return res.status(500).json({ message: 'Failed to fetch users' });
    }
  },

  /**
   * Get a user by ID
   */
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      
      if (!user) {
        return res.status(404).json({ message: `User with ID ${id} not found` });
      }
      
      return res.status(200).json(user);
    } catch (error) {
      console.error(`Error in getUserById controller for ID ${req.params.id}:`, error);
      return res.status(500).json({ message: `Failed to fetch user with ID ${req.params.id}` });
    }
  }
};