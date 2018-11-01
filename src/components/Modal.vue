<template>
  <transition name="appear">
    <div class="modal" @click="close($event)" v-if="state">
      <div class="modal-content">

        <slot></slot>

      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: [
    'state'
  ],
  methods: {
    open() {
      document.addEventListener('keydown', this.close, true)
      this.$emit('open')
      this.$parent.$emit('open')
    },
    close(e) {
      if(!e || e.keyCode == 27 || e.target == this.$el) {
        document.removeEventListener('keydown', this.close, true)
        this.$emit('close')
        this.$parent.$emit('close')
      }
    }
  },
  created() {
    this.$parent.open = this.open
    this.$parent.close = this.close
  }
}
</script>


<style lang="sass">
@import '../styles/vars'

.modal
  position: absolute
  z-index: 100
  top: 0
  bottom: 0
  left: 0
  right: 0
  display: flex
  justify-content: center
  align-items: center
  transition: all 300ms
  transform: translateZ(0)
  background: rgba(0, 0, 0, .4)
  &-content
    z-index: 90
    position: relative
    background: white
    padding: 60px
    border-radius: 2px
    box-shadow: 0 0 4px rgba(0, 0, 0, .4)
    transition: all 300ms

    .row
      display: flex
      .col + .col
        margin-left: 40px

    hr
      height: 0
      border: none
      border-bottom: 1px dashed $color-btn

    h2
      margin-top: 0
      margin-bottom: 35px
      text-align: center
      text-transform: uppercase
      font-size: 22px
      i
        display: block
        font-size: 60px
        margin-bottom: 5px

    .inputs
      padding: 15px 0

    label
      display: block
      font-weight: bold
      text-transform: uppercase
      font-size: 14px
      margin-bottom: 5px
      padding-left: 14px

    input
      display: block
      padding: 10px 14px
      border: 1px solid $color-btn
      border-radius: 2px
      & + input
        margin-top: 5px

    .btns
      margin-top: 30px
      text-align: center

      .link
        display: inline-block
        margin-top: 5px
        font-size: 14px !important

    button
      border: none
      border-radius: 2px
      padding: 10px 14px
      background: $color-btn
      text-transform: uppercase
      font-size: 14px !important
      font-weight: bold
      cursor: pointer
      opacity: .8
      &:hover
        opacity: 1
      &.cta
        padding: 10px 30px
        background: $color-cta
        color: white !important

  &.appear-enter,
  &.appear-leave-to
    background: rgba(0, 0, 0, 0)
    .modal-content
      opacity: 0
      transform: scale(.2)
</style>
