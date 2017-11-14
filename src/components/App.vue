<template>
  <AppContainer>
    <router-view/>
  </AppContainer>
</template>

<script>
import AppContainer from '@/components/containers/AppContainer';

export default {
  name: 'app',
  components: { AppContainer },
};
</script>

<style lang='scss' src='@/scss/global/index.scss' />
