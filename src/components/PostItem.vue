<template>
  <div class="post-list-item">
    <div class="media-left post-media">
      <div class="post-image">
        <a :href="postUrl">
          <img :src="getImageUrl" alt="Image">
        </a>
      </div>
    </div>
    <div class="media-content">
      <div class="post-list-item-content content">
        <a :href="postUrl">
          <strong>{{post.name}} {{post.age}}, </strong>
          <small>с сайта {{post.datingService}} </small>
          <small>
            <span class="icon is-small">
              <font-awesome-icon icon="home"/>
            </span> {{post.city}}
          </small>
          <div class="post-list-item-content-text">
            <span v-html="prepareText"></span>
          </div>
        </a>
      </div>
      <div class="level is-mobile">
        <div class="level-left post-list-item-footer">
          <a class="level-item post-list-item-footer-item" aria-label="comments">
                        <span class="icon is-small">
                          <font-awesome-icon icon="comments"/> 0
                        </span>
          </a>
          <a class="level-item post-list-item-footer-item" aria-label="user">
                        <span class="icon is-small">
                          <font-awesome-icon icon="user"/> {{post.author}}
                        </span>
          </a>
        </div>

        <div class="level-right post-list-item-footer">
          <a class="level-item post-list-item-footer-item-like" aria-label="eye">
                        <span class="icon is-small">
                          <font-awesome-icon icon="thumbs-up"/>
                        </span>
          </a>
          <div class="post-list-item-footer-item-score">
            +1
          </div>
          <a class="level-item post-list-item-footer-item-like" aria-label="user2">
                        <span class="icon is-small">
                          <font-awesome-icon icon="thumbs-down"/>
                        </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


    export default {
        props: ['post'],
        computed: {
            prepareText() {
                let blocks = this.post.message.blocks;
                for (let block of blocks) {
                    if (block.type === 'paragraph') {
                        let text = block.data.text;
                        if (text.length > 180) {
                            return text.substring(0, 180) + '...';
                        } else {
                            return text;
                        }
                    }
                }
                return "Отзыв содержит только медиа данные без текста";
            },
            getImageUrl() { /* todo to common, duplicate in postcreate.vue */
                if (this.post.image !== null) {
                    return this.post.image;
                } else {
                    let imageName = this.post.gender === 'female' ? 'woman.png' : 'man.png';
                    return require('../assets/' + imageName);
                }
            },
            postUrl() {
                return '/posts/' + this.post.id;
            }
        }

    }
</script>

<style scoped>

</style>