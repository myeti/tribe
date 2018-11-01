<template>
  <div id="app">

    <nav>
      <router-link to="/" class="link">tribe</router-link>
      <transition name="fade-right">
        <span v-if="selectedTree.slug">
          <i>&rsaquo;</i>{{ selectedTree.name }}
        </span>
      </transition>
    </nav>

    <transition name="fade">
      <router-view/>
    </transition>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    title: document.title
  }),
  computed: {
    ...mapGetters([
      'selectedTree'
    ])
  },
  watch: {
    selectedTree(tree) {
      document.title = tree.name ? `${this.title} \u203a ${tree.name}` : this.title
    }
  }
}
</script>


<style lang="sass">
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,600')
@import './styles/vars'

#app
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  transform: translateZ(0)
  font-family: Montserrat, sans-serif
  background: $color-bg
  font-size: $size-font
  color: $color-font

  // common elements
  button, input, select, textarea
    font-size: $size-font
    color: $color-font

  .link
    &, &:active, &:focus, &:visited
      color: $color-font-light
      text-decoration: none
      cursor: pointer
      border-bottom: 1px solid transparent
      &:hover
          border-bottom-color: $color-font-light

  // navigation
  nav
    z-index: 80
    position: absolute
    top: 30px
    left: 30px
    font-weight: 600
    a, span
      display: inline-block
      text-transform: uppercase
      letter-spacing: 2px
    i
      font-style: normal
      font-size: 21px
      line-height: $size-font
      margin: 0 10px

  // main frame
  .frame
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0

  // animations
  .fade-enter-active,
  .fade-leave-active
    transition: opacity 400ms
  .fade-enter,
  .fade-leave-to
    opacity: 0

  .fade-right-enter-active,
  .fade-right-leave-active
    transition: all 400ms
  .fade-right-enter,
  .fade-right-leave-to
    opacity: 0
    transform: translateX(-10%)
</style>
