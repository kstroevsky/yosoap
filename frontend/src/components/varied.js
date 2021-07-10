import React from 'react';

export default function Varied(props) {
    return (
        <li>
            <fieldset> <legend>Форма мыла</legend>
                <label for='circle'><input 
                    type="radio" 
                    name="varied" 
                    value='circle'
                    id='circle' 
                    onChange={props.change} 
                    cheched={props.value}></input> Круг</label>
                <label for='square'><input 
                    type="radio" 
                    name="varied" 
                    value='square' 
                    id='square' 
                    onChange={props.change} 
                    cheched={props.value}></input> Квадрат</label>
                <label for='sqr'><input 
                    type="radio" 
                    name="varied" 
                    value='sqr'
                    id='sqr' 
                    onChange={props.change} 
                    cheched={props.value}></input> Прямоугольник</label>
            </fieldset>
        </li>
    );
}