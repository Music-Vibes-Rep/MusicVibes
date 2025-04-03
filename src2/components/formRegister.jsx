import React from 'react';

function formRegister() {
    return (
        <div>
            <h1>Formulario registro</h1>
            <form action="">
                <label htmlFor="">
                    Nombre:
                    <input type="Nombre" name='Nombre' id='Nombre' />
                </label>
                <label htmlFor="">
                    Apellido:
                    <input type="Apellido" name='Apellido' id='Apellido' />
                </label>
                <label htmlFor="">
                    Email:
                    <input type="email" name='correo' id='email' />
                </label>
                <label htmlFor="">
                    Contraseña:
                    <input type="password" name="contrasena" id="passwd" />
                </label>
                <label htmlFor="">
                    Eres musico?
                    <input type="checkbox" name="musico" id="musico" />
                </label>
                <button type="submit">LogIn</button>
            </form>
        </div>
    );
}

export default formRegister;