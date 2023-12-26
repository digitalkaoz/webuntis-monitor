import {store} from "../store.js";
import {html} from "@arrow-js/core";

export const table = (elem) => {
    html`
        ${() => store.data.map(item => (store.currentClass !== undefined && item.class === store.currentClass) || store.currentClass === undefined ? html`
            <tr>
                <th>${item.class}</th>
                <td>${item.hour}<br><span class="time">${item.timeRange}</span></td>
                <td>${item.teacher}</td>
                <td>${item.replacement}</td>
                <td>${item.room}</td>
                <td>${item.comment || item.info}</td>
            </tr>`.key(item.id) : false)}
    `(elem)
}