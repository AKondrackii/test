<template>
  <div class="hover-card">
    <div class="img-block">
      <b-img-lazy :src="image" :alt="title" />
    </div>
    <div class="description-block">
      <div class="container">
        <h4>{{ title }}</h4>
        <p>{{ text }}</p>
      </div>
    </div>
    <div class="link-block">
      <a :href="link" target="_blank">
        <b-icon-arrow-right-short />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HoverCard',
  props: {
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: false,
      default: ''
    },
    link: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.hover-card {
  display: inline-block;
  max-width: 100%;
  max-height: 100%;
  position: relative;

  .img-block {
    overflow: hidden;

    img {
      width: 100%;
      height: auto;
      transform: scale(1);
      transition: 0.3s;
      filter: blur(0) brightness(100%);
    }

    &,
    & img {
      width: 100%;
    }
  }

  .description-block {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #fff;
    opacity: 0;
    transition: 0.2s;
    transition-delay: 0.1s;
    transform: scale(0.5);

    h4 {
      font-size: 2rem;
    }

    p {
      font-size: 1.4rem;
      margin-top: 10px;
    }
  }

  .link-block {
    width: 50px;
    height: 50px;
    position: absolute;
    bottom: 20px;
    left: 50%;
    text-align: center;
    opacity: 0;
    transition: 0.4s;
    transition-delay: 0.2s;
    background: rgba(0, 0, 0, 0.5);
    transform: translate(-50%, 0);
    border-radius: 50%;

    a {
      text-decoration: none;
      color: #fff;
      line-height: 50px;
      font-size: 30px;
      z-index: 3;
    }
  }

  &:hover {
    .img-block {
      img {
        transform: scale(1.2);
        filter: blur(1.2px) brightness(50%);
      }
    }

    .description-block {
      opacity: 1;
      transform: scale(1);
    }

    .link-block {
      opacity: 1;
    }
  }
}
</style>
