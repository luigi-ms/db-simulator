<template>
  <table>
    <tr>
      <th v-for="(col, index) in columns" :key="index">
        {{ col }}
      </th>
    </tr>
    <tr v-for="rec in records.list" :key="rec.id">
      <td>{{ rec.id }}</td>
      <td>{{ rec.name }}</td>
      <td>{{ rec.age }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "DataList",
  data() {
    return {
      columns: [],
      records: [],
    };
  },
};
</script>

<style lang="scss"></style>
