<template>
  <div>
    <h1>Article Details</h1>

    <hr>

    <div class="alert alert-success"
      v-if="$route.params.updated=='yes'">Record updated successfully</div>

    <h2>{{ article.title }}</h2>

    <h6>By {{ article.author }}</h6>

    <p>{{ article.body }}</p>

    <hr>
    <div class="d-flex justify-content-between">
      <div>
        <nuxt-link :to="'/articles/' + article._id + '/update'" class="btn btn-primary mr-3">Update</nuxt-link>
        <button class="btn btn-danger" @click="deleteRecord()">Delete</button>
      </div>
      <nuxt-link to="/articles" class="btn btn-secondary mr-3">Back to Articles</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',

  async asyncData(context){
    const {data} = await context.$axios.get('/api/articles/' + context.route.params.id)
    return {
      article : data
    }
  },

  methods:{
    deleteRecord(){
      if(confirm("Are you sure?") === true){
        this.$axios.delete('/api/articles/' + this.$route.params.id)
          .then((response) => {
            if(response.data._id){
              this.$router.push({ name:'articles', params:{ deleted:'yes' } })
            }
          })
          .catch( (error) => {
            console.log(error);
          });
      }
    }
  }
}
</script>
