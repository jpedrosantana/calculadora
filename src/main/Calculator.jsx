import React, {Component} from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

const initialState = { //cria fora da classe pois a clearMemory zera os valores.
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0], //array para armazenar os valores da operação
    current: 0 //indica qual dos índices do array está sendo manipulado
}

export default class Calculator extends Component {
    state = {...initialState} //criou um clone do array

    clearMemory(){
        this.setState({...initialState})
    }

    setOperation(operation){
        if(this.state.current === 0){
            //Muda o índice do array após a inserção da operação, e da Clear no display quando o segundo valor é inserido 
            this.setState({operation, current: 1, clearDisplay: true})
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation //Operação já setada

            const values = [...this.state.values]

            try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`) //executa a operação e armazena no valor na posição 0 e o valor de índice 1 será zerado

            }catch{
                values[0] = this.state.values[0]
            }
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals, //Se for diferente de equals, limpa o display
                values
            })
        }
    }

    addDigit(n){
        if (n === '.' && this.state.displayValue.includes(".")){
            return //regra para evitar dois pontos na operação
        }

        const clearDisplay = this.state.displayValue === '0' //impede que haja 0 à esquerda do algarismo
            || this.state.clearDisplay
        
        const currentValue = clearDisplay ? '' : this.state.displayValue

        const displayValue = currentValue + n

        this.setState({displayValue, clearDisplay: false})

        if (n !== '.'){ //se um valor numérico for inserido
            const i = this.state.current //inserindo o índice do array na variável i
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values] //array clonado
            values[i] = newValue

            this.setState({values})
        }
    }

    render(){ //precisa ter return
        const addDigit = n => this.addDigit(n) //O this representa o objeto atual
        const setOperation = op => this.setOperation(op) //As funções garantem o this que eu quero associar

        return ( //className é como referenciamos classes no jsx, ao contrário do HTML, mas o significado é o mesmo.
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={() => this.clearMemory()} triple/>
                <Button label="/" click={setOperation} operation/>
                <Button label="7" click={addDigit}/>
                <Button label="8" click={addDigit}/>
                <Button label="9" click={addDigit}/>
                <Button label="*" click={setOperation} operation/>
                <Button label="4" click={addDigit}/>
                <Button label="5" click={addDigit}/>
                <Button label="6" click={addDigit}/>
                <Button label="-" click={setOperation} operation/>
                <Button label="1" click={addDigit}/>
                <Button label="2" click={addDigit}/>
                <Button label="3" click={addDigit}/>
                <Button label="+" click={setOperation} operation/>
                <Button label="0" click={addDigit} double/>
                <Button label="." click={addDigit}/>
                <Button label="=" click={setOperation} operation/>
            </div>
        )
    }
}