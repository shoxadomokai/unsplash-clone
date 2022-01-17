<template>
  <div class="header" :style="{ backgroundImage: `url(${image})` }">
    <transition name="fade" mode="out-in">
      <div v-if="searching" class="inform">
        <h1 class="large">
          Searching for <span>"{{ value }}"</span>
        </h1>
      </div>
      <div v-else class="inform">
        <h1><span>Shox</span>Splash</h1>
        <p>
          Beautiful, free photos. <br />Gifted by the world’s most generous
          community of photographers. 🎁
        </p>
      </div>
    </transition>
    <input
      type="text"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
      @keyup.enter="$emit('search')"
      placeholder="Search for photo"
    />
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "SplashHeader",
  props: {
    value: {
      type: String,
      required: true,
    },
    searching: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      image: "",
    };
  },
  created() {
    axios
      .get("https://api.unsplash.com/photos/random", {
        params: {
          client_id: "g-9sgbiT55ggjoCi_eFssZOewGDmFRjysKbofT62e30",
        },
      })
      .then((response) => {
        this.image = response.data.urls.regular;
      })
      .catch((e) => {
        console.log(e);
        // this.erorrs.push(e);
      });
  },
};
</script>
<style lang="scss">
.header {
  height: Max(65vh, 300px);
  display: grid;
  justify-items: start;
  justify-content: center;
  align-items: flex-start;
  background-position: center center;
  background-size: cover;
  background-color: #858a90;
  /* background-color: #dde2e9; */
  background-blend-mode: multiply;
  margin-bottom: -60px;

  h1 {
    margin-top: 0;
    margin-bottom: 10px;
    text-align: left;
    text-align-last: left;
    color: #fff;
    font-family: "Ubuntu";
    font-weight: bold;
    font-size: 32px;

    span {
      color: #ed3a8a;
    }

    &.large {
      font-size: 48px;
    }
  }
  p {
    text-align: left;
    color: #fff;
    font-family: "Ubuntu";
    font-weight: 500;
    font-size: 18px;
    margin-top: 0;
  }
}

input {
  margin-top: 20px;
  width: 50vw;
  border-radius: 5px;
  border: 0;
  height: 45px;
  font-family: "Montserrat";
  font-weight: 300;
  color: dimgray;
  padding-left: 15px;
  outline: none;
  border: 2px solid #fff;
  transition: all 0.3s;
  font-weight: 800;
  &:focus {
    border: 2px solid #42b983;
  }
}

.inform {
  align-self: flex-end;
  align-items: flex-end;
  align-content: flex-end;
  justify-items: flex-start;
  justify-content: start;
  text-align: left;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
