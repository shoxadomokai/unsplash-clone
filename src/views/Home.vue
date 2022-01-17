<template>
  <div>
    <splash-header
      v-model="query"
      :searching="searching"
      @search="search"
    ></splash-header>
    <div class="loading-grid" v-if="loading" key="loading">
      <image-card-loader v-for="n in 6" :key="n" />
    </div>

    <template v-else>
      <splash-error v-if="errors.length > 0" :error="errors[0]" />
      <transition v-else name="fade" mode="out-in">
        <div class="images-grid" v-if="!searching" key="default">
          <masonry :cols="3" :gutter="10">
            <image-card
              v-for="(item, index) in items"
              :key="index"
              :item="item"
              @viewImage="viewImage"
            />
            <!-- <infinite-loading @infinite="infiniteHandler"></infinite-loading> -->
          </masonry>
          <infinite-loading @infinite="infiniteHandler"></infinite-loading>
        </div>
        <div class="images-grid" v-else key="search">
          <masonry :cols="3" :gutter="10">
            <image-card
              v-for="(item, index) in search_items"
              :key="index"
              :item="item"
              @viewImage="viewImage"
            />
          </masonry>
          <infinite-loading @infinite="infiniteSearch"></infinite-loading>
        </div>
      </transition>
    </template>

    <modal
      name="image-popup"
      :value="showModal"
      rounded="10"
      size="lg"
      animation="scale"
      :title="false"
      :footer="true"
      @close="showModal = false"
      v-if="image"
    >
      <img :src="image.urls.small" alt="" class="full-image" />
      <template #footer>
        <div class="author-info">
          <a :href="image.user.links.html" class="author-avatar">
            <img
              class="author-img"
              target="_blank"
              :src="image.user.profile_image.medium"
              alt
            />
          </a>
          <div class="author-details">
            <a :href="image.user.links.html" target="_blank"
              >{{ image.user.first_name }}
              <template v-if="image.user.last_name">
                {{ image.user.last_name }}
              </template></a
            >
            <p v-if="image.user.location">{{ image.user.location }}</p>
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import axios from "axios";
import { SplashHeader, ImageCard, ImageCardLoader } from "@/fragments";
import { Modal, SplashError } from "@/components";

export default {
  name: "Home",
  components: {
    SplashHeader,
    ImageCard,
    Modal,
    ImageCardLoader,
    SplashError,
  },
  data() {
    return {
      items: [],
      errors: [],
      page: 1,
      searchPage: 1,
      query: "",
      image: null,
      search_items: [],
      newest: true,
      loading: true,
      showModal: false,
      searching: false,
    };
  },
  created() {
    this.fetchImages();
  },
  methods: {
    viewImage(imageUrl) {
      this.image = imageUrl;
      this.showModal = true;
    },
    async infiniteHandler($state) {
      try {
        const { data } = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              client_id: "g-9sgbiT55ggjoCi_eFssZOewGDmFRjysKbofT62e30",
              query: "African",
              page: this.searchPage,
            },
          }
        );
        this.page += 1;
        this.items = this.items.concat(data.results);
        $state.loaded();
      } catch (e) {
        console.log(e);
      }
    },
    async infiniteSearch($state) {
      try {
        const { data } = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              client_id: "g-9sgbiT55ggjoCi_eFssZOewGDmFRjysKbofT62e30",
              query: this.query,
              page: this.searchPage,
            },
          }
        );
        this.searchPage += 1;
        this.search_items = this.search_items.concat(data.results);
        $state.loaded();
      } catch (e) {
        console.log(e);
      }
    },
    async search() {
      this.loading = true;
      this.newest = false;
      this.searching = true;
      this.searchPage = 1;
      this.errors = [];

      try {
        const { data } = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              client_id: "g-9sgbiT55ggjoCi_eFssZOewGDmFRjysKbofT62e30",
              query: this.query,
              page: this.searchPage,
            },
          }
        );
        this.search_items = data.results;
      } catch (e) {
        this.errors.push(e);
      } finally {
        this.loading = false;
      }
    },
    async fetchImages() {
      this.errors = [];
      try {
        // eslint-disable-next-line no-unreachable
        const { data } = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              client_id: "g-9sgbiT55ggjoCi_eFssZOewGDmFRjysKbofT62e30",
              query: "African",
              page: this.page,
            },
          }
        );
        this.items = data.results;
      } catch (e) {
        this.errors.push(e);
      } finally {
        this.loading = false;
      }
    },
  },
  watch: {
    query(newValue) {
      if (!newValue) {
        this.searching = false;
      }
    },
  },
};
</script>
<style lang="scss">
.load {
  border: 1px solid #ed3a8a;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 24px;
  margin-bottom: 15px;
  background: #fff;
  color: #ed3a8a;
  cursor: pointer;
  outline: none;
}

.full-image {
  max-width: 100%;
  height: 100%;
  object-fit: contain;
}

.author-info {
  display: grid;
  align-items: center;
  grid-template-columns: 30px 1fr;
  grid-gap: 15px;

  .author-avatar {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    display: block;
    cursor: pointer;
    overflow: hidden;

    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }

  .author-details {
    a {
      font-weight: 600;
      line-height: 18px;
      text-decoration: none;
      color: #253858;
    }

    p {
      font-size: 14px;
      margin-top: 4px;
      font-weight: normal;
    }
  }
}

.loading-grid {
  display: grid;
  grid-gap: 25px;
  margin-top: 15px;
  padding-left: 50px;
  padding-right: 50px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.images-grid {
  margin-top: 15px;
  padding-left: 50px;
  padding-right: 50px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.9s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
