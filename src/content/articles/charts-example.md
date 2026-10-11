---
title: Charts example
date: 1970-01-01
excerpt: A sample article showing the bar, pie and line charts that can be written directly in an article's Markdown.
tags: [example]
status: draft
---

Charts are written as fenced code blocks tagged `chart`, holding a JSON object with a `type` (`bar`, `line`, `pie` or `doughnut`), an optional `title`, the `labels` and one or more `series`. This article is dated in the future, so it stays out of the list and the sitemap, but it can be opened directly at its URL.

## Bar chart

```chart
{
  "type": "bar",
  "title": "Pull requests merged per quarter",
  "labels": ["Q1 '25", "Q2 '25", "Q3 '25", "Q4 '25", "Q1 '26", "Q2 '26", "Q3 '26", "Q4 '26"],
  "series": [
    { "name": "Squad A", "data": [42, 51, 47, 60, 58, 63, 55, 68] },
    { "name": "Squad B", "data": [35, 38, 49, 55, 52, 57, 61, 64] },
    { "name": "Squad C", "data": [18, 24, 29, 33, 41, 38, 46, 50] }
  ]
}
```

## Pie chart

```chart
{
  "type": "pie",
  "title": "Where the week goes",
  "labels": ["Coding", "Reviews", "Meetings", "Support"],
  "series": [
    { "name": "Hours", "data": [18, 7, 10, 5] }
  ]
}
```

## Line chart

```chart
{
  "type": "line",
  "title": "Weekly AI tool usage",
  "labels": ["W1", "W2", "W3", "W4", "W5", "W6"],
  "series": [
    { "name": "Squad A", "data": [12, 18, 25, 31, 30, 34] },
    { "name": "Squad B", "data": [8, 9, 15, 22, 27, 29] }
  ]
}
```
