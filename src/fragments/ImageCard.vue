<template>
  <div class="item">
    <img
      :src="item.urls.regular"
      class="item-image"
      @click="$emit('viewImage', item)"
    />
    <div class="likes">
      <img src="../assets/like.svg" />
      {{ item.likes }}
    </div>
    <div class="author-info">
      <a :href="item.user.links.html" class="author-avatar">
        <img
          class="author-img"
          target="_blank"
          :src="item.user.profile_image.medium"
          alt
        />
      </a>
      <div class="author-details">
        <a :href="item.user.links.html" target="_blank"
          >{{ item.user.first_name }}
          <template v-if="item.user.last_name">
            {{ item.user.last_name }}
          </template></a
        >
        <p v-if="item.user.location">{{ item.user.location }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageCard",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  position: relative;
  overflow: hidden;
  margin-bottom: 15px;
  font-size: 16px;

  .item-image {
    height: 100%;
    width: 100%;
    object-fit: cover;
    filter: brightness(80%);
    cursor: zoom-in;
    border-radius: 10px;
  }

  .author-info {
    position: absolute;
    left: -100%;
    bottom: 20px;
    transition: 0.3s all ease;
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
      color: #fff;
      a {
        color: #fff;
        font-weight: 500;
        line-height: 18px;
        text-decoration: none;
      }

      p {
        font-size: 13px;
      }
    }
  }

  .likes {
    transition: 0.3s all ease;
    display: flex;
    position: absolute;
    top: 5px;
    right: -110px;
    background: rgb(231, 231, 231);
    border-radius: 7px;
    align-items: center;
    padding: 8px 15px;
    font-size: 13px;
    color: #727272;
    font-weight: 300;
    cursor: pointer;

    img {
      height: 15px;
      width: 15px;
      padding-right: 3px;
    }
  }

  &:hover {
    .likes {
      right: 10px;
    }
    .author-info {
      left: 10px;
    }
  }
}
</style>
