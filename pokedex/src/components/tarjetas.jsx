import "./tarjetas.css";



function Card (){
    return(
        <div className="Card">
            <div className="contenido">
            <h2 className="nombre">Nombre Pokemon</h2>
            <img className="imagen"src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5mTO-X4htxNYHpD15i1Th-SSGVdJe7lptoCw9M6bsRA&s" alt="" />
            <p className="datos">Numero</p>
            <p className="datos">Tipo</p>
            <p className="datos">Altura</p>
            <p className="datos">Peso</p>
            </div>
        </div>
    );
}

export default Card;