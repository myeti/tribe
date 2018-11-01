import firebase from 'firebase'
import slugify from 'slugify'
import config from '@/config/firebase'


/**
 * Data normalization helper
 */

const _ = {
  docToData: doc => ({ id: doc.id, ...doc.data() }),
  docsToArray: docs => docs.map(_.docToData),
  docsToCollection: docs => {
    const collection = {}
    docs.forEach(doc => collection[doc.id] = _.docToData(doc))
    return collection
  }
}


/**
 * API utils class
 */
class Api {

  constructor() {
    firebase.initializeApp(config)
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    this.db = firebase.firestore()
    this.db.settings({ timestampsInSnapshots: true })
    this.$trees = this.db.collection('trees')
    this.$persons = this.db.collection('persons')
    this.user = null
  }


  /**
   * Refresh user from SESSION
   * @return {Promise}
   */
  session() {
    return new Promise(resolve => {
      firebase.auth().onAuthStateChanged(user => resolve(this.user = user))
    })
  }


  /**
   * Sign in user
   * @param {String} email
   * @param {String} password
   * @return Promise
   */
  login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }


  /**
   * Sign out users
   * @return {Promise}
   */
  logout() {
    this.user = null
    return firebase.auth().signOut()
  }


  /**
   * Fetch user's trees
   * @return {Promise<Array>}
   */
  async getTrees() {
    const query = await this.$trees.where('user_id', '==', this.user.uid).get()
    return _.docsToArray(query.docs)
  }


  /**
   * Fetch tree by slug
   * @param {String} slug
   * @return {Promise<Object>}
   */
  async getTree(slug) {
    const query = await this.$trees.where('slug', '==', slug).get()
    if(query.size) return _.docToData(query.docs.pop())
  }


  /**
   * Fetch tree's persons
   * @param {String} treeId
   * @return {Promise<Collection>}
   */
  async getPersons(treeId) {
    const query = await this.$persons.where('tree_id', '==', treeId).get()
    return _.docsToCollection(query.docs)
  }


  /**
   * Create a new tree with its first person
   * @param {String} name
   * @param {Object} identity
   * @return {Promise}
   */
  async createTree(name, identity) {
    const slug = slugify(name, { replacement: '-', lower: true })
    const tree = await this.$trees.add({ name, slug, user_id: this.user.uid })
    const person = await this.createPerson(identity, [], [], tree.id)
    await tree.update({ root: person.id })
    return slug
  }

  emptyPerson() {
    return {
      identity: {
        firstnames: null,
        lastname: null,
        job: null
      },
      events: [],
      relations: [],
      note: null
    }
  }

  emptyEvent() {
    return {
      date: null,
      place: null,
      name: null
    }
  }

  emptyRelation() {
    return {
      person: null,
      events: [],
      children: []
    }
  }


  /**
   * Create a person
   * @param {Object} identity
   * @param {Array<Object>} events
   * @param {Array<Object>} relations
   * @param {String} tree_id
   * @return {Promise}
   */
  createPerson(identity, events = [], relations = [], tree_id) {
    return this.$persons.add({ identity, events, relations, tree_id })
  }


}

export default {
  install(Vue) {
    Vue.api = Vue.prototype.$api = new Api()
  }
}
