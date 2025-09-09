import { firestore } from "../database/firebase";
import { collection, getDocs } from "@firebase/firestore";

const FetchNotas = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "notas"));
      const partyData = [];

      querySnapshot.forEach((doc) => {
        partyData.push({ id: doc.id, ...doc.data() });
      });

      console.log("AIDIOMIO", partyData);
      resolve(partyData); // Resuelve la promesa con los datos obtenidos
    } catch (error) {
      console.error("Error fetching data:", error);
      reject(error); // Rechaza la promesa en caso de error
    }
  });
};

export default FetchNotas;
