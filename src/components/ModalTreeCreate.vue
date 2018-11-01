<template>
  <modal :state="showTreeCreation" @close="toggleTreeCreation(false)">

    <h2>
      <i class="icon-plant"></i> new tree
    </h2>

    <form @submit.prevent="save()">

      <div class="inputs">
        <label for="treename">Tree</label>
        <input type="text" id="treename" v-model="treename" placeholder="Name" autofocus required>
      </div>

      <div class="inputs">
        <label for="firstnames">First person</label>
        <input type="text" id="firstnames" v-model="identity.firstnames" placeholder="Firstname(s)" required>
        <input type="text" v-model="identity.lastname" placeholder="Lastname" required>
      </div>

      <div class="btns">
        <button type="submit" class="cta">Plant</button><br>
        <span class="link" @click="close()">cancel</span>
      </div>

    </form>

  </modal>
</template>

<script>
import Modal from './Modal'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Modal
  },
  data: () => ({
    loading: false,
    treename: '',
    identity: {
      firstnames: '',
      lastname: ''
    }
  }),
  computed: {
    ...mapGetters([
      'showTreeCreation'
    ])
  },
  methods: {
    ...mapActions([
      'toggleTreeCreation'
    ]),
    async save() {
      if(!this.loading) {
        this.loading = true
        const slug = await this.$api.createTree(this.name, this.identity)
        this.$router.push(slug)
        this.close()
      }
    }
  }
}
</script>
