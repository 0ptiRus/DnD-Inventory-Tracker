const express = require('express');
const authenticateToken = require('../middleware/auth');
const Character = require('../models/Character');
const Item = require('../models/Item');
const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  const { name } = req.body;
  try {
    const character = await Character.create(name, req.user.id);
    res.status(201).json(character);
  } catch (error) {
    res.status(400).json({ error: 'Error creating character' });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  try {
    const characters = await Character.getByUserId(req.user.id);
    res.json(characters);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching characters' });
  }
});

router.delete('/:characterId', authenticateToken, async (req, res) => {
  const { characterId } = req.params;
  try {
    await Character.delete(characterId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Error deleting character' });
  }
});

router.post('/:characterId/inventory/add', authenticateToken, async (req, res) => {
  const { characterId } = req.params;
  const { name, itemType, section } = req.body;

  try {
    const newItem = await Item.add(characterId, name, itemType, section);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: 'Error adding item to inventory' });
  }
});

router.post('/:characterId/inventory/move/:itemId', authenticateToken, async (req, res) => {
  const { itemId } = req.params;
  const { section } = req.body;

  console.log(itemId, section);

  try {
    await Item.update(itemId, section);
    res.status(204).send();
    console.log("updated item");

  } catch (error) {
    res.status(400).json({ error: 'Error moving item' });
  }
});

router.delete('/:characterId/inventory/remove/:itemId', authenticateToken, async (req, res) => {
  const { itemId } = req.params;
  try {
    await Item.remove(itemId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Error removing item from inventory' });
  }
});

router.get('/:characterId/inventory', authenticateToken, async (req, res) => {
  const { characterId } = req.params;

  try {
    const items = await Item.getByCharacterId(characterId);
    res.json(items);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching inventory items' });
  }
});

module.exports = router;
