<template>
  <div id="app">
    <SudokuBoard />
  </div>
</template>

<script>
import SudokuBoard from './components/SudokuBoard.vue';

export default {
  name: 'App',
  components: {
    SudokuBoard
  }
};
</script>

<style>
/* Add any global styles here */
</style>