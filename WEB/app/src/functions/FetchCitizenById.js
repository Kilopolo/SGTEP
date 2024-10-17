import { firestore } from "../database/firebase";
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";

const FetchCitizenById = async (citizenId) => {
  try {
    // const citizenRef = doc(firestore, "citizens", citizenId);
    // const citizenSnapshot = await getDoc(citizenRef);
    const querySnapshot = await getDoc(
        query(collection(firestore, "citizens"), where("usuario_id", "==", citizenId))
      );

    if (querySnapshot.exists()) {
      const citizenData = { id: querySnapshot.id, ...querySnapshot.data() };
      console.log("Datos del ciudadano:", citizenData);
      return citizenData; // Retorna los datos del ciudadano
    } else {
      console.log("No se encontró al ciudadano con el ID proporcionado");
      return null; // Retorna null si no se encuentra el ciudadano
    }
  } catch (error) {
    console.error("Error obteniendo datos del ciudadano:", error);
    throw error;
  }
};

export default FetchCitizenById;
