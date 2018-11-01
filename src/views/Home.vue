<template>
  <div class="frame home">

    <transition name="fade">
      <div class="trees" v-if="!loading">
        <router-link tag="div" class="goto" v-for="tree in trees" :key="tree.id" :to="tree.slug">
          <i class="icon-leaves"></i> {{ tree.name }}
        </router-link>
        <div class="goto" @click="toggleTreeCreation(true)">
          <i class="icon-leaves"></i> +
        </div>
      </div>
    </transition>

    <modal-tree-create></modal-tree-create>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ModalTreeCreate from '@/components/ModalTreeCreate'

export default {
  components: {
    ModalTreeCreate
  },
  data: () => ({
    loading: true
  }),
  computed: {
    ...mapGetters([
      'trees'
    ])
  },
  methods: {
    ...mapActions([
      'getTrees',
      'unselectTree',
      'toggleTreeCreation'
    ])
  },
  async created() {
    this.unselectTree()
    await this.getTrees()
    this.loading = false
  }
}
</script>

<style lang="sass">
@import '../styles/vars'

.home
  display: flex
  justify-content: center
  align-items: center

  .trees
    display: flex
    flex-wrap: wrap
    justify-content: center

    .goto
      padding: 40px
      text-align: center
      text-transform: uppercase
      cursor: pointer
      font-weight: 600
      border-radius: 2px
      &:hover
        background: $color-bg-hover
        i
          transform: translateY(-20%)

      i
        display: block
        font-size: 60px
        margin-bottom: 15px
        transition: all 200ms
</style>
