<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { mountCharts } from '../../utils/charts';

// Placeholder data, to be replaced with the study's own results.
const charts = {
};

const root = ref(null);
let destroyCharts = () => {};
let mounted = true;

onMounted(async () => {
  const destroy = await mountCharts(root.value);
  if (mounted) destroyCharts = destroy;
  else destroy();
});

onBeforeUnmount(() => {
  mounted = false;
  destroyCharts();
});
</script>

<template>
  <section class="section pt-6">
    <div ref="root" class="container container-narrow">
      <h1>Title</h1>

      <p>
        To be written
      </p>

      <hr />

      <h2>Introduction</h2>   
      <p>
        To be written
      </p>

      <h2>Context</h2>
      <p>
        To be written
      </p>

      <h2>Method</h2>
      <p>
        To be written
      </p>

      <h2>Findings</h2>
      <p>
        To be written
      </p>

      <h2>Discussion</h2>
      <p>
        To be written
      </p>

      <h2>Conclusion</h2>
      <p>
        To be written
      </p>

      <hr />

      <h2>Raw data</h2>
      <p>
        To be written
      </p>
      
      <h3>Raw data title</h3>
      // TODO: Add the model of the raw data here. Either a table or a collection of quotes.
      // TODO: Chose a chart to illustrate the data
      // TODO: Add the source, with the dates and the methodology
      
      <h3>Raw data title</h3>
      // TODO: Add the model of the raw data here. Either a table or a collection of quotes.
      // TODO: Chose a chart to illustrate the data
      // TODO: Add the source, with the dates and the methodology
      
      <h3>Raw data title</h3>
      // TODO: Add the model of the raw data here. Either a table or a collection of quotes.
      // TODO: Chose a chart to illustrate the data
      // TODO: Add the source, with the dates and the methodology
      
      <h3>Raw data title</h3>
      // TODO: Add the model of the raw data here. Either a table or a collection of quotes.
      // TODO: Chose a chart to illustrate the data
      // TODO: Add the source, with the dates and the methodology
      
      <h3>Raw data title</h3>
      // TODO: Add the model of the raw data here. Either a table or a collection of quotes.
      // TODO: Chose a chart to illustrate the data
      // TODO: Add the source, with the dates and the methodology
    </div>
  </section>
</template>
