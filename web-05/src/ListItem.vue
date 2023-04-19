<script>
    export default {
        props: ['time', 'content'],
    }
</script>

<template>

  <div>
    {{ time }}, {{ content }}
  </div>
  
</template>