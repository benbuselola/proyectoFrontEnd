import "./tarjetas.css";

function Card (){
    return(
        <div className="Card">
            <h2>Nombre Pokemon</h2>
            <img src="https://media.licdn.com/dms/image/D4E03AQFAuIV9Y7bxGA/profile-displayphoto-shrink_200_200/0/1683691494835?e=1695254400&v=beta&t=7mO0Uk4DSABNj6xFcwzE8ZSbPqrLRSAgINbKfk3OvZo" alt="" />
            <p>Numero</p>
            <p>Tipo</p>
            <p>Altura</p>
            <p>Peso</p>
        </div>
    );
}

export default Card;