<template>
    <div>
<!--      <iframe :src='url' id='show' width='100%'-->
<!--              height="1000px" frameborder=0 name='showHere' scrolling="auto">-->
<!--      </iframe>-->
    </div>
</template>

<script>
    export default {
        name: "ApiMangement",
        data(){
          return{
            url: this.$config.Swagger2Url
          }
        },
      mounted() {
        window.open(this.url, '_blank').location;
      }
    }
</script>

<style scoped>

</style>
