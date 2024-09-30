const pool = require('../config/db');

class Character {
  static async create(characterName, userId) {
    const result = await pool.query(
      'INSERT INTO characters (name, user_id) VALUES ($1, $2) RETURNING id',
      [characterName, userId]
    );
    return result.rows[0]; 
  }

  static async getByUserId(userId) {
    const result = await pool.query(
      'SELECT * FROM characters WHERE user_id = $1',
      [userId]
    );
    return result.rows; 
  }

  static async delete(characterId) {
    await pool.query(
      'DELETE FROM characters WHERE id = $1',
      [characterId]
    );
  }
}

module.exports = Character;
