<template>
  <div class="info-page-cont">
    <Btn @click="redirectToHome" text="Landing page" class="button" />
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
          <li><a href="#about-us">About us</a></li>
        </ul>
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
          class="yt-vid"
          width="1536"
          height="864"
          src="https://www.youtube.com/embed/c2_C7dl9oVk"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
        <div class="features-exp">
          The following sections explain different features present in MailVis!
        </div>
        <hr style="margin-bottom: 0.25rem" />
        <p style="font-style: italic; margin: 0 auto; font-size: 1rem">
          Visuals are of the default dataset.
        </p>
      </div>
      <div id="adj-mat" class="section">
        <h2>Adjacency matrix and sorting</h2>
        <hr />
        <p>
          We have three different visualizations, the first of which is the
          <a
            href="https://en.wikipedia.org/wiki/Adjacency_matrix"
            target="_blank"
          >
            Adjacency Matrix</a
          >. For a dataset of email correspondence, each cell represents a
          collection of all emails sent from one person to another. The columns
          represent the senders, and the rows - the recipients.
        </p>
        <img src="@/assets/info_page/adj_mat_zoom.png" alt="adjacency matrix" />
        <p>
          The adjacency matrix is one of the simplest visualisations of a graph
          and as such can be scaled very well. Initially, most adjacency
          matrices give little information. That is why you can sort the
          adjacency matrix. You can choose between several sorting algorithms
          and see which one shows the best results.
        </p>
        <img
          style="width: 25ch"
          src="@/assets/info_page/sorting_algs.png"
          alt="sorting algorithms"
        />
      </div>
      <div id="node-link" class="section">
        <h2>Node-link diagram</h2>
        <hr />
        <p>
          The second visualization type is a force-directed
          <a href="https://en.wikipedia.org/wiki/Graph_drawing" target="_blank">
            Node-link diagram
          </a>
          which is the most natural way to represent a network. Node-link
          diagrams show the global structure of a network in a very intuitive
          way.
        </p>
        <img src="@/assets/info_page/node_link.png" alt="node-link diagram" />
        <p>
          It is a self-organizing collection of nodes connected by edges. Each
          node represents a person and each edge connects two people who have
          sent emails to each other.
        </p>
      </div>
      <div id="cal-mat" class="section">
        <h2>Calendar matrix</h2>
        <hr />
        <p>
          The last visualization is a Calendar matrix that shows relationships
          between dates. Each date is a collection of emails where the color and
          opacity change based on the number of emails and the average
          sentiment.
        </p>
        <img src="@/assets/info_page/cal_mat.png" alt="calendar matrix" />
      </div>
      <div id="interaction" class="section">
        <h2>Interaction modes</h2>
        <hr />
        <p>
          You can choose between two interaction modes. The first one is
          inspection. This mode allows you to click on different components of
          the visualizations and get information about them in the inspector
          menu. You can also pan and zoom. Either using the provided buttons or
          your mouse (scroll to zoom, click and drag to pan).
        </p>
        <div class="multiple-media">
          <img
            style="width: 17.5ch; height: auto; object-fit: cover"
            src="@/assets/info_page/int_modes.png"
            alt="interaction modes"
          />
          <img
            style="width: 35ch"
            src="@/assets/info_page/panning.gif"
            alt="panning gif"
          />
        </div>
        <p>
          The other interaction mode is selection which makes it possible to
          select nodes in the node-link diagram and they also get selected in
          the adjacency matrix and vice versa.
        </p>
        <div class="multiple-media">
          <img
            style="width: 17.5ch; height: auto; object-fit: cover"
            src="@/assets/info_page/int_modes2.png"
            alt="interaction modes"
          />
          <img src="@/assets/info_page/selection.gif" alt="selection gif" />
        </div>
      </div>
      <div id="filters" class="section">
        <h2>Filters</h2>
        <hr />
        <p>
          There are three filtering options: email address, job title and date.
          The first two are only global filters that apply to all
          visualizations. They filter each one based on which fields are checked
          or if none are checked the unfiltered dataset is visualized. Clicking
          on the "Apply filters" button applies all currently selected filters.
        </p>
        <img
          style="width: 25ch"
          src="@/assets/info_page/email_job_filter.png"
          alt="calendar matrix"
        />
        <p>
          The last one (by date) can be applied globally or locally (from the
          local settings menu in the top right corner of each visualization).
          This is useful in situations where you want to see how different time
          periods compare.
        </p>
        <img src="@/assets/info_page/loc_sett.png" alt="calendar matrix" />
        <p>
          There also is a time bar at the bottom of each visualization that
          shows you the local <span class="green-lf">(green)</span> and global
          <span class="grey-lf">(grey)</span> filter as time periods.
        </p>
      </div>
      <div id="layout" class="section">
        <h2>Layout</h2>
        <hr />
        <p>
          The layout menu provides you with several different options on how to
          configure the visualizations on screen. You can select the number of
          visualizations, columns, and rows. If there aren't enough rows then
          the application creates more than the set amount.
        </p>
        <img
          style="width: 20ch"
          src="@/assets/info_page/layout.png"
          alt="calendar matrix"
        />
        <p>
          You can also show the outline around all visualizations and change the
          type of each visualization from a dropdown menu in the top left
          corner.
        </p>
        <img
          style="width: 40ch"
          src="@/assets/info_page/dropdown.png"
          alt="calendar matrix"
        />
      </div>
      <div id="insp-menu" class="section">
        <h2>Inspector menu</h2>
        <hr />
        <p>
          When you click on an element in a visualization it gets highlighted
          and information about it is shown in the inspector menu, positioned in
          the bottom right corner. This menu includes much more detailed
          information compared to the tooltips including color which you can
          copy by clicking on the colored rectangle.
        </p>
        <img
          style="width: 25ch"
          src="@/assets/info_page/inspector.png"
          alt="Inspector menu"
        />
      </div>
      <div id="tooltips" class="section">
        <h2>Tooltips</h2>
        <hr />
        <p>
          The tooltips show when you hover over an element in a visualisation.
          They display the most important information about an element like
          sender, recipient, average sentiment or date.
        </p>
        <div class="multiple-media">
          <img
            style="height: 7ch"
            src="@/assets/info_page/tooltip_1.png"
            alt="tooltip example"
          />
          <img
            style="height: 7ch"
            src="@/assets/info_page/tooltip_2.png"
            alt="another tooltip"
          />
        </div>
      </div>
      <div id="dataset-link" class="section">
        <h2>Dataset link</h2>
        <hr />
        <p>
          In the header menu, there is a link icon (<img
            src="@/assets/icons/link.svg"
            class="link-icon"
          />). Clicking on this icon brings up a menu that gives you a link that
          anyone can use to open your current dataset in our application.
        </p>
        <img
          style="width: 40ch"
          src="@/assets/info_page/share_link.png"
          alt="calendar matrix"
        />
      </div>
      <div id="about-us" class="section">
        <h2>About us</h2>
        <hr />
        <div class="about-us-cont">
          <div class="person">
            <img
              src="@/assets/info_page/about_us/frederik.jpg"
              alt="Photo of Frederik de Graaf"
            />
            <h3>Frederik de Graaf</h3>
            <ul>
              <div>Worked on:</div>
              <li>Panning and zooming</li>
              <li>Optimized selection</li>
              <li>Local settings</li>
              <li>Buttons, dropdown menu</li>
              <li>Adjacency matrix</li>
            </ul>
          </div>
          <div class="person">
            <img
              src="@/assets/info_page/about_us/jard.jpg"
              alt="Photo of Jard van Roest"
            />
            <h3>Jard van Roest</h3>
            <ul>
              <div>Worked on:</div>
              <li>Landing page</li>
              <li>All Filters</li>
              <li>Dark mode</li>
              <li>Major refactoring</li>
              <li>Default dataset</li>
            </ul>
          </div>
          <div class="person">
            <img
              src="@/assets/info_page/about_us/ziana.jpeg"
              alt="Photo of Sanziana Tudose"
            />
            <h3>Sanziana Tudose</h3>
            <ul>
              <div>Worked on:</div>
              <li>Node-link diagram</li>
              <li>Adjacency matrix</li>
              <li>Selection mode</li>
              <li>Sorting</li>
            </ul>
          </div>
          <div class="person">
            <img
              src="@/assets/info_page/about_us/tudor.jpeg"
              alt="Photo of Tudor Macovei"
            />
            <h3>Tudor Macovei</h3>
            <ul>
              <div>Worked on:</div>
              <li>Backend</li>
              <li>Dataset link</li>
              <li>MailVis video</li>
              <li>Server</li>
            </ul>
          </div>
          <div class="person">
            <img
              src="@/assets/info_page/about_us/velyan.jpg"
              alt="Photo of Velyan Kolev"
            />
            <h3>Velyan Kolev</h3>
            <ul>
              <div>Worked on:</div>
              <li>Landing and info page</li>
              <li>Header</li>
              <li>Settings menu UI</li>
              <li>Inspector menu</li>
              <li>Layout</li>
              <li>Adjacency matrix</li>
            </ul>
          </div>
          <div class="person">
            <img
              src="@/assets/info_page/about_us/zdravko.jpg"
              alt="Photo of Zdravko Zdravkov"
            />
            <h3>Zdravko Zdravkov</h3>
            <ul>
              <div>Worked on:</div>
              <li>Default dataset</li>
              <li>Calendar matrix</li>
              <li>Tooltips</li>
              <li>Adjacency matrix</li>
            </ul>
          </div>
        </div>
      </div>
      <br />
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
  --width-ic: 60vw;

  top: 0;
  margin: auto;
  padding: 0.5rem;
  width: var(--width-ic);
  max-width: var(--width-ic);

  background-color: var(--background-color);
  box-shadow: rgba(108, 112, 116, 0.3) 0px 5px 10px 0px,
    rgba(162, 164, 165, 0.15) 0px 10px 30px 10px;
}

