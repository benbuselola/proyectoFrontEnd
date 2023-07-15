function obtenerData() {
    return new Promise((bien, mal) => {
      fetch("https://www.balldontlie.io/api/v1/players")
        .then(response => {
          return response.json();
        })
        .then(data => {
          bien(data);
        })
        .catch(error => {
          mal(error);
        });
    });
  }
  
  async function mostrarData() {
    try {
      const data = await obtenerData();
      console.log(data);
      await doData(data); // Esperar a que se completen todas las solicitudes
    } catch (error) {
      console.log("Error:", error);
    }
  }
  
  async function obtenerDatosUrl(url) {
    try {
      const respuesta = await fetch(url);
      const datos = await respuesta.json();
      return datos;
    } catch (error) {
      console.error('Error:', error);
    }
  }

mostrarData();