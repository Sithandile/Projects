<template>
<div>
    <input type="text" class="list-input"
    placeholder="What needs to be bought?" v-model="newList" @keyup.enter="addList">
    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
    <div v-for="(list) in listsFiltered" :key="list.id" class="list-item">
      <div class="list-item-left">
        <input type="checkbox" v-model="list.completed">
        <div v-if="!list.editing" @dblclick="editList(list)"
        class="list-item-label" :class="{ completed : list.completed }">{{ list.title }}</div>
        <input v-else class="list-item-edit" type="text"
        v-model="list.title" @blur="doneEdit(list)"
        @keyup.enter="doneEdit(list)" @keyup.esc="cancelEdit(list)" v-focus>
      </div>
    </div>
    </transition-group>

    <div class="extra-container">
      <div>
        <button :class="{ active: filter === 'all' }" @click="filter = 'all'">All</button>
        <button :class="{ active: filter === 'active' }" @click="filter = 'active'">Active</button>
        <button :class="{ active: filter === 'completed' }" @click="filter = 'completed'">Completed</button>
      </div>

      <div>
        <transition name="fade">
        <button v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</button>
        </transition>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'grocery-list',
  data () {
    return {
      newList: '',
      idForList: 3,
      beforeEditCache: '',
      filter: 'all',
      lists: [
        {
          id: 1,
          title: 'Vegetables',
          completed: false,
          editing: false
        },
        {
          id: 2,
          title: 'Steak',
          completed: false,
          editing: false
        }
      ]
    }
  },
  computed: {
    remaining () {
      return this.lists.filter(list => !list.completed).length
    },
    anyRemaining () {
      return this.remaining !== 0
    },
    listsFiltered () {
      if (this.filter === 'all') {
        return this.lists
      } else if (this.filter === 'active') {
        return this.lists.filter(list => !list.completed)
      } else if (this.filter === 'completed') {
        return this.lists.filter(list => list.completed)
      }

      return this.lists
    },
    showClearCompletedButton () {
      return this.lists.filter(list => list.completed).length > 0
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    addList () {
      if (this.newList.trim().length === 0) {
        return
      }

      this.lists.push({
        id: this.idForList,
        title: this.newList,
        completed: false,
        editing: false
      })

      this.newList = ''
      this.idForList++
    },
    editList (list) {
      this.beforeEditCache = list.title
      list.editing = true
    },
    doneEdit (list) {
      if (list.title.trim().length === 0) {
        list.title = this.beforeEditCache
      }
      list.editing = false
    },
    cancelEdit (list) {
      list.title = this.beforeEditCache
      list.editing = false
    },
    removeList (index) {
      this.lists.splice(index, 1)
    },
    checkAllLists () {
      this.lists.forEach((list) => list.completed === event.target.checked)
    },
    clearCompleted () {
      this.lists = this.lists.filter(list => !list.completed)
    }
  }
}
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css");

  .list-input {
    width: 50%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
    left: 0px;
    margin-top: 100px;

    &:focus {
      outline: 0;
    }
  }
  .list-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation-duration: 0.3s;
  }
  .list-item-left {
    display: flex;
    align-items: center;
  }
  .list-item-label {
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
    border-radius: 20px;
  }
  .list-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    font-family: Arial, Helvetica, sans-serif;

    &:focus {
      outline: none;
    }
  }
  .completed {
    text-decoration: line-through;
    color: grey;
  }
  .extra-container {
    display: flex;
    align-items: center;
    justify-items: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
  }
  button {
      background: rgba(71, 70, 70, 0.829);
      border: 0;
      padding: 10px 20px;
      margin-top: 20px;
      border-radius: 20px;
      color: rgba(245, 245, 245, 0.808);

    &:hover {
      background: lightgreen;
    }

    &:focus {
      outline: none;
    }
  }
  .active {
    background: lightgreen;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
