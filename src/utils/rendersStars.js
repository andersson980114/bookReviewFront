import { FaStar } from "react-icons/fa";

export const rendersStars = (calificacion) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar key={i} size={24} color={i < calificacion ? 'orange' : 'gray'} />
      );
    }
    return stars;
};