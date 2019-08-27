<template>
  <div class="auth-wrapper">
    <div class="auth">
      <div class="auth-info">
        <div class="auth-img">
          <ImageView src="https://www.youbaobao.xyz/mpvue-res/logo.jpg"
                     round
          />
        </div>
        <div class="sub-title">登录小木读书</div>
        <div class="title">全球免费小说畅读</div>
      </div>
      <button
        class="auth-btn"
        open-type="getUserInfo"
        @getuserinfo="getUserInfo"
      >授权登录
      </button>
    </div>
  </div>
</template>

<script>
  import ImageView from './ImageView'

  export default {
    components: {ImageView},
    methods: {
      getUserInfo() {
        this.$emit('getUserInfo')
      }
    }
  }
</script>


<style lang="scss" scoped>
  .auth-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #999;
    z-index: 1000;

    .auth {
      position: relative;
      width: 270px;
      height: 280px;
      background: #f5f5f5;
      border-radius: 18px;

      .auth-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 22.5px;

        .auth-img {
          width: 74px;


        }

        .sub-title {
          font-size: 13px;
          line-height: 8.5px;
          color: #999;
          margin-top: 18px;

        }

        .title {
          font-size: 16px;
          line-height: 22.5px;
          color: #333;
          font-weight: 400;
          margin-top: 3.5px;

        }
      }

      .auth-btn {
        position: absolute;
        width: 100%;
        height: 49px;
        line-height: 49px;
        bottom: 0;
        font-size: 15px;
        color: #fff;
        background-image: linear-gradient(90deg, #1EA3F5 0%, #0F87FC 100%);
        border-radius: 0 0 18px 18px;
      }
    }
  }

</style>
