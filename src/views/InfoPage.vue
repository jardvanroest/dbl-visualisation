<template>
  <div class="info-page-cont">
    <div class="info-container">
      <div class="content-panel">
        <div>Sections</div>
        <ul class="all-features">
          <li><a href="#what-is">What is MailVis?</a></li>
          <li><a href="#adj-mat">Adjacency matrix and sorting</a></li>
          <li><a href="#node-link">Node-link diagram</a></li>
          <li><a href="#cal-mat">Calendar matrix</a></li>
          <li><a href="#interaction">Interaction modes</a></li>
          <li><a href="#filters">Filters</a></li>
          <li><a href="#layout">Layout</a></li>
          <li><a href="#insp-menu">Inspector menu</a></li>
          <li><a href="#tooltips">Tooltips</a></li>
          <li><a href="#dataset-link">Dataset link</a></li>
        </ul>
        <Btn @click="redirectToHome" text="Back to home" class="button" />
      </div>
      <div class="section" id="what-is">
        <h2>What is MailVis?</h2>
        <hr />
        <p>
          MailVis is a web-based visualisation tool suited for visualising
          datasets of email correspondence. It was made by 6 first-year computer
          science students from the Eindhoven University of Technology in less
          than 3 months.
        </p>
        <br />
        <iframe
          src="https://www.youtube.com/embed/c2_C7dl9oVk"
          title="YouTube video player"
          frameborder="0"
          allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>
      <div class="section">
        <h2>Features</h2>
        <hr />
        <p>Here are all available features and how to use them:</p>
      </div>
      <div id="adj-mat" class="section">
        <h2>Adjacency matrix and sorting</h2>
        <hr />
        <p></p>
      </div>
      <div id="node-link" class="section">
        <h2>Node-link diagram</h2>
        <hr />
        <p></p>
      </div>
      <div id="cal-mat" class="section">
        <h2>Calendar matrix</h2>
        <hr />
        <p></p>
      </div>
      <div id="interaction" class="section">
        <h2>Interaction modes</h2>
        <hr />
        <p></p>
      </div>
      <div id="filters" class="section">
        <h2>Filters</h2>
        <hr />
        <p></p>
      </div>
      <div id="layout" class="section">
        <h2>Layout</h2>
        <hr />
        <p></p>
      </div>
      <div id="insp-menu" class="section">
        <h2>Inspector menu</h2>
        <hr />
        <p></p>
      </div>
      <div id="tooltips" class="section">
        <h2>Tooltips</h2>
        <hr />
        <p></p>
      </div>
      <div id="dataset-link" class="section">
        <h2>Dataset link</h2>
        <hr />
        <p></p>
      </div>
    </div>
  </div>
</template>

<script>
import Btn from "@/components/buttons/Btn.vue";

export default {
  name: "InfoPage",
  components: {
    Btn,
  },
  methods: {
    redirectToHome() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style scoped lang="scss">
.info-page-cont {
  position: absolute;
  width: 100%;
  top: 0;

  font-size: 1.25rem;
  background-color: var(--background-color-2);
}

.info-container {
  --width-ic: min(75ch, 80vw);

  top: 0;
  margin: auto;
  padding: 0.5rem;
  width: var(--width-ic);

  background-color: var(--background-color);
  box-shadow: rgba(108, 112, 116, 0.3) 0px 5px 10px 0px,
    rgba(162, 164, 165, 0.15) 0px 10px 30px 10px;
}

.section {
  padding-top: 0em;
  text-align: center;
}

h2 {
  font-family: "Roboto", sans-serif;
  font-size: 2.5rem;
  padding: 1rem 0;
  margin: 0;
}

p {
  width: calc(var(--width-ic) * 2 / 3);
  margin: auto;
}

iframe {
  width: var(--width-ic);
  height: calc(var(--width-ic) / 1.77);
  border-radius: var(--border-rad);
}

/* Content panel styling*/
.content-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: calc((100vw - var(--width-ic) - 4rem) / 2);
  padding: 0.25rem;
  background: white;
  border-left: var(--settings-border);
  border-bottom: var(--settings-border);
  border-bottom-left-radius: var(--border-rad);

  div {
    font-size: 1.5rem;
    margin: 0.5rem;
    margin-left: 2rem;
  }
}

.all-features {
  list-style-type: "\2b21  ";

  font-size: 1rem;

  li {
    margin-bottom: 0.5ch;
  }

  a {
    color: inherit;

    &:hover {
      text-decoration: none;
    }
  }
}

.button {
  font-size: 1rem;
  margin-left: 2rem;
}

/* Style horizontal lines */
hr {
  width: 80%;
  margin: 0 auto 1em auto;
  border: none;
  border-top: 1px solid var(--accent-color);
}

@media (max-width: 525px) {
  p {
    width: 100%;
  }
  h2 {
    font-size: 2rem;
  }
}
</style>
