<template>
  <modal class="modal-person" :state="showPersonDetails" @close="togglePersonDetails(false)">

    <div class="row" v-if="person">
      <div class="col">

        <h2>{{ person.identity.firstnames }} <span>{{ person.identity.lastname }}</span></h2>

        <ol class="events">
          <li v-for="(event, index) in person.events" :key="index">
            {{ event.date.seconds | date }} : {{ event.name }}
            in <a :href="`https://www.google.ch/maps/place/${event.place}`" target="_blank" class="link">{{ event.place }}</a>
          </li>
          <li v-if="!person.events">
            No events
          </li>
        </ol>

      </div>
      <div class="col" v-if="person.relations">

        <ol class="relations">
          <li v-for="(rel, index) in person.relations" :key="index">

            <h3>
              {{ persons[rel.person].identity.firstnames }}
              {{ persons[rel.person].identity.lastname }}
            </h3>

            <div class="row">
              <div class="col">

                <h4>Events</h4>
                <ol class="events">
                  <li v-for="(event, index) in rel.events" :key="index">
                    {{ event.name }} the {{ event.date.seconds | date }}
                    in <a :href="`https://www.google.ch/maps/place/${encodeURIComponent(event.place)}`" target="_blank" class="link">{{ event.place }}</a>
                  </li>
                  <li v-if="!rel.events">
                    No events
                  </li>
                </ol>

              </div>
              <div class="col col-right">

                <h4>Children</h4>
                <ol class="children">
                  <li v-for="(child, index) in rel.children" :key="index">
                    {{ persons[child].identity.firstnames }} {{ persons[child].identity.lastname }}
                  </li>
                  <li v-if="!rel.children">
                    No children
                  </li>
                </ol>

              </div>
            </div>
          </li>
        </ol>

      </div>
    </div>

    <div class="btns">
      <button class="btn" @click="edit()">Edit</button><br>
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
      'persons',
      'showPersonDetails'
    ]),
    person() {
      return this.persons[this.showPersonDetails]
    }
  },
  methods: {
    ...mapActions([
      'togglePersonDetails',
      'togglePersonEdition'
    ]),
    edit() {
      this.togglePersonEdition(this.showPersonDetails)
      this.close()
    }
  }
}
</script>

<style lang="sass">
@import '../styles/vars'

.modal-person
  h2
    span
      font-weight: normal
  h3, h4
    text-transform: uppercase
    padding: 0
    padding-bottom: 10px
    border-bottom: 1px dashed $color-btn
  h3
    font-size: 16px
    font-weight: normal
    margin: 0
  h4
    font-size: 10px
  ol
    list-style: none
    padding: 0
    margin: 3px 0
</style>
