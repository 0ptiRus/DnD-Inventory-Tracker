import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [newCharacterName, setNewCharacterName] = useState("");
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/characters`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setCharacters(data);
      } catch (error) {
        console.error("Error fetching characters", error);
      }
    };
    fetchCharacters();
  }, [token]);

  const handleCreateCharacter = async () => {
    if (!newCharacterName) return;
    try {
      const response = await fetch(`http://localhost:4000/api/characters`, {
        method: "POST",
        headers: { 
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newCharacterName }),
      });
      const newCharacter = await response.json();
      setCharacters([...characters, newCharacter]);
      setNewCharacterName("");
    } catch (error) {
      console.error("Error creating character", error);
    }
  };

  const onSelectCharacter = (characterId) => {
    if (characterId != undefined) {
      navigate(`/inventory/${characterId}`);
    } else {
      console.error("Invalid character ID");
    }
  };

  const handleDeleteCharacter = async (characterId) => {
    try {
      await fetch(`http://localhost:4000/api/characters/${characterId}`, {
        method: "DELETE",
        headers: { 
          'Authorization': `Bearer ${token}`,
        },
      });
      setCharacters(characters.filter((character) => character.id !== characterId));
    } catch (error) {
      console.error("Error deleting character", error);
    }
  };

  return (
    <div className="character-list">
      <h2>Your Characters</h2>
      <ul>
        {characters.map((character) => (
          <li key={character.id}>
            <span>{character.name}</span>
            <button onClick={() => onSelectCharacter(character.id)}>Access Inventory</button>
            <button onClick={() => handleDeleteCharacter(character.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <div className="create-character">
        <input
          type="text"
          placeholder="Enter new character name"
          value={newCharacterName}
          onChange={(e) => setNewCharacterName(e.target.value)}
        />
        <button onClick={handleCreateCharacter}>Create Character</button>
      </div>
    </div>
  );
};

export default Characters;
