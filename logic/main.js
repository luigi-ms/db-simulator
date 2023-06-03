import { createApp } from "https://cdn.jsdelivr.net/npm/vue@3.3.4/dist/vue.esm-browser.prod.js"; 
import InputForm from "./components/InputForm.js";
import DataList from "./components/DataList.js";

createApp(InputForm).mount("#input-form");
createApp(DataList).mount("#data-list");
