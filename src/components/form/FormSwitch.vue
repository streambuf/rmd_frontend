<template>
  <div class="field">
    <input :id="name" type="checkbox" :name="name" class="switch is-thin" checked="checked">
    <label :for="name"></label>
    <img :src="iconUrl" class="post-filter-menu-switch-icon">
    {{name}}
  </div>
</template>

<script>
  import 'bulma-switch/dist/css/bulma-switch.min.css';

  export default {
        props: ['name', 'iconUrl'],
        data() {
            return {
            }
        },
        computed: {
        },
        methods: {
        },
        watch: {
        }

    };
</script>
