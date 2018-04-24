<template>
  <div class="components-scroll" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    props: {
      bounce: {
          type: [Boolean, Object],
          default: false
      },
      probeType: {
        type: Number,
        default: 0
      },
      listenTouchEnd: {
          type: Boolean,
          default: false
      },
      listenScrollEnd: {
          type: Boolean,
          default: false
      },
      scrollbar: {
          type: [Boolean, Object],
          default: false
      }
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return;
        }

        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
              bounce: this.bounce,
              probeType: this.probeType,
              scrollbar: this.scrollbar
          });
        } else {
          this.scroll.refresh();
        }

        if (this.listenTouchEnd) {
          this.scroll.on('touchEnd', (pos) => {
            this.$emit('touchEnd', pos);
          });
        }

        if (this.listenScrollEnd) {
          this.scroll.on('scrollEnd', (pos) => {
            this.$emit('scrollEnd', pos);
          });
        }
      }
    }
  }

</script>

<style>


</style>
