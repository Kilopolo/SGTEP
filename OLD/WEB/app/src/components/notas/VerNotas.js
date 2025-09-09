import React, { useEffect, useState } from 'react';
import LoadingLogo from '../LoadingLogo';
import { collection, getDocs } from "@firebase/firestore";
import {firestore} from "../../database/firebase";


function VerNotas({ notas }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsers();
      }, []);
    
  
      const fetchUsers = async () => {
        console.log("Fetching data...");
        try {
          const querySnapshot = await getDocs(collection(firestore, "notas"));
          const usersData = [];
    
          querySnapshot.forEach((doc) => {
            usersData.push({ id: doc.id, ...doc.data() });
          });
    
          console.log("Fetched data:", usersData);
    
          setData(usersData);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };


      if (loading) {
        return (
            <div>
                <LoadingLogo></LoadingLogo>
            </div>)
    }

    return (
        <div className="ver-notas-container">
            <h2>Ver Notas</h2>
            {notas.length === 0 ? (
                <p>No hay notas disponibles</p>
            ) : (
                <ul>
                    {notas.map((nota, index) => (
                        <li key={index}>{nota}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default VerNotas;
