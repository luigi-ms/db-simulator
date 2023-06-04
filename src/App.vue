<template>
  <main>
    <h1>DB Simulator</h1>
    <InputForm :recs="recordsMap" />
    <hr />
    <DataList :recs="recordsMap" />
  </main>
</template>

<script>
import InputForm from "./components/InputForm.vue";
import DataList from "./components/DataList.vue";
import RecordsMap from "./classes/RecordsMap.js";

export default {
  name: "App",
  components: {
    InputForm,
    DataList,
  },
  data() {
    return { recordsMap: new RecordsMap() };
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Lato&family=Inconsolata&display=swap");

* {
  margin: 0;
  padding: 0;
  border: none;
  box-sizing: border-box;
}

body {
  background-color: hsl(178, 87%, 85%);
}

main {
  font-family: "Lato", Helvetica, Arial, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2.5rem;

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
}
</style>
