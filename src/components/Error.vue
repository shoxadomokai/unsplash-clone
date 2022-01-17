<template>
  <main id="error">
    <div class="error-404">
      <h1>
        <template v-if="error.code">
          {{ error.code }}
        </template>
        <template v-else> 404 </template>
      </h1>
      <h2>{{ error.message }}</h2>
    </div>
  </main>
</template>

<script>
export default {
  name: "ErrorComponent",
  props: {
    error: {
      type: undefined,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
#error {
  position: relative;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
  background: black;
}

.error-404 {
  h1 {
    font-size: 224px;
    font-weight: 900;
    margin-top: 0px;
    margin-bottom: 0px;
    color: black;
    margin-left: -12px;
    text-transform: uppercase;
    text-shadow: -2px -2px 0px #3fd3f2, 2px 2px 0px #ed3a8a;
    letter-spacing: -20px;
  }

  h2 {
    font-size: 42px;
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    text-shadow: 0px 2px 0px #3fd3f2;
    letter-spacing: 13px;
    margin: 0;
    max-width: 60vw;
    text-align: center;
  }
}

@media only screen and (max-width: 767px) {
  .error-404 h2 {
    font-size: 24px;
  }
}

@media only screen and (max-width: 480px) {
  .error-404 h1 {
    font-size: 182px;
  }
}
</style>
