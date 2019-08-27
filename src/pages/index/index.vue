<template>
  <div>
    <div class="home" v-if="isAuth">
      <SearchBar
        disabled
        @onClick="onSearchBarClick"
        :hot-search="hotSearch"
      />
      <HomeCard
        :data="homeCard"
      />
      <HomeBanner
        img="http://www.youbaobao.xyz/book/res/bg.jpg"
        title="Okamiy-mpVue实战练习中..."
        subTitle="立即体验"
        @onClick="onBannerClick"
      />
      <div :style="{marginTop:'23px'}">
        <HomeBook title="为你推荐"
                  :row="1"
                  :col="3"
                  :data="recommend"
                  mode="col"
                  btn-text="换一批"
                  @onMoreClick="()=>recommendChange('recommend')"
                  @onBookClick="onHomeBookClick"
        />
      </div>
      <div :style="{marginTop:'23px'}">
        <HomeBook title="免费阅读"
                  :row="2"
                  :col="2"
                  :data="freeRead"
                  mode="row"
                  btn-text="换一批"
                  @onMoreClick="()=>recommendChange('freeRead')"
                  @onBookClick="onHomeBookClick"
        />
      </div>
      <div :style="{marginTop:'23px'}">
        <HomeBook title="当前最热"
                  :row="1"
                  :col="4"
                  :data="hotBook"
                  mode="col"
                  btn-text="换一批"
                  @onMoreClick="recommendChange('hotBook')"
                  @onBookClick="onHomeBookClick"
        />
      </div>
      <div :style="{marginTop:'23px'}">
        <HomeBook title="分类"
                  :row="2"
                  :col="2"
                  :data="category"
                  mode="category"
                  btn-text="查看全部"
                  @onMoreClick="onCategoryMoreClick"
                  @onBookClick="onHomeBookClick"
        />
      </div>
    </div>
    <Auth v-if="!isAuth" @getUserInfo="init"/>
  </div>
</template>

<script>
  import SearchBar from '../../components/home/SearchBar'
  import ImageView from '../../components/base/ImageView'
  import HomeCard from '../../components/home/HomeCard'
  import HomeBanner from '../../components/home/HomeBanner'
  import HomeBook from '../../components/home/HomeBook'
  import Auth from '../../components/base/Auth'
  import {getHomeData, recommend, freeRead, hotBook, register} from '../../api'
  import {getSetting, getUserInfo, setStorageSync, getStorageSync, getUserOpenId} from '../../api/wechat'

  export default {
    components: {HomeBook, HomeBanner, HomeCard, ImageView, SearchBar, Auth},
    data() {
      return {
        hotSearch: '',
        banner: {},
        recommend: [],
        freeRead: [],
        hotBook: [],
        category: [],
        homeCard: {},
        isAuth: true
      }
    },
    methods: {
      recommendChange(key) {
        switch (key) {
          case 'recommend':
            recommend().then(response => {
              this.recommend = response.data.data
            })
            break
          case 'freeRead':
            freeRead().then(response => {
              this.freeRead = response.data.data
            })
            break
          case 'hotBook':
            hotBook().then(response => {
              this.hotBook = response.data.data
            })
            break
          default:
        }
      },
      onHomeBookClick() {
        console.log('home book click')
      },
      onCategoryMoreClick() {
        console.log('category  click')
      },
      onSearchBarClick() {
      },
      onBannerClick() {
        console.log('Banner Click ...')
      },
      getHomeData(openId) {
        getHomeData({openId}).then(response => {
          const {
            data: {
              hotSearch: {
                keyword
              },
              shelf,
              banner,
              recommend,
              freeRead,
              hotBook,
              category,
              shelfCount
            }
          } = response.data
          this.hotSearch = keyword
          this.banner = banner
          this.recommend = recommend
          this.freeRead = freeRead
          this.hotBook = hotBook
          this.category = category
          this.homeCard = {
            bookList: shelf,
            num: shelfCount,
            userInfo: {
              avatar: 'https://www.youbaobao.xyz/mpvue-res/logo.jpg',
              nickname: 'Okamiy'
            }
          }
        })
      },
      getUserInfo() {
        const onOpenIdComplete = (openId, userInfo) => {
          this.getHomeData(openId)
          register(openId, userInfo)
        }
        getUserInfo(
          (userInfo) => {
            console.log(userInfo)
            setStorageSync('userInfo', userInfo)
            const openId = getStorageSync('openId')
            if (!openId || openId.length === 0) {
              getUserOpenId(openId => onOpenIdComplete(openId, userInfo))
            } else {
              onOpenIdComplete(openId, userInfo)
              console.log('已获得openId...')
            }
          },
          () => {
            console.log('failed....')// 获取用户信息失败，抛出异常
          }
        )
      },
      getSetting() {
        getSetting('userInfo', () => {
          this.isAuth = true
          this.getUserInfo()
        }, () => {
          this.isAuth = false
        }
        )
      },
      init() {
        this.getSetting()
      },
      onBookMoreClick() {
        console.log('more book click')
      }
    },
    mounted() {
      // this.getHomeData()
      // 获取用户授权
      this.init()
    }
  }
</script>

<style lang="scss" scoped>

</style>
