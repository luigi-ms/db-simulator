<template>
  <main>
    <h1>DB Simulator</h1>
    <InputForm />
    <hr />
    <DataList />
  </main>
</template>

<script>
import InputForm from "./components/InputForm.vue";
import DataList from "./components/DataList.vue";
import Record from "./classes/Record.js";
import RecordsMap from "./classes/RecordsMap.js";

export default {
  name: "App",
  components: {
    InputForm,
    DataList,
  },
  data() {
    return {
      recordsMap: new RecordsMap(),
      actual: new Record(0),
    };
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Lato&family=Inconsolata&display=swap");

#app {
  font-family: "Lato", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2.5rem;
  margin-top: 60px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

hr {
  border: 0.025rem solid black;
  width: 85vw;
  margin-top: 1.25rem;
  margin-bottom: 0.75rem;
  justify-self: center;
}
</style>
