<template>
  <div class="home-card">
    <div class="home-card-inner">
      <div class="user-info">
        <div class="avatar-wrapper">
          <ImageView :src="avatar" round/>
        </div>
        <div class="nickname">{{nickname}}</div>
        <div class="shelf-text">书架共有{{data.num}}本好书</div>
        <div class="round-item"></div>
        <div class="shelf-text">特别精选</div>
      </div>
      <div class="book-info">
        <div class="book-wrapper">
          <div class="book-img-wrapper"
               v-for="(item ,index) in bookList" :key="index"
               @click="onBookClick"
          >
            <ImageView :src="item.cover"/>
          </div>
        </div>
        <div class="shelf-wrapper">
          <div class="shelf">书架</div>
          <van-icon class="arrow" name="arrow" size="11px" color="#828489"></van-icon>
        </div>
      </div>
      <div class="feedback-wrapper">
        <span @click="onFeedBackClick">反馈</span>
      </div>
    </div>
    <van-dialog id="van-dialog"></van-dialog>
  </div>
</template>

<script>
  import ImageView from '../base/ImageView'
  import Dialog from 'vant-weapp/dist/dialog/dialog'

  export default {
    components: {ImageView},
    // 通过计算属性获取对应的值，因为请求时异步的，直接拿不到值，防止直接取数据为空
    computed: {
      avatar() {
        return (this.data && this.data.userInfo && this.data.userInfo.avatar) || ''
      },
      nickname() {
        return (this.data && this.data.userInfo && this.data.userInfo.nickname) || ''
      },

      // 是否存在bookList，不存在就返回空数组
      bookList() {
        return (this.data && this.data.bookList) || []
      }

    },
    props: {
      data: Object,
      hasSign: {
        type: Boolean,
        default: false
      },
      signDay: {
        type: Number,
        default: 0
      }
    },
    methods: {
      gotoShelf() {

      },
      onBookClick() {
        this.$emit('onClick')
      },
      sign() {

      },
      onFeedBackClick() {
        // 要使用dialog弹框必须添加节点
        Dialog.confirm({
          title: '反馈',
          message: '你是否确认提交反馈信息?',
          confirmButtonText: '是',
          cancelButtonText: '否'
        }).then(() => {
          console.log('点击是之后的事件')
        }).catch(() => {
          console.log('点击否之后的事件')
        })
      }
    }

  }
</script>

<style lang="scss" scoped>
  .home-card {
    background-image: linear-gradient(-90deg, #54575F 0%, #595B60 100%);
    border-radius: 15px;
    margin: 20px 22px 0;

    .home-card-inner {
      position: relative;
      padding: 21.5px 17px 20px 20px;
      box-sizing: border-box;

      .user-info {
        display: flex;
        align-items: center;

        .avatar-wrapper {
          width: 20px;
          height: 20px;
        }

        .nickname, .shelf-text {
          font-size: 12px;
          color: #fff;
        }

        .shelf-text {
          opacity: 0.7;
        }

        .nickname {
          margin: 0 8.5px;
        }

        .round-item {
          width: 4px;
          height: 4px;
          background: #a2a2a2;
          border-radius: 50%;
          margin: 0 8px;
        }

      }

      .book-info {
        display: flex;
        margin-top: 16.5px;

        .book-wrapper {
          flex: 1;
          display: flex;
          justify-content: space-around;

          .book-img-wrapper {
            width: 72px;
            height: 101px;
          }
        }

        .shelf-wrapper {
          display: flex;
          align-items: center;

          .shelf {
            width: 11px;
            font-size: 11px;
            word-break: break-word;
            color: #fff;
            opacity: .8;
          }
        }

      }

      .feedback-wrapper {
        position: absolute;
        right: 0;
        top: 19.5px;
        z-index: 1;
        width: 44.5px;
        height: 23.5px;
        line-height: 23.5px;
        text-align: center;
        background: #707070;
        border-radius: 100px 0 0 100px;
        color: #fff;
        font-size: 11px;
      }

    }
  }

</style>