.section {
  padding-top: 0em;
  text-align: center;

  img {
    padding: 1rem 0 0 0;
    max-width: 60%;
  }

  p {
    margin-top: 2rem;
    width: min(60ch, 100%);
    word-wrap: break-word;
  }

  :nth-child(3) {
    margin-top: 0;
  }

  a {
    color: var(--accent-color);
  }
}

h2 {
  font-family: "Roboto", sans-serif;
  font-size: 2.5rem;
  padding: 1rem 0;
  font-weight: normal;
  margin: 0;
  margin-top: 2.5rem;
}

p {
  margin: auto;
}

#what-is h2 {
  margin-top: 0;
}

.link-icon {
  width: 0.8em;
  height: 0.8em;
}

.multiple-media {
  display: flex;
  gap: 1em;
  align-items: center;
  justify-content: center;
}

.green-lf {
  color: var(--accent-color);
}

.grey-lf {
  color: #c9c9c9af;
}

.about-us-cont {
  margin: 0 5%;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
}

.person {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5em 0;

  border-radius: var(--border-rad);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

  img {
    border-radius: 50%;
    padding: 0;
    border: 4px solid var(--accent-color);
  }

  h3 {
    color: var(--accent-color);
    margin: 0.25em 0 1em 0;
  }

  ul {
    padding: 0;
    font-size: 1rem;
    list-style: none;
    text-align: left;
    width: 80%;

    div {
      margin-bottom: 0.25em;
      font-size: 1.25em;
    }

    li::before {
      content: "\2b21  ";
      color: var(--accent-color);
    }
  }
}

