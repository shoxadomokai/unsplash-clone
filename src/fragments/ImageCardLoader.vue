<template>
  <div class="item">
    <div class="author-info">
      <div class="author-avatar"></div>
      <div class="author-details">
        <div class="name"></div>
        <div class="location"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageSkeleton",
};
</script>

<style lang="scss" scoped>
.item {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  font-size: 16px;
  background: #f5f5f5;
  background-image: linear-gradient(
    to right,
    #f5f5f5 0%,
    #edeef1 20%,
    #f5f5f5 40%,
    #f5f5f5 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 100%;
  position: relative;
  animation: shimmer 1s linear infinite normal forwards;
  height: 60vh;

  @keyframes shimmer {
    0% {
      background-position: -468px 0;
    }

    100% {
      background-position: 468px 0;
    }
  }

  .author-info {
    position: absolute;
    left: 10px;
    bottom: 20px;
    display: grid;
    align-items: center;
    grid-template-columns: 30px 1fr;
    grid-gap: 15px;

    .author-avatar {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      display: block;
      background: #e6e6e6;
    }

    .author-details {
      color: #fff;
      display: grid;
      grid-gap: 8px;

      .name,
      .location {
        background: #e6e6e6;
        height: 10px;
      }

      .name {
        width: 200px;
      }

      .location {
        width: 80px;
      }
    }
  }
}
</style>
