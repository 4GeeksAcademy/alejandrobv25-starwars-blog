import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export const PlanetsDetail = () => {
    const [planet, setPlanet] = useState(null); // Estado para almacenar los datos del planeta
    const [error, setError] = useState(null); // Estado para manejar errores
    const { uid } = useParams(); // uid es el parámetro de la URL
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlanet = async () => {
            if (!uid) {
                setError("Invalid planet ID.");
                return;
            }

            const url = `https://swapi.dev/api/planets/${uid}/`;
            console.log(`Fetching planet details from: ${url}`);

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                const data = await response.json();
                setPlanet(data); // Guardamos los datos del planeta en el estado
            } catch (error) {
                console.error("Error fetching planet:", error);
                setError(error.message || "Failed to fetch planet details.");
            }
        };

        fetchPlanet();
    }, [uid]);

    const planetsImg = {
        "Tatooine": "https://static.wikia.nocookie.net/esstarwars/images/b/b0/Tatooine_TPM.png/revision/latest?cb=20131214162357",
        "Alderaan": "https://static.wikia.nocookie.net/esstarwars/images/4/4a/Alderaan.jpg/revision/latest?cb=20100723184830",
        "Yavin IV": "https://static.wikia.nocookie.net/esstarwars/images/d/d4/Yavin-4-SWCT.png/revision/latest?cb=20170924222729",
        "Hoth": "https://static.wikia.nocookie.net/esstarwars/images/8/81/Hoth_AoRCR.png/revision/latest?cb=20220720013233",
        "Dagobah": "https://static.wikia.nocookie.net/esstarwars/images/1/1c/Dagobah.jpg/revision/latest?cb=20061117132132",
        "Bespin": "https://static.wikia.nocookie.net/esstarwars/images/2/2c/Bespin_EotECR.png/revision/latest?cb=20170527220537",
        "Endor": "https://static.wikia.nocookie.net/esstarwars/images/e/e5/Endor-SWCT.png/revision/latest?cb=20170629180854",
        "Naboo": "https://static.wikia.nocookie.net/esstarwars/images/f/f0/Naboo_planet.png/revision/latest?cb=20190928214307",
        "Coruscant": "https://static.wikia.nocookie.net/esstarwars/images/1/16/Coruscant-EotE.jpg/revision/latest?cb=20221030195452",
        "Kamino": "https://static.wikia.nocookie.net/esstarwars/images/a/a9/Eaw_Kamino.jpg/revision/latest?cb=20210616005549"
    };

    const planetImageUrl = planet ? planetsImg[planet.name] : ''; // Busca la imagen del planeta

    if (error) {
        return (
            <div className="container">
                <h1>Error</h1>
                <p>{error}</p>
                <Link to="/" className="btn btn-primary">
                    Back to Home
                </Link>
            </div>
        );
    }

    if (!planet) {
        return <div>Loading...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>{planet.name}</h1>
                    <img src={planetImageUrl} alt={planet.name} className="img-fluid" />
                    <ul>
                        <li><strong>Climate:</strong> {planet.climate}</li>
                        <li><strong>Diameter:</strong> {planet.diameter}</li>
                        <li><strong>Gravity:</strong> {planet.gravity}</li>
                        <li><strong>Orbital Period:</strong> {planet.orbital_period}</li>
                        <li><strong>Population:</strong> {planet.population}</li>
                        <li><strong>Rotation Period:</strong> {planet.rotation_period}</li>
                        <li><strong>Surface Water:</strong> {planet.surface_water}</li>
                        <li><strong>Terrain:</strong> {planet.terrain}</li>
                    </ul>
                    <Link to="/" className="btn btn-primary">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};