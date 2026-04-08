import { createContext, useState } from 'react';

export const LikesContext = createContext();

export function LikesProvider({ children }) {
  const [likedCats, setLikedCats] = useState([]);

  const toggleLike = (cat) => {
    setLikedCats((prev) => {
      const exists = prev.some(c => c.id === cat.id);
      if (exists) {
        return prev.filter(c => c.id !== cat.id); // Treure el like
      }
      return [...prev, cat]; // Afegir el like
    });
  };

  const isLiked = (catId) => {
    return likedCats.some(c => c.id === catId);
  };

  return (
    <LikesContext.Provider value={{ likedCats, toggleLike, isLiked }}>
      {children}
    </LikesContext.Provider>
  );
}