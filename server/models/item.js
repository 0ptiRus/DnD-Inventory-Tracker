const pool = require('../config/db');

class Item {
  static async add(characterId, name, itemType, section) {
    const result = await pool.query(
      'INSERT INTO items (character_id, name, item_type, section) VALUES ($1, $2, $3, $4) RETURNING *',
      [characterId, name, itemType, section]
    );
    return result.rows[0]; 
  }

  static async update(item_id, section) 
  {
    await pool.query(
      'UPDATE items SET section=$1 WHERE id=$2',
      [section, item_id]
    );
  }

  static async remove(itemId) {
    await pool.query(
      'DELETE FROM items WHERE id = $1',
      [itemId]
    );
  }

  static async getByCharacterId(characterId) {
    const result = await pool.query(
      'SELECT * FROM items WHERE character_id = $1',
      [characterId]
    );
    return result.rows; 
  }
}

module.exports = Item;
