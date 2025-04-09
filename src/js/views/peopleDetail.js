import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const PeopleDetail = () => {
    const [person, setPerson] = useState(null); // Estado para almacenar los datos de la persona
    const [error, setError] = useState(null); // Estado para manejar errores
    const { uid } = useParams(); // uid es el parámetro de la URL
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPerson = async () => {
            if (!uid) {
                setError("Invalid person ID.");
                return;
            }

            const url = `https://swapi.dev/api/people/${uid}/`;
            console.log(`Fetching person details from: ${url}`);

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                const data = await response.json();
                setPerson(data); // Guardamos los datos de la persona en el estado
            } catch (error) {
                console.error("Error fetching person:", error);
                setError(error.message || "Failed to fetch person details.");
            }
        };

        fetchPerson();
    }, [uid]);

    const peopleImg = {
        "Luke Skywalker": "https://lumiere-a.akamaihd.net/v1/images/luke-skywalker-main_7ffe21c7.jpeg?region=130%2C147%2C1417%2C796",
		"C-3PO": "https://www.gamereactor.es/media/70/light_upc_3pohead_4357033_650x.jpg",
		"R2-D2": "https://i.blogs.es/6de2fa/r2d2/1366_2000.webp",
		"Darth Vader": "https://imagenes.cadena100.es/files/og_thumbnail/uploads/2024/09/20/66ed7d3989217.jpeg",
		"Leia Organa": "https://cinepremiere.com.mx/wp-content/uploads/2020/06/Leia-Organa-Star-Wars--1024x559.jpg",
		"Owen Lars": "https://images2.minutemediacdn.com/image/upload/c_crop,x_762,y_0,w_2847,h_1601/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/ImageExchange/mmsport/319/01j042f763qcer531j30.jpg",
		"Beru Whitesun lars": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgAqKX72ZgFxo2DihDl89cGLdXep_nc25g1A&s",
		"R5-D4": "https://static.wikia.nocookie.net/star-wars-canon-extended/images/2/23/R5.jpg/revision/latest/scale-to-width-down/374?cb=20160123232521",
		"Biggs Darklighter": "https://i.insider.com/555219ca6bb3f7a502baac2c?width=700",
		"Obi-Wan Kenobi": "https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2020/12/obi-wan-kenobi.jpg?fit=2052%2C1155&quality=50&strip=all&ssl=1"
    };

    const personImageUrl = person ? peopleImg[person.name] : '';

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

    if (!person) {
        return <div>Loading...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
    }

    return (
        <div className="detail-container">
            <div className="detail-content">
                <div className="detail-image">
                    <img src={personImageUrl} alt={person.name} />
                </div>
                <div className="detail-info">
                    <h1>{person.name}</h1>
                    <ul>
                        <li><strong>Height:</strong> {person.height}</li>
                        <li><strong>Mass:</strong> {person.mass}</li>
                        <li><strong>Hair Color:</strong> {person.hair_color}</li>
                        <li><strong>Skin Color:</strong> {person.skin_color}</li>
                        <li><strong>Eye Color:</strong> {person.eye_color}</li>
                        <li><strong>Birth Year:</strong> {person.birth_year}</li>
                        <li><strong>Gender:</strong> {person.gender}</li>
                    </ul>
                    <Link to="/" className="btn btn-primary">Back to Home</Link>
                </div>
            </div>
        </div>
    );
};