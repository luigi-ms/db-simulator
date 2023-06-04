<template>
  <table>
    <tr>
      <th v-for="(col, index) in columns" :key="index">
        {{ col }}
      </th>
    </tr>
    <tr v-for="rec in recs.list" :key="rec.id">
      <td>{{ rec.id }}</td>
      <td>{{ rec.name }}</td>
      <td>{{ rec.age }}</td>
    </tr>
  </table>
</template>

<script>
import Record from "../classes/Record.js";

export default {
  name: "DataList",
  data() {
    return { columns: Record.getColumns() };
  },
  props: ["recs"],
};
</script>

<style lang="scss">
table {
  font-family: "Inconsolata", "Courier New", Courier monospace;
  width: 65vw;
  margin-top: 0.75rem;
  border: 1px solid black;
  border-radius: 3px;

  td,
  th {
    text-align: center;
    padding: 0.25rem;
    font-size: 0.9rem;
  }

  th {
    border-bottom: 0.75px solid black;
    font-size: 1.1rem;
  }
}
</style>
