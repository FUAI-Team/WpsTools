<template>
  <div class="global">
    <div class="iframe-container">
      <!-- 公网没办法访问局域网中的资源 -->
      <!-- <iframe src="http://172.16.167.83:3000/" frameborder="0" class="web-iframe"></iframe> -->
    </div>
    <div class="button-container">
      <button style="margin: 3px" @click="onbuttonclick('dockLeft')">停靠左边</button>
      <button style="margin: 3px" @click="onbuttonclick('dockRight')">停靠右边</button>
      <button style="margin: 3px" @click="onbuttonclick('hideTaskPane')">隐藏TaskPane</button>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import axios from 'axios'
import taskPane from './js/taskpane.js'
export default {
  name: 'TaskPane',
  data() {
    return {
      DemoSpan: '',
      docName: ''
    }
  },
  methods: {
    onbuttonclick(id) {
      return taskPane.onbuttonclick(id)
    },
    onDocNameClick() {
      this.docName = taskPane.onbuttonclick('getDocName')
    },
    onOpenWeb() {
      taskPane.onbuttonclick('openWeb', this.DemoSpan)
    }
  }
}
onMounted(() => {
  axios.get('/.debugTemp/NotifyDemoUrl').then((res) => {
    this.DemoSpan = res.data
  })
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.global {
  font-size: 15px;
  min-height: 95%;
}
.divItem {
  margin-left: 5px;
  margin-bottom: 18px;
  font-size: 15px;
  word-wrap: break-word;
}
.iframe-container {
  flex: 1;
  overflow: hidden;
  width: 100%;
}
.web-iframe {
  width: 100%;
  height: 100%;
  border: none;
}
.button-container {
  padding: 10px;
  border-top: 1px solid #e0e0e0;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
}
</style>
