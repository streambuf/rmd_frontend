<template>
  <div id="app">
    <nav-bar @applyOrder="onApplyOrder"></nav-bar>
    <section class="app-section is-$white-ter">
      <div class="container is-fluid">
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  name: "app",
  components: {
    NavBar
  },
  data() {
    return {
      msg: "RATE MY DATE"
    };
  },
  methods: {
    onApplyOrder() {
      this.$emit('applyPostListOrder', {});
    }
  }
};
</script>
