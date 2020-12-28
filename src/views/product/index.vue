<template>
  {{ txt }}{{ $store.state.name }}
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Home',
  setup (e) {

    let txt = ref('home')

    const store = useStore()

    console.log(store)

    return { txt }

  },
  created () {
    console.log('created', this)
  }
}
</script>
