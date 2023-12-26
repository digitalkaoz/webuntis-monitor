import {store} from "../store.js";
import {html} from "@arrow-js/core";

export const table = (elem) => {
    html`
        ${() => store.filteredData.length ? store.filteredData.map(item => html`
            <tr>
                <td>${item.class}</td>
                <td>${item.hour}<br><span class="time">${item.timeRange}</span></td>
                <td>${item.teacher}</td>
                <td>${item.replacement}</td>
                <td>${item.room}</td>
                <td>${item.comment}<br>${item.info}</td>
            </tr>`.key(item.id)) : html`<tr><td colspan="6" class="empty-text">${store.emptyText}</td></tr>`}
    `(elem)
}