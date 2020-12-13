<template>
  <div class="hello">
    <div>
      <p @click="$store.dispatch('add')">counter: {{ $store.state.counter }}</p>
      <p @click="$store.dispatch('asyncAdd')">async counter: {{ $store.state.counter }}</p>
      <!-- <p>double counter: {{ $store.getters.doubleCounter }}</p> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  created () {
    console.log('vuex实例', this.$store, this)
  },
  data: function () {
    return {
      a: 'aaa',
      $$b: 'bbb'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
