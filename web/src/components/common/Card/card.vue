<template>
  <div class="card">
    <div class="card-header d-flex jc-between al-center">
      <div class="d-flex al-center">
        <i :class="model.icon"></i><h4 
        class="card-title">{{model.title}}</h4>
      </div>
      <div class="d-flex al-center">
          <span v-show="model.text_more">{{model.text_more}}</span>
          <i v-show="model.icon_more" :class="model.icon_more" class="al-center"></i>
      </div>
    </div>
    <div>
      <slot name="card-content"></slot>
    </div>
  </div>
</template>

<script>

  export default {
    props: {
      model: {}
    }
  }
</script>