.yt-vid {
  width: min(var(--width-ic), 75ch);
  height: calc(var(--width-ic) / 1.77);
  border-radius: var(--border-rad);
}

.features-exp {
  font-family: "Roboto", sans-serif;
  font-size: 2.5rem;
  width: 80%;
  font-weight: bold;
  margin: 2rem auto 0.5rem auto;
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
    margin-bottom: 1ch;
  }

  a {
    color: inherit;

    &:hover {
      text-decoration: none;
    }
  }
}

.button {
  position: fixed;
  top: 0;
  left: 0;

  max-width: calc(20vw - 2em);
  word-wrap: break-word;
  margin: 1rem;
  font-size: 1rem;
}

/* Style horizontal lines */
hr {
  width: 80%;
  margin: 0 auto 1em auto;
  border: none;
  border-top: 1px solid var(--accent-color);
}

@media (max-width: 1300px) {
  .about-us-cont {
    grid-template-columns: repeat(2, 1fr);
    margin: 0 10%;
  }
}

@media (max-width: 930px) {
  .info-container {
    --width-ic: 90vw;
    margin-top: 10rem;
  }

  .button {
    z-index: 2;
    left: auto;
    right: 0;
    max-width: 100%;
  }

  .content-panel {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    border-bottom-left-radius: 0;
    min-height: 10rem;

    ul {
      columns: 4;
      -webkit-columns: 4;
      -moz-columns: 4;
    }

    ul li {
      margin: 0 0.5ch 0.5ch 0;
    }
  }

  .about-us-cont {
    margin: 0 15%;
  }
}

@media (max-width: 700px) {
  .content-panel ul {
    columns: 3;
    -webkit-columns: 3;
    -moz-columns: 3;
  }

  .multiple-media {
    flex-direction: column;
  }

  .about-us-cont {
    margin: 0 5%;
  }
}

@media (max-width: 525px) {
  p {
    width: 100%;
  }

  h2 {
    font-size: 2rem;
  }

  .content-panel ul {
    columns: 2;
    -webkit-columns: 2;
    -moz-columns: 2;
  }

  .info-container {
    margin-top: 14rem;
  }

  .about-us-cont {
    grid-template-columns: repeat(1, 1fr);
    margin: 0 15%;
  }
}

@media (max-width: 360px) {
  .content-panel {
    ul {
      columns: 1;
      -webkit-columns: 1;
      -moz-columns: 1;
    }

    div {
      margin-top: 3.5rem;
    }
  }

  .button {
    left: 0;
  }

  .info-container {
    margin-top: 23rem;
  }

  .about-us-cont {
    margin: 0 5%;
  }
}
</style>
