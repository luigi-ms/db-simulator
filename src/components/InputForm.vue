<template>
  <div class="entryForm">
    <label>
      <input v-model.number="entryForm.id" placeholder="0" type="number" />
      <span>ID</span>
    </label>
    <label>
      <input v-model="entryForm.column" placeholder="name" type="text" />
      <span>Column</span>
    </label>
    <label>
      <input v-model="entryForm.data" placeholder="admin" type="text" />
      <span>Data</span>
    </label>

    <p class="message">{{ errorMessage }}</p>

    <fieldset class="buttons">
      <button class="add-btn" @click="add">Create</button>
      <button class="search-btn" @click="read">Search</button>
      <button class="update-btn" @click="update">Update</button>
      <button class="del-btn" @click="remove">Delete</button>
    </fieldset>
  </div>
</template>

<script>
import Record from "../classes/Record.js";

export default {
  name: "InputForm",
  data() {
    return {
      entryForm: { id: "", column: "", data: "" },
      errorMessage: "",
      actual: new Record(0),
    };
  },
  props: ["recs"],
  mounted() {
    this.entryForm = { id: "", column: "", data: "" };
  },
  watch: {
    "entryForm.id"() {
      try {
        this.recs.validateID(this.entryForm.id);
      } catch (err) {
        this.messageError = err.message;
      } finally {
        this.actual.id = this.entryForm.id;
      }
    },
    "entryForm.column"() {
      try {
        if (this.entryForm.column === "id") {
          throw new Error("Cannot change id column");
        }
        this.actual.updateCol = Record.validateColumn(this.entryForm.column);
        this.messageError = "";
      } catch (err) {
        this.messageError = err.message;
      }
    },
    "entryForm.data"() {
      this.actual[this.actual.updateCol] = this.entryForm.data;
    },
  },
  methods: {
    add() {},
    read() {},
    update() {},
    remove() {},
  },
};
</script>

<style lang="scss">
.entryForm {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 0.75rem;

  label {
    min-width: 75%;
    display: flex;
    align-items: center;
    position: relative;

    input {
      height: 1.95rem;
      width: 100%;
      padding: 0.75rem;
      margin-left: 0.75rem;
      border: 1px solid black;
      border-radius: 5px;
      background-color: transparent;
      transition: border 0.15s ease;

      &:focus {
        outline: none;
        border-color: hsl(98, 32%, 45%);
        transition: border 0.15s ease;

        + span {
          color: hsl(98, 32%, 45%);
          transition: color 0.15s ease;
        }
      }
    }

    span {
      font-size: 0.8rem;
      position: absolute;
      background-color: hsl(178, 87%, 85%);
      margin-inline: 0.15rem;
      left: 7%;
      transform: translate(0, -95%);
      transition: color 0.15s ease;
    }
  }

  fieldset {
    display: flex;
    gap: 0.75rem;
    justify-content: space-evenly;

    button {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 5.25rem;
      height: 1.85rem;
      font-size: 0.85rem;
      padding: 1.25rem;
      border-radius: 15px;

      &:active {
        background-color: hsl(98, 32%, 45%);
        color: hsl(178, 87%, 67%);
        border: none;
      }

      &.add-btn {
        background-color: hsl(271, 85%, 23%);
        color: hsl(178, 87%, 67%);
      }

      &.update-btn,
      &.search-btn {
        border: 1px solid hsl(271, 85%, 23%);
        background-color: transparent;
        color: hsl(271, 85%, 23%);
      }

      &.del-btn {
        background-color: transparent;
        color: hsl(271, 85%, 23%);
      }
    }
  }
}
</style>
