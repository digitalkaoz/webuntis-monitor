import {store} from "../store.js";
import {html} from "@arrow-js/core";

export const table = (elem) => {
    html`
        ${() => store.data.map(item => (store.currentClass !== undefined && item.class === store.currentClass) || store.currentClass === undefined ? html`
            <tr>
                <th>${item.class}</th>
                <td>${item.timeRange}</td>
                <td>${item.hour}</td>
                <td>${item.teacher}</td>
                <td>${item.replacement}</td>
                <td>${item.room}</td>
                <td>${item.info}</td>
                <td>${item.comment}</td>
            </tr>`.key(item.id) : false)}
    `(elem)
}