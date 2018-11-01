import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const TYPES = {
  RESET: 'RESET',
  SET_TREES: 'SET_TREES',
  SELECT_TREE: 'SELECT_TREE',
  DRAG_TREE: 'DRAG_TREE',
  SHOW_TREE_CREATION: 'SHOW_TREE_CREATION',
  SHOW_TREE_EDITION: 'SHOW_TREE_EDITION',
  SHOW_PERSON_CREATION: 'SHOW_PERSON_CREATION',
  SHOW_PERSON_DETAILS: 'SHOW_PERSON_DETAILS',
  SHOW_PERSON_EDITION: 'SHOW_PERSON_EDITION'
}

const commitLog = (commit, type, values) => {
  console.log('store:mutate', type, values)
  commit(type, values)
}

export default new Vuex.Store({
  state: {
    trees: [],
    persons: {},
    selectedTree: {},
    treeDragged: false,
    showTreeCreation: false,
    showTreeEdition: null,
    showPersonCreation: null,
    showPersonDetails: null,
    showPersonEdition: null
  },
  getters: {
    trees: state => state.trees,
    persons: state => state.persons,
    selectedTree: state => state.selectedTree,
    treeDragged: state => state.treeDragged,
    showTreeCreation: state => state.showTreeCreation,
    showTreeEdition:  state => state.showTreeEdition,
    showPersonCreation: state => state.showPersonCreation,
    showPersonDetails: state => state.showPersonDetails,
    showPersonEdition: state => state.showPersonEdition
  },
  mutations: {

    [TYPES.RESET](state) {
      state.trees = []
      state.persons = {}
      state.selectedTree = {}
      state.treeDragged = false
      state.showTreeCreation = false
      state.showTreeEdition = null
      state.showPersonCreation = null
      state.showPersonDetails = null
      state.showPersonEdition = null
    },

    [TYPES.SET_TREES](state, trees) {
      state.trees = trees
    },

    [TYPES.SELECT_TREE](state, { tree, persons }) {
      state.selectedTree = tree
      state.persons = persons
    },

    [TYPES.DRAG_TREE](state, moved) {
      state.treeDragged = moved
    },

    [TYPES.SHOW_TREE_CREATION](state, show) {
      state.showTreeCreation = !!show
    },

    [TYPES.SHOW_TREE_EDITION](state, treeId) {
      state.showTreeEdition = treeId
    },

    [TYPES.SHOW_PERSON_CREATION](state, personId) {
      state.showPersonCreation = personId
    },

    [TYPES.SHOW_PERSON_DETAILS](state, personId) {
      state.showPersonDetails = personId
    },

    [TYPES.SHOW_PERSON_EDITION](state, personId) {
      state.showPersonEdition = personId
    }

  },
  actions: {

    reset({ commit }) {
      commitLog(commit, TYPES.RESET)
    },

    async getTrees({ commit }) {
      const trees = await Vue.api.getTrees()
      commitLog(commit, TYPES.SET_TREES, trees)
    },

    async selectTree({ commit }, slug) {
      const tree = await Vue.api.getTree(slug)
      const persons = await Vue.api.getPersons(tree.id)
      commitLog(commit, TYPES.SELECT_TREE, { tree, persons })
    },

    unselectTree({ commit }) {
      commitLog(commit, TYPES.SELECT_TREE, { tree: {}, persons: [] })
    },

    dragTree({ commit }, moved) {
      commitLog(commit, TYPES.DRAG_TREE, moved)
    },

    toggleTreeCreation({ commit }, show) {
      commitLog(commit, TYPES.SHOW_TREE_CREATION, show)
    },

    toggleTreeEdition({ commit }, treeId) {
      commitLog(commit, TYPES.SHOW_TREE_EDITION, treeId)
    },

    togglePersonCreation({ commit }, personId) {
      commitLog(commit, TYPES.SHOW_PERSON_CREATION, personId)
    },

    togglePersonDetails({ commit }, personId) {
      commitLog(commit, TYPES.SHOW_PERSON_DETAILS, personId)
    },

    togglePersonEdition({ commit }, personId) {
      commitLog(commit, TYPES.SHOW_PERSON_EDITION, personId)
    }

  }
})
