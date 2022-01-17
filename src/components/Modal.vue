<template>
  <div>
    <transition name="fade">
      <div v-if="value" class="modal-backdrop" @click="$emit('close', false)">
        <button class="close" aria-label="Close" @click="$emit('close', false)">
          <img src="@/assets/close.png" alt="" />
        </button>
      </div>
    </transition>
    <transition :name="animation">
      <div
        :ref="`modal-${name}`"
        :id="`modal-${name}`"
        class="modal"
        v-show="value"
        tabindex="-1"
        :aria-labelledby="`modal-${name}-title`"
      >
        <div class="modal__content">
          <h4 v-if="title" class="modal__title" :id="`modal-${name}-title`">
            <slot name="header"></slot>
          </h4>
          <div class="modal__body">
            <slot></slot>
          </div>
          <div v-if="footer" class="modal__footer">
            <slot name="footer">{{ footer }}</slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "SplashModal",
  watch: {
    value(value) {
      if (value) {
        document.addEventListener("keydown", this.close);
      } else {
        document.removeEventListener("keydown", this.close, true);
      }
    },
  },
  props: {
    value: {
      required: true,
    },
    title: {
      type: Boolean,
      default: false,
    },
    footer: {
      type: Boolean,
      default: true,
    },
    animation: {
      default() {
        return "flip";
      },
    },
  },
  computed: {
    modal() {
      return document.getElementById(`modal-${this.name}`);
    },
  },
  methods: {
    close(event) {
      if (event && event.keyCode === 27) {
        this.$emit("close", false);
      }
    },
    setBorderRadius() {
      let rounded = this.rounded;
      if (typeof rounded === "number" || !rounded.match("[a-zA-Z]")) {
        rounded += "px";
      }
      this.modal.style.borderRadius = rounded;
      this.modalFooter.style.borderRadius = `0 0 ${rounded} ${rounded}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-backdrop {
  background: rgba(19, 50, 82, 0.5);
  backdrop-filter: blur(4px);
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 9998;

  .close {
    all: unset;
    box-sizing: border-box !important;
    cursor: pointer;
    position: absolute;
    background: #ed3a8a;
    padding: 10px;
    width: 40px;
    height: 40px;
    top: 30px;
    right: 30px;
    border-radius: 50%;
    box-shadow: 0px 3px 7px rgba(19, 50, 82, 0.1);
    display: grid;
    place-items: center;

    img {
      max-height: 70%;
      max-width: 70%;
      filter: invert(1) brightness(100);
    }
  }
}
// root
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  max-width: 90vw;
  max-height: 90vh;
  transform: translate(-50%, -50%);
  box-shadow: 0px 5px 20px rgba(19, 50, 82, 0.2);
  border-radius: 15px;
  display: grid;
  place-items: center;
  z-index: 9999;

  > * {
    box-sizing: border-box !important;
  }

  .modal__content {
    max-width: 80vw;
    max-height: 80vh;
    background: white;
    border-radius: 15px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .modal__title {
    font-size: Clamp(1.5rem, 1.5vw, 2rem);
    padding: 20px;
    text-transform: capitalize;
    margin-bottom: 0;
  }

  .modal__body {
    padding: 0;
    width: 100%;
    overflow: hidden;
  }

  .modal__footer {
    background: white;
    padding: 20px;
    text-align: left;
    border-radius: 0 0 15px 15px;

    * {
      margin: 0;
    }
  }
}

// animations scale
.scale-enter-active {
  animation: scale 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);
}

.scale-leave-active {
  animation: scale 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) reverse;
}
@keyframes scale {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

// animations swirl
.swirl-enter-active {
  animation: swirl 0.6s ease-out;
}

.swirl-leave-active {
  animation: swirl 0.6s ease-out reverse;
}
@keyframes swirl {
  0% {
    transform: translate(-50%, -50%) rotate(-540deg) scale(0);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%) rotate(0) scale(1);
    opacity: 1;
  }
}

// animations flip
.flip-enter-active {
  animation: flip 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.flip-leave-active {
  animation: flip 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse;
}

@keyframes flip {
  0% {
    transform: translate(-50%, -50%) rotate3d(-1, 1, 0, -80deg);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%) rotate3d(1, 1, 0, 0deg);
    opacity: 1;
  }
}

// animations swing
.swing-enter-active {
  animation: swing 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.swing-leave-active {
  animation: swing 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) reverse;
}

@keyframes swing {
  0% {
    transform: translate(-50%, -50%) rotateX(-100deg);
    transform-origin: top;
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%) rotateX(0deg);
    transform-origin: top;
    opacity: 1;
  }
}
// animations swing
.slide-enter-active {
  animation: slide 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.slide-leave-active {
  animation: slide 0.6s cubic-bezier(0.23, 1, 0.32, 1) reverse;
}

@keyframes slide {
  0% {
    transform: translate(-50%, -1000px) scaleY(2.5) scaleX(0.2);
    transform-origin: 50% 0%;
    filter: blur(40px);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%) scaleY(1) scaleX(1);
    transform-origin: 50% 50%;
    filter: blur(0);
    opacity: 1;
  }
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
