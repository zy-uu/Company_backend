<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="tutorial.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="tutorial.description"
          name="description"
        />
      </div>

      <button @click="saveTutorial" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">Add</button>
    </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService"
export default {
  nama: "add-tutorial",
  data() {
    return {
      tutorial: {
        id: null,
        title: '',
        description: "",
        published: false
      },
      submitted: false
    };
  },

  methods: {
    saveTutorial() {
      var data = {
        title: this.tutorial.title,
        description: this.tutorial.description
      };
      TutorialDataService.create(data)
      .then(res => {
        this.tutorial.id = res.data.id;
        console.log(res.data);
        this.submitted = true;
      })
      .catch(err => {
        console.log(err)
      })
    },
    newTutorial() {
      this.submitted = false;
      this.tutorial = {};
    }

  },
};
</script>