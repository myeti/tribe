<template>
  <modal :state="showPersonEdition" @close="togglePersonEdition(false)">

    <h2>@TODO</h2>

    <div class="btns">
      <button class="btn" @click="save()">Save</button><br>
      <span class="link" @click="close()">close</span>
    </div>

  </modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Modal from './Modal'

export default {
  components: {
    Modal
  },
  computed: {
    ...mapGetters([
      'showPersonEdition'
    ])
  },
  methods: {
    ...mapActions([
      'togglePersonDetails',
      'togglePersonEdition'
    ]),
    save() {
      this.togglePersonDetails(this.showPersonEdition)
      this.close()
    }
  }
}
</script>
