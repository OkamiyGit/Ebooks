<template>
  <div class="search-bar">
    <div class="search-bar-wrapper">
      <van-icon
        class="search"
        name="search"
        size="16px"
        color="#858C96"
      ></van-icon>
      <input class="search-bar-input"
             :focus="focus"
             :disabled="disabled"
             :maxlength="limit"
             :placeholder="hotSearch.length===0?'搜索':hotSearch"
             v-model="searchWord"
             @input="onChange"
             confirm-type="search"
             @confirm="onConfirm"
             placeholder-style="color: #ADB4BE; font-size=15px"
      />
      <van-icon
        class="clear"
        name="clear"
        size="16px"
        color="#ccc"
        @click="onClearClick"
        v-if="searchWord.length>0"
      ></van-icon>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      focus: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      limit: {
        type: Number,
        default: 10
      },
      hotSearch: {
        type: String,
        default: ''
      }
    },
    data() {
      return {searchWord: ''}
    },
    methods: {
      onSearchBarClick() {
        this.$emit('onClick')
      },
      onClearClick() {
        this.searchWord = ''
        this.$emit('onClear')
      },
      onChange(e) {
        const {value} = e.mp.detail
        this.$emit('onChange', value)
      },
      onConfirm(e) {
        const {value} = e.mp.detail
        this.$emit('onConfirm', value)
      },
      setValue(v) {
        this.searchWord = v
      },
      getValue() {
        return this.searchWord
      }
    }
  }
</script>


<style lang="scss" scoped>
  .search-bar {
    padding: 15px 15.5px;

    .search-bar-wrapper {
      //水平布局
      display: flex;
      //高度设置之后还需要border-box才有效果
      height: 40px;
      box-sizing: border-box;
      //垂直居中
      align-items: center;
      background: #F5F7F9;
      border-radius: 20px;
      padding: 12px 17px;

      .search-bar-input {
        //将剩余空间撑满
        flex: 1;
        margin: 0 8px;
      }

      .search, .clear {
        display: flex;
        align-items: center;
        height: 100%;
      }
    }
  }
</style>
