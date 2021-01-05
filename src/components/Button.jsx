import React from 'react'
import './Button.css'

//Componentes sem estado (funcionais) são mais fáceis de rabalhar

//Primeira classe sempre será definida, as outras devem conter propriedades indicando se elas vão ser aplicadas ou não

//Dentro de uma template string pode-se usar javascript puro
export default props =>{
    let classes = 'button '
    classes += props.operation ? 'operation' : ''
    classes += props.double ? 'double' : ''
    classes += props.triple ? 'triple' : ''

    return (
        <button 
            onClick={e => props.click && props.click(props.label)}
            className={classes}>
            {props.label}
        </button>
    )
}
    