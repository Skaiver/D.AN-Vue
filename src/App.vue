<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
  <header>
    <div class="message">
      <h2>Hallo Malte</h2>
      <p>Hier sind deine Ausbildungsnachweise</p>
    </div>
    <nav>
      <RouterLink to="/">Dashbaord</RouterLink>
      <RouterLink to="/export">Export</RouterLink>
      <RouterLink to="/import">Import</RouterLink>
      <RouterLink to="/settings">Settings</RouterLink>
    </nav>
  </header>

  <RouterView/>
</template>

<style scoped>
:root {
  --header-welcome-message: 1.8rem;
  --header-message: 1rem;
  --week-entry-width: 600px;

  @media screen and (min-width: 420px) {

  }
  @media screen and (min-width: 768px) {
    --header-welcome-message: 2rem;
    --header-message: 1.3rem;
  }
  @media screen and (min-width: 1024.00px) {
    --week-entry-width: 550px;
  }

  @media screen and (min-width: 1440.00px) {
    --week-entry-width: 800px;
  }

  @media screen and (min-width: 1600px) {
    --week-entry-width: 900px;
  }
}

header {
  margin-bottom: 1rem;

  .message {
    background-color: #4ea1f6;
    color: white;
    padding: 5px 10px;
    border-radius: 5px 5px 0 0;
    //margin-bottom: 1rem;

    h2,
    p {
      font-weight: 300;
      display: inline-block;
    }

    h2 {
      font-family: "Roboto Mono", sans-serif;
      font-weight: 300;
      font-size: var(--header-welcome-message);
    }

    p {
      font-size: var(--header-message);
    }

  }
}

nav {
  display: grid;
  grid-template-columns: 2fr 2fr;
  gap: 10px
}

nav a {
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 75px;
  aspect-ratio: 16 / 9;
  background-color: #2f405b;
  border: #649ff0 1px solid;
  border-radius: 4px;
//border-top: 0; //border-top-left-radius: 0; //border-top-right-radius: 0; //border-bottom-right-radius: 0; color: #6f7fa5;

}

@media screen and (min-width: 1440px) {
  nav {
    display: flex;
    justify-content: right;
    gap: 0;
  }

  nav a {
    width: 150px;
    border-top: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    color: #6f7fa5;

    &:not(:last-of-type) {
      border-right: unset;
    }
  }
}

</style>
