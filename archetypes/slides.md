---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
aliases: "/{{ (where .Site.RegularPages "Section" "==" "slides") | len | add 1 }}"
layout: reveal
---