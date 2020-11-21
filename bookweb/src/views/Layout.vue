<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-menu-item key="1">
          <a-icon type="user" />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="video-camera" />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="upload" />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
          style="margin-left: 15px"
        />
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '0', padding: '24px', background: '#fff', minHeight: '280px'}"
      >
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
      </a-layout-content>
    </a-layout>
  </a-layout>
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
  name: 'Layout',
  data: function () {
    return {
      collapsed: false,
      columns,
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
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.u-pagination {
  margin-top: 15px;
}

</style>
