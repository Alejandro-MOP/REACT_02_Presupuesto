import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Error from './Error';

const Formulario = ({guardarGasto, guardarCrearGasto}) => {

    const [nombre,  guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);

    //cuando el usuario agrega un gasto
    const agregarGasto = e => {
        e.preventDefault();

        //validar
        if(cantidad < 1 || isNaN(cantidad) /*isNotaNumber*/ || nombre.trim() === ''){
            guardarError(true);
            return;}//return sale de la función
        guardarError(false);

        //construir el gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }
        //console.log(gasto); revisamos que funcione el objeto

        //pasar el gasto al componente principal
        guardarGasto(gasto);
        guardarCrearGasto(true);

        //resetear el form
        guardarNombre('');
        guardarCantidad('');


    }

    return (
        <form
            onSubmit={agregarGasto}
        >
            <h2>Agrega tus gastos aquí</h2>

            {(error)
                ? <Error mensaje="Ambos campos son obligatorios / Presupuesto invalido"/>
                : null

            }

            <div className="campo">
                <label>Nombre de Gasto</label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. Transporte"
                    value={nombre}//guardara el nombre
                    onChange={ e => guardarNombre(e.target.value)} //tomara el valor que se guarde
                />
            </div>

            <div className="campo">
                <label>Cantidad de Gasto</label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. 500"
                    value={cantidad}//guardara la cantidad
                    onChange={ e => guardarCantidad( parseInt( e.target.value, 10))}//tomara el valor que se guarde
                />
            </div>

            <input 
                type="submit"
                className="button-primary u-full-width"
                value="Agregar Gasto"
            />

        </form>


    );
}

Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
}

export default Formulario;