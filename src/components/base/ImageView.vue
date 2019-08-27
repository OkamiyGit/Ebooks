<template>
  <div class="image-view" @click="onClick">
    <img
      :class="round?'round image':'image'"
      :style="{height}"
      :src="src"
      :mode="mode"
      :lazyLoad="lazyLoad"
      @load="onLoad"
      @error="onError"
      v-show="!isLoading&&!error"
    />
    <img
      :class="round?'round image':'image'"
      :style="{height}"
      src="/static/loading-img.jpeg"
      :mode="mode"
      :lazyLoad="lazyLoad"
      v-show="isLoading||error"
    />
  </div>
</template>

<script>
  export default {
    props: {
      // 图片路径
      src: {
        type: String,
        default: ''
      },
      // 图片的加载模式,默认宽度自适应
      mode: {
        type: String,
        default: 'widthFix'
      },
      // 图片加载是否开始懒加载
      lazyLoad: {
        type: Boolean,
        default: false
      },
      // 图片是否为圆形
      round: {
        type: Boolean,
        default: false
      },
      // 图片的高度,默认高度自适应
      height: {
        type: String,
        default: 'auto'
      }
    },
    watch: {
      src(newValue, preValue) {
        if (newValue && newValue.length > 0 && newValue !== preValue) {
          // 重新触发渲染
          this.$nextTick(() => {
            this.isLoading = true
            this.error = false
          })
        }
      }
    },
    data() {
      return {
        isLoading: true,
        error: false
      }
    },
    methods: {
      onClick() {
        this.$emit('onClick')
      },
      // 加载成功执行此方法
      onLoad() {
        this.isLoading = false
        this.error = false
      },
      onError() {
        this.error = true
        this.isLoading = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .image-view {
    width: 100%;

    .image {
      width: 100%;

      &.round {
        border-radius: 50%;
      }
    }
  }
</style>
