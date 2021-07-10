import React from 'react';

export default function Smellful(props) {
    return (
        <li>
            <label for="favsmell">Запах:</label>
            <select value={props.value} onChange={props.change}>
                <option value='mint'>
                    Мята
                </option>
                <option value='strawberry'>
                    Клубника
                </option>
                <option value='orange'>
                    Апельсин
                </option>
            </select>
        </li>
    );
}