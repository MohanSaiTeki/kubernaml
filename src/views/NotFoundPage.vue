<template>
  <v-row>
      <v-col md="12" sm="12" xs="12" lg="12" xl="12">
          <div id="title-txt">Kubernaml</div>
      </v-col>
      <v-col md="12" sm="12" xs="12" lg="12" xl="12">
          <div id="error">404 Error</div>
      </v-col>
      <v-col md="12" sm="12" xs="12" lg="12" xl="12">
          <div id="error-helper-txt">Sorry the page your looking is not found. Please go to <a href="/">Home</a> page</div>
      </v-col>
  </v-row>
</template>

<script>
export default {

}
</script>

<style scoped>
#title-txt {
    font-size: 48px;
    font-weight: 600;
    text-align: center;
}
#error {
    padding-top: 8%;
    font-size: 128px;
    text-align: center;
}

#error-helper-txt {
    text-align: center;
}
</style>