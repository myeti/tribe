<template>
  <div class="frame tree">

    <drag-it-dude :class="{ grabbing }" @activated="setGrabbing(true)" @dragging="setMoving()" @dropped="setGrabbing(false)">
      <transition name="fade">
        <div class="scope" v-if="!loading">
          <person v-bind="persons[selectedTree.root]"></person>
        </div>
      </transition>
    </drag-it-dude>

    <modal-person-edit></modal-person-edit>
    <modal-person></modal-person>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import DragItDude from '@/components/DragItDude'
import Person from '@/components/Person'
import ModalPerson from '@/components/ModalPerson'
import ModalPersonEdit from '@/components/ModalPersonEdit'

export default {
  components: {
    DragItDude,
    Person,
    ModalPerson,
    ModalPersonEdit
  },
  data: () => ({
    loading: true,
    grabbing: false,
    moving: false
  }),
  computed: {
    ...mapGetters([
      'selectedTree',
      'persons'
    ])
  },
  methods: {
    ...mapActions([
      'selectTree',
      'dragTree'
    ]),
    setGrabbing(grabbing) {
      this.grabbing = grabbing
      if(!grabbing) {
        this.dragTree(this.moving)
        this.moving = false
      }
    },
    setMoving() {
      if(this.grabbing) {
        this.moving = true
      }
    }
  },
  async created() {
    await this.selectTree(this.$route.params.tree)
    this.loading = false
  }
}
</script>

<style lang="sass">
.tree
  overflow: hidden
  display: flex
  justify-content: center
  align-items: center

  .drag-it-dude
    cursor: grab
    &.grabbing
      cursor: grabbing

    .scope
      display: flex
      justify-content: center
      align-items: center
</style>

