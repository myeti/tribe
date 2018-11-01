<template>
  <div class="person">

    <!-- single -->
    <div class="single" v-if="!couple">

      <div class="identity branch" @click="openDetails(id)">
        <div class="firstname">{{ identity.firstnames | firstword }}</div>
        <div class="lastname">{{ identity.lastname }}</div>
      </div>

    </div>

    <!-- couple -->
    <div class="couple" v-if="couple">

      <div class="persons">

        <div class="identity branch" ref="spouseA" :style="{ width: spouseWidth }" @click="openDetails(id)">
          <div class="firstname">{{ identity.firstnames | firstword }}</div>
          <div class="lastname">{{ identity.lastname }}</div>
        </div>

        <span class="and">&amp;</span>

        <div class="identity spouse" ref="spouseB" :style="{ width: spouseWidth }" @click="openDetails(couple.person, false)">
          <div class="firstname">{{ persons[couple.person].identity.firstnames | firstword }}</div>
          <div class="lastname">{{ persons[couple.person].identity.lastname }}</div>
        </div>

      </div>

      <div class="children" v-if="couple.children && couple.children.length">
        <div class="child" v-for="(child, index) in couple.children" :key="index" :class="{
          first: (couple.children.length > 1 && index == 0),
          last: (couple.children.length > 1 && index == couple.children.length-1),
          only: (couple.children.length == 1)
        }">
          <person v-bind="persons[child]"></person>
        </div>
      </div>

    </div>

    <!-- exs -->
    <div class="ex" v-for="(ex, index) in exs" :key="index">

      <div class="identity" @click="openDetails(ex.person, false)">
        <div class="firstname">{{ persons[ex.person].identity.firstnames | firstword }}</div>
        <div class="lastname">{{ persons[ex.person].identity.lastname }}</div>
      </div>

      <div class="children" v-if="ex.children && ex.children.length">
        <div class="child" v-for="(child, index) in ex.children" :key="index" :class="{
          first: (ex.children.length > 1 && index == 0),
          last: (ex.children.length > 1 && index == ex.children.length-1),
          only: (ex.children.length == 1)
        }">
          <person v-bind="persons[child]"></person>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import Person from '@/components/Person'
import { mapGetters, mapActions } from 'vuex'

const IDENTITY_PADDING = 20

export default {
  name: 'person',
  components: {
    Person
  },
  props: [
    'id',
    'identity',
    'events',
    'relations',
    'tree_id',
    'limited'
  ],
  data: () => ({
    spouseWidth: null
  }),
  computed: {
    ...mapGetters([
      'persons',
      'treeDragged'
    ]),
    couple() {
      return (this.relations && this.relations.length)
        ? this.relations[0]
        : null
    },
    exs() {
      return (this.relations && this.relations.length > 1)
        ? this.relations.filter((item, index) => index > 0)
        : []
    }
  },
  methods: {
    ...mapActions([
      'togglePersonDetails'
    ]),
    openDetails(id, main = true) {
      if(!this.treeDragged) {
        this.togglePersonDetails(id)
      }
    }
  },
  filters: {
    firstword(str) {
      return str ? str.split(' ')[0] : ''
    }
  },
  mounted() {

    // force spouses width to be equal
    if(this.$refs.spouseA) {
      this.spouseWidth = (this.$refs.spouseA.offsetWidth > this.$refs.spouseB.offsetWidth)
        ? (this.$refs.spouseA.offsetWidth - IDENTITY_PADDING) + 'px'
        : (this.$refs.spouseB.offsetWidth - IDENTITY_PADDING) + 'px'
    }

  }
}
</script>

<style lang="sass">
@import '../styles/vars'

.person
  display: flex
  flex-shrink: 0
  justify-content: center

  .identity
    padding: 10px
    text-transform: uppercase
    background: $color-bg
    cursor: pointer
    .firstname
      font-weight: bold
      margin-bottom: -2px
    .lastname
      font-size: 11px

  .single
    justify-content: center
    > .identity
      text-align: center

  .couple
    .persons
      display: inline-flex
      flex-shrink: 0
      flex-wrap: wrap
      position: relative
      .identity
        text-align: right
      .and
        position: absolute
        top: 10px
        left: 50%
        transform: translateX(-50%)
        opacity: .5
      .spouse
        text-align: left

  .ex
    position: relative
    text-align: center
    &:before
      content: ''
      position: absolute
      z-index: -1
      top: 18px
      left: 0
      right: 50%
      border-bottom: $bar-size dotted $color-bar
    > .identity
      display: inline-block

  .children
    display: flex
    flex-shrink: 0
    justify-content: center
    position: relative
    &:before
      content: ''
      position: absolute
      top: -$bar-v-height
      left: 50%
      width: $bar-size
      height: $bar-v-height
      background: $color-bar
    .child
      position: relative
      .branch
        &:before
          content: ''
          position: absolute
          top: 0
          left: 50%
          width: $bar-size
          height: $bar-v-height
          background: $color-bar
      &:not(.only) .branch
        &:after
          content: ''
          position: absolute
          top: 0
          left: 0
          right: 0
          height: $bar-size
          background: $color-bar
      &.first .branch
        &:after
          left: 50%
      &.first .couple .branch
        &:before, &:after
          left: 25%
      &.last .branch
        &:after
          right: 50%
      &.last .couple .branch
        &:before
          left: 25%
        &:after
          right: 25%

</style>
