<template>
    <div>
              <iframe :src='url' id='show' width='100%'
                      height="1000px" frameborder=0 name='showHere' scrolling="auto">
              </iframe>
    </div>
</template>

<script>
    export default {
        name: "FlowMonitor",
        data(){
          return{
            url: this.$config.SentinelUrl
          }
        },
    }
</script>

<style scoped>

</style>
