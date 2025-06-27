---
layout: post
title: Tree of Thoughts - Deliberate Problem Solving with Large Language Models
description: 
paperurl: https://arxiv.org/pdf/2305.10601
date: 2024-04-18
tags: language
categories: paper-summary
related_posts: true

authors:
  - name: Shunyu Yao
    affiliations:
      name: Princeton University
  - name: Dian Yu
    affiliations:
      name: Google DeepMind
  - name: Jeffrey Zhao
    affiliations:
      name: Google DeepMind
  - name: Izhak Shafran
    affiliations:
      name: Google DeepMind
  - name: Thomas L. Griffiths
    affiliations:
      name: Princeton University
  - name: Yuan Cao
    affiliations:
      name: Google DeepMind
  - name: Karthik Narasimhan
    affiliations:
      name: Princeton University

# Optionally, you can add a table of contents to your post.
# NOTES:
#   - make sure that TOC names match the actual section names
#     for hyperlinks within the post to work correctly.
#   - we may want to automate TOC generation in the future using
#     jekyll-toc plugin (https://github.com/toshimaru/jekyll-toc).
toc:
  - name: Paper Abstract
  - name: TL;DR
  - name: Paper Summary

---

## Paper Abstract

Language models are increasingly being deployed for general problem solving across a wide range of tasks, but are still confined to token-level, left-to-right decision-making processes during inference. This means they can fall short in tasks that require exploration, strategic lookahead, or where initial decisions play a pivotal role. To surmount these challenges, we introduce a new framework for language model inference, “Tree of Thoughts” (ToT), which generalizes over the popular “Chain of Thought” approach to prompting language models, and enables exploration over coherent units of text (“thoughts”) that serve as intermediate steps toward problem solving. ToT allows LMs to perform deliberate decision making by considering multiple different reasoning paths and self-evaluating choices to decide the next course of action, as well as looking ahead or backtracking when necessary to make global choices. Our experiments show that ToT significantly enhances language models’ problem-solving abilities on three novel tasks requiring non-trivial planning or search: Game of 24, Creative Writing, and Mini Crosswords. For instance, in Game of 24, while GPT-4 with chain-of-thought prompting only solved 4% of tasks, our method achieved a success rate of 74%. Code repo with all prompts: [here](https://github.com/princeton-nlp/tree-of-thought-llm.)

---

## TL;DR

"Tree of Thoughts" (ToT) approach to prompting language models, and enables exploration over coherent units of text called "thoughts" which act as intermediate steps toward problem solving. 

---

## Paper Summary

Language models are still confined to token-level, left-to-right decision-making processes during inference. This means they can fall short in tasks that require exploration, strategic lookahead, or where initial decisions play a pivotal role. 
ToT allows LMs to perform deliberate decision making by considering:
* multiple different reasoning paths 
* self-evaluating choices to decide the next course of action
* as well as looking ahead or backtracking when necessary to make global choices. 
