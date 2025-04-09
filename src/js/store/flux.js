const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            people: [],
            planets: [],
            vehicles: [],
            favorites: []
        },
        actions: {
            loadPeopleData: () => {
                fetch('https://www.swapi.tech/api/people/')
                    .then(resp => resp.json())
                    .then(respJson => {
                        const response = respJson.results;
                        setStore({ people: response });
                    });
            },
            loadPlanetsData: () => {
                fetch('https://www.swapi.tech/api/planets/')
                    .then(resp => resp.json())
                    .then(respJson => {
                        const response = respJson.results;
                        setStore({ planets: response });
                    });
            },
            loadVehiclesData: () => {
                fetch('https://www.swapi.tech/api/vehicles/')
                    .then(resp => resp.json())
                    .then(respJson => {
                        const response = respJson.results;
                        setStore({ vehicles: response });
                    });
            },

            addFavorite: (item) => {
                const store = getStore();
                if (!store.favorites.some(fav => fav.uid === item.uid && fav.type === item.type)) {
                    const updatedFavorites = [...store.favorites, item];
                    setStore({ favorites: updatedFavorites });
                    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
                }
            },

            removeFavorite: (uid, type) => {
                const store = getStore();
                const updatedFavorites = store.favorites.filter(fav => !(fav.uid === uid && fav.type === type));
                setStore({ favorites: updatedFavorites });
                localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            },

            // 👉 Nueva acción para cargar favoritos desde localStorage
            loadFavoritesFromStorage: () => {
                const storedFavorites = localStorage.getItem("favorites");
                if (storedFavorites) {
                    try {
                        const parsed = JSON.parse(storedFavorites);
                        setStore({ favorites: parsed });
                    } catch (err) {
                        console.error("Error al parsear favoritos desde localStorage:", err);
                    }
                }
            }
        }
    };
};

export default getState;
