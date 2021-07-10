import React from 'react';

export default function Сolorful(props) {
    return (
        <li>
            <label for="favcolor">Цвет:</label>
            <input type="color" id="favcolor" name="favcolor" value={props.value} onChange={props.change}></input>
        </li>
    );
}