<template>
  <div class="u-div">
    <a-list class="ant-list">
      <a-list-item class="ant-list-bordered ant-list-item-content u-list-item" style="position: center" v-for="item in datasource" :key="item.id">
        <span class="u-span">{{item.id}}--{{item.name}}--{{item.name}}--{{item.author}}--{{item.publish}}</span>
      </a-list-item>
    </a-list>
<!--    ID：<a-input class="u-input" v-model="id"></a-input>-->
<!--    <a-button @click="buttonClick" class="u-button">点击我</a-button>-->
    <hr/>
    <a-pagination v-model="current" :total="pages * 10"  show-less-items @change="onChange(current, size)" :item-render="itemRender"/>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'BookShow',

  data: function () {
    return {
      datasource: [],
      current: 1,
      count: 0,
      size: 5,
      pages: 0
    }
  },

  created () {
    this.loadCount()
    this.loadData(this.current, this.size)
  },

  methods: {
    loadData (current, size) {
      const postData = { current: (current - 1) * size, size: size, token: localStorage.getItem('accessToken') }
      axios.post('http://localhost:8089/book/all/', postData).then(res => {
        this.datasource = res.data
      })
    },
    loadCount () {
      axios.get('http://localhost:8089/book/count').then(res => {
        this.count = res.data
        if (this.count % this.size === 0) {
          this.pages = this.count / this.size
          // console.log(this.pages)
        } else {
          this.pages = Math.ceil(this.count / this.size)
          // console.log(this.pages)
        }
      })
    },
    onChange (current, size) {
      this.current = current
      this.loadData(current, size)
    },
    itemRender (current, type, originalElement) {
      if (type === 'prev') {
        return <a>上一页</a>
      } else if (type === 'next') {
        return <a>下一页</a>
      }
      return originalElement
    }
  }
}
</script>

<style scoped>
.u-input {
  width: 100px;
}

.u-span {
  margin: 0 auto;
}

.u-button {
  margin-left: 10px;
}

.u-div {
  width: 600px;
  margin: 0 auto;
}

</style>
