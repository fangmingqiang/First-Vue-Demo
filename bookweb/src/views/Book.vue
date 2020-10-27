<template>
  <div>
    <a-table :columns="columns"
             :data-source="datasource"
             :rowKey="record => record.id"
             :pagination="false">
    </a-table>
    <a-pagination
      class="u-pagination"
      v-model="current"
      :total="pages * 10"
      show-less-items
      @change="onChange(current, size)"
      :item-render="itemRender"/>
  </div>
</template>

<script>

import axios from 'axios'

const columns = [
  {
    title: '书名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '作者',
    dataIndex: 'author',
    key: 'author'
  },
  {
    title: '出版社',
    dataIndex: 'publish',
    key: 'publish'
  },
  {
    title: '页数',
    key: 'pages',
    dataIndex: 'pages'
  },
  {
    title: '价格',
    key: 'price',
    dataIndex: 'price'
  }
]

export default {
  name: 'Book',

  data: function () {
    return {
      datasource: [],
      columns,
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
      axios.get('http://localhost:8089/book/all/' + (current - 1) * size + '/' + size).then(res => {
        this.datasource = res.data
        console.log(this.datasource)
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
.u-pagination {
  margin-top: 15px;
}
</style>
