import React from 'react';

function formLogin() {
    return (
        <div>
            <h1>Formulario registro</h1>
            <form action="">
                <label htmlFor="">
                    Email:
                    <input type="email" name='correo' id='email' />
                </label>
                <label htmlFor="">
                    Contraseña:
                    <input type="password" name="contrasena" id="passwd" />
                </label>
            </form>
        </div>
    );
}

export default formLogin;